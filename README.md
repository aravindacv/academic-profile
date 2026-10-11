# Academic Profile — Dr Aravinda C. V.

A fast, static academic profile site (Overview · Research output · Projects · Grants · Career · Teaching),
laid out like a university research portal. Built with [Astro](https://astro.build); no server, no database,
no tracking, and free to host.

## How it is organised

Content and presentation are kept separate, so updating the site never means touching HTML.

```
src/
  data/
    profile.ts          ← name, title, bio, metrics, links, awards, memberships
    publications.json   ← every publication (one object each)
    projects.json       ← deployed projects
    grants.json         ← grants and fellowships
    positions.json      ← appointments, research posts, degrees
  content.config.ts     ← schemas: the build FAILS if a data file is malformed
  components/           ← ProfileHeader, PublicationItem, Sidebar
  layouts/              ← page shell, SEO + schema.org Person metadata
  pages/                ← one file per tab
  styles/global.css     ← design tokens, light/dark mode, print styles
.github/workflows/deploy.yml  ← automatic deployment to GitHub Pages
```

Counts on the tabs, the "research output per year" chart and the type totals are all computed from
`publications.json`, so they can never drift out of sync with the list.

## Run it on your computer (Windows / PowerShell)

Requires Node.js 18.20+ (you have Node 24 — fine).

```powershell
cd academic-profile
npm install
npm run dev        # http://localhost:4321 — live reload while you edit
npm run build      # type-check + production build into dist/
npm run preview    # serve the built site locally
```

## Common edits

**Add a publication** — append to `src/data/publications.json`:

```json
{
  "id": "access2026-new-paper",
  "title": "Paper title",
  "authors": ["Aravinda, C.V.", "Co-author, A."],
  "year": 2026,
  "type": "journal",
  "venue": "IEEE Access",
  "publisher": "IEEE",
  "details": "Vol. 14, pp. 1–12",
  "doi": "10.1109/ACCESS.2026.0000000",
  "selected": true
}
```

`type` is one of `journal`, `conference`, `chapter`, `book`. `status` can be `accepted` or `in-press`
(default `published`). `selected: true` puts it on the Overview page (the newest six are shown).

**Update citations / h-index** — edit `metrics` in `src/data/profile.ts` and change `asOf`.

**Add a photo** — save a square image as `public/photo.jpg`, then set `photo: 'photo.jpg'` in `profile.ts`.

## Deploy for free

### Option A — GitHub Pages (recommended; deploys on every push)

1. Create a new public repository on GitHub, e.g. `academic-profile`.
2. Push this folder:
   ```powershell
   git init
   git add .
   git commit -m "Initial academic profile site"
   git branch -M main
   git remote add origin https://github.com/aravindacv/academic-profile.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for the green tick. The site is live at
   `https://aravindacv.github.io/academic-profile/`.

From then on, edit a data file, commit, push — the site rebuilds itself. A malformed entry fails the
build in Actions and the live site stays on the last good version.

> Want the shorter `https://aravindacv.github.io/`? Name the repository `aravindacv.github.io` instead.

### Option B — Cloudflare Pages

1. Push the repository to GitHub (steps 1–2 above).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → choose the repo.
3. Build command `npm run build`, output directory `dist`.
4. Environment variables: `SITE_URL` = `https://<project>.pages.dev`, `BASE_PATH` = `/`, `NODE_VERSION` = `22`.

### Custom domain (optional)

Both hosts support a custom domain free of charge (you pay only for the domain). Set `SITE_URL`
to the domain and `BASE_PATH` to `/`.

## After going live

- Add the site URL to your ORCID record (*Websites & social links*) and Google Scholar profile.
- Submit `https://…/sitemap-index.xml` in Google Search Console so the pages are indexed.
