import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { z } from 'zod';
import type { Locale } from './i18n';

// ---------------------------------------------------------------- schemas

const Localized = z.object({ id: z.string().min(1), en: z.string().min(1) });

export const LANES = ['web', 'infra', 'security', 'ai'] as const;
export type Lane = (typeof LANES)[number];
export const STATUSES = ['live', 'beta', 'archived', 'in-progress'] as const;
export type Status = (typeof STATUSES)[number];

const ProjectText = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1),
  role: z.string().min(1),
  problem: z.string().min(1),
  approach: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
});

const Apk = z.object({
  url: z.string().url(),
  version: z.string().min(1),
  sizeMb: z.number().positive(),
  sha256: z.string().regex(/^[a-fA-F0-9]{64}$/, 'sha256 must be 64 hex characters'),
  minAndroid: z.string().optional(),
});

const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  placeholder: z.boolean().default(false),
  lane: z.enum(LANES),
  status: z.enum(STATUSES),
  year: z.number().int(),
  featured: z.boolean().default(false),
  order: z.number().default(100),
  stack: z.array(z.string().min(1)).min(1),
  links: z
    .object({
      live: z.string().url().optional(),
      repo: z.string().url().optional(),
      apk: Apk.optional(),
      video: z.string().regex(/^[\w-]{6,20}$/, 'video must be a YouTube video id').optional(),
    })
    .default({}),
  cover: z.string().startsWith('/'),
  gallery: z.array(z.object({ src: z.string().startsWith('/'), alt: Localized })).default([]),
  text: z.object({ id: ProjectText, en: ProjectText }),
});

const SiteSchema = z.object({
  siteUrl: z.string().url(),
  brand: z.string().min(1),
  fullName: z.string().min(1),
  placeholderFields: z.array(z.string()).default([]),
  availability: z.object({ clients: z.boolean(), recruiters: z.boolean() }),
  contact: z.object({
    email: z.string().email(),
    whatsapp: z.string().regex(/^\d{8,15}$/, 'digits only, international format'),
    linkedin: z.string().url(),
    github: z.string().url(),
  }),
  cv: z.object({ id: z.string().startsWith('/'), en: z.string().startsWith('/') }),
  about: Localized,
  glance: z.array(z.object({ label: Localized, value: Localized })),
  experience: z.array(
    z.object({ company: z.string(), period: z.string(), role: Localized, summary: Localized }),
  ),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Site = z.infer<typeof SiteSchema>;

// ---------------------------------------------------------------- loading

const contentDir = path.join(process.cwd(), 'content');

function parseYaml<T>(file: string, schema: z.ZodType<T, z.ZodTypeDef, unknown>): T {
  const raw = YAML.parse(fs.readFileSync(file, 'utf8'));
  const result = schema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n');
    throw new Error(`Invalid content in ${path.relative(process.cwd(), file)}:\n${issues}`);
  }
  return result.data;
}

let siteCache: Site | undefined;
let projectsCache: Project[] | undefined;

export function getSite(): Site {
  siteCache ??= parseYaml(path.join(contentDir, 'site.yaml'), SiteSchema);
  return siteCache;
}

export function getProjects(): Project[] {
  if (projectsCache) return projectsCache;
  const dir = path.join(contentDir, 'projects');
  const projects = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.yaml'))
    .map((f) => {
      const project = parseYaml(path.join(dir, f), ProjectSchema);
      if (`${project.slug}.yaml` !== f) {
        throw new Error(`content/projects/${f}: slug "${project.slug}" must match the file name`);
      }
      return project;
    })
    .sort((a, b) => a.order - b.order || b.year - a.year);
  projectsCache = projects;
  return projects;
}

export function hasPlaceholders(): boolean {
  return getSite().placeholderFields.length > 0 || getProjects().some((p) => p.placeholder);
}

// ---------------------------------------------------------------- localization

export type LocalizedProject = Omit<Project, 'text' | 'gallery'> &
  z.infer<typeof ProjectText> & { gallery: { src: string; alt: string }[] };

export function localizeProject(project: Project, locale: Locale): LocalizedProject {
  const { text, gallery, ...rest } = project;
  return {
    ...rest,
    ...text[locale],
    gallery: gallery.map((g) => ({ src: g.src, alt: g.alt[locale] })),
  };
}

export type LocalizedSite = {
  siteUrl: string;
  brand: string;
  fullName: string;
  availability: Site['availability'];
  contact: Site['contact'];
  cv: string;
  about: string;
  glance: { label: string; value: string }[];
  experience: { company: string; period: string; role: string; summary: string }[];
};

export function localizeSite(site: Site, locale: Locale): LocalizedSite {
  return {
    siteUrl: site.siteUrl.replace(/\/$/, ''),
    brand: site.brand,
    fullName: site.fullName,
    availability: site.availability,
    contact: site.contact,
    cv: site.cv[locale],
    about: site.about[locale],
    glance: site.glance.map((g) => ({ label: g.label[locale], value: g.value[locale] })),
    experience: site.experience.map((e) => ({
      company: e.company,
      period: e.period,
      role: e.role[locale],
      summary: e.summary[locale],
    })),
  };
}
