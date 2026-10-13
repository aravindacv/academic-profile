/**
 * Fetches current Google Scholar metrics (citations, h-index, i10-index and
 * citations per year) through SerpApi and writes them to src/data/scholar-metrics.json.
 *
 * Runs in the GitHub Actions build before `astro build`. It never fails the build:
 * if the key is missing or SerpApi is unavailable, the last committed numbers are kept.
 *
 *   SERPAPI_KEY=xxxx node scripts/fetch-scholar-metrics.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';

const AUTHOR_ID = 'vclqSkkAAAAJ';
const OUT = new URL('../src/data/scholar-metrics.json', import.meta.url);
const key = process.env.SERPAPI_KEY;

const keep = (reason) => {
  // ::warning:: shows as a yellow annotation in the GitHub Actions run.
  console.log(`::warning::Scholar metrics not refreshed (${reason}). Keeping last saved values.`);
  process.exit(0);
};

if (!key) keep('SERPAPI_KEY is not set');

const url = new URL('https://serpapi.com/search.json');
url.search = new URLSearchParams({ engine: 'google_scholar_author', author_id: AUTHOR_ID, hl: 'en', api_key: key }).toString();

let data;
try {
  const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!res.ok) keep(`HTTP ${res.status}`);
  data = await res.json();
} catch (err) {
  keep(err instanceof Error ? err.message : String(err));
}
if (data.error) keep(data.error);

// cited_by.table = [{ citations: { all } }, { h_index: { all } }, { i10_index: { all } }]
const table = data?.cited_by?.table ?? [];
const pick = (name) => {
  const row = table.find((r) => r && name in r);
  const v = row?.[name]?.all;
  return Number.isInteger(v) && v >= 0 ? v : null;
};
const citations = pick('citations');
const hIndex = pick('h_index');
const i10Index = pick('i10_index');
if (citations === null || hIndex === null) keep('unexpected response format');

const perYear = (data?.cited_by?.graph ?? [])
  .filter((g) => Number.isInteger(g?.year) && Number.isInteger(g?.citations))
  .map((g) => ({ year: g.year, citations: g.citations }));

// Guard against a bad response wiping out real numbers (citations never go down much).
const previous = JSON.parse(await readFile(OUT, 'utf8'));
if (previous.citations && citations < previous.citations * 0.8) {
  keep(`citations dropped from ${previous.citations} to ${citations}, looks wrong`);
}

const result = {
  source: 'Google Scholar',
  updated: new Date().toISOString().slice(0, 10),
  citations,
  hIndex,
  i10Index,
  perYear: perYear.length ? perYear : previous.perYear ?? [],
};
await writeFile(OUT, JSON.stringify(result, null, 2) + '\n');
console.log(`Scholar metrics updated: ${citations} citations, h-index ${hIndex}, i10-index ${i10Index}`);
