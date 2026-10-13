import { getCollection, type CollectionEntry } from 'astro:content';
import scholarMetrics from '../data/scholar-metrics.json';

export type Publication = CollectionEntry<'publications'>['data'] & { id: string };

/** Prefix an internal path with the configured base (needed on GitHub Pages). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/** Google Scholar metrics, refreshed weekly by scripts/fetch-scholar-metrics.mjs. */
export const scholar = scholarMetrics as {
  source: string;
  updated: string;
  citations: number;
  hIndex: number | null;
  i10Index: number | null;
  perYear: { year: number; citations: number }[];
};

/** "2026-10-13" -> "13 Oct 2026" */
export function formatDay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[(m ?? 1) - 1]} ${y}`;
}

/** Attributes for links that leave the site: open in a new tab, safely. */
export const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
export const extMe = { target: '_blank', rel: 'me noopener noreferrer' } as const;

export const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/research-output/', label: 'Research output' },
  { path: '/projects/', label: 'Projects' },
  { path: '/grants/', label: 'Grants' },
  { path: '/career/', label: 'Career' },
  { path: '/teaching/', label: 'Teaching' },
] as const;

export const typeLabels: Record<Publication['type'], string> = {
  journal: 'Journal article',
  conference: 'Conference paper',
  chapter: 'Book chapter',
  book: 'Book',
};

export const typeOrder: Publication['type'][] = ['journal', 'conference', 'chapter', 'book'];

/** All publications, newest first; accepted items sort ahead of published ones in the same year. */
export async function getPublications(): Promise<Publication[]> {
  const entries = await getCollection('publications');
  return entries
    .map((e) => ({ ...e.data, id: e.id }))
    .sort((a, b) => b.year - a.year || Number(b.status !== 'published') - Number(a.status !== 'published') || a.title.localeCompare(b.title));
}

export function countByType(pubs: Publication[]) {
  return typeOrder.map((type) => ({ type, label: typeLabels[type], count: pubs.filter((p) => p.type === type).length }));
}

export function countByYear(pubs: Publication[]) {
  const map = new Map<number, number>();
  for (const p of pubs) map.set(p.year, (map.get(p.year) ?? 0) + 1);
  const years = [...map.keys()];
  const min = Math.min(...years);
  const max = Math.max(...years);
  const out: { year: number; count: number }[] = [];
  for (let y = min; y <= max; y++) out.push({ year: y, count: map.get(y) ?? 0 });
  return out;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2025-04" -> "Apr 2025"; null -> "Present" */
export function formatMonth(value: string | null): string {
  if (!value) return 'Present';
  const [y, m] = value.split('-').map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${y}`;
}

/** Whether an author string refers to the profile owner. */
export const isSelf = (author: string) => /^Aravinda\b/.test(author) || /\bAravinda,?\s*C\.?\s*V\.?$/.test(author);
