/**
 * Content schemas. Every data file in src/data is validated against these
 * at build time, so a typo (wrong year, missing title, bad URL) fails the
 * build instead of silently breaking the live site.
 */
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const url = z.string().url();

const publications = defineCollection({
  loader: file('src/data/publications.json'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    year: z.number().int().min(2000).max(2100),
    type: z.enum(['journal', 'conference', 'chapter', 'book']),
    venue: z.string(),
    publisher: z.string().optional(),
    details: z.string().optional(), // volume, pages, article number
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/).optional(),
    url: url.optional(),
    status: z.enum(['published', 'accepted', 'in-press']).default('published'),
    selected: z.boolean().default(false),
    note: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    summary: z.string(),
    stack: z.array(z.string()),
    url: url.optional(),
    repo: url.optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const grants = defineCollection({
  loader: file('src/data/grants.json'),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    funder: z.string(),
    host: z.string(),
    amount: z.string(),
    start: z.number().int(),
    end: z.number().int(),
    highlights: z.array(z.string()),
  }),
});

const positions = defineCollection({
  loader: file('src/data/positions.json'),
  schema: z.object({
    kind: z.enum(['employment', 'research', 'education']),
    title: z.string(),
    org: z.string(),
    unit: z.string().optional(),
    location: z.string(),
    start: z.string(), // "YYYY-MM"
    end: z.string().nullable(), // null = present
    points: z.array(z.string()).default([]),
  }),
});

export const collections = { publications, projects, grants, positions };
