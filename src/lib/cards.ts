import type { CardLabels, CardProject } from '@/components/ProjectCard';
import type { LocalizedProject } from './content';
import type { Dictionary } from './i18n';

export function toCard(p: LocalizedProject): CardProject {
  return {
    slug: p.slug,
    lane: p.lane,
    status: p.status,
    year: p.year,
    title: p.title,
    tagline: p.tagline,
    cover: p.cover,
    stack: p.stack,
    placeholder: p.placeholder,
  };
}

export function cardLabels(dict: Dictionary): CardLabels {
  return {
    status: dict.status,
    lane: {
      web: dict.lanes.web.name,
      infra: dict.lanes.infra.name,
      security: dict.lanes.security.name,
      ai: dict.lanes.ai.name,
    },
    dummy: dict.dummy,
  };
}
