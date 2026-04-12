import type { CityContent, ParsedLocationSlug } from './types';
import { escondidoContent } from './content/escondido';
import { carlsbadContent } from './content/carlsbad';
import { oceansideContent } from './content/oceanside';
import { sanMarcosContent } from './content/san-marcos';
import { vistaContent } from './content/vista';
import { encinitasContent } from './content/encinitas';
import { powayContent } from './content/poway';
import { ranchoBernardoContent } from './content/rancho-bernardo';
import { sanDiegoContent } from './content/san-diego';
import { temeculaContent } from './content/temecula';

export * from './types';
export * from './cities';

const CITY_CONTENT_REGISTRY: Record<string, CityContent> = {
  escondido: escondidoContent,
  carlsbad: carlsbadContent,
  oceanside: oceansideContent,
  'san-marcos': sanMarcosContent,
  vista: vistaContent,
  encinitas: encinitasContent,
  poway: powayContent,
  'rancho-bernardo': ranchoBernardoContent,
  'san-diego': sanDiegoContent,
  temecula: temeculaContent,
};

export function getCityContent(slug: string): CityContent | undefined {
  return CITY_CONTENT_REGISTRY[slug];
}

export function getRoutableCitySlugs(): string[] {
  return Object.keys(CITY_CONTENT_REGISTRY);
}

export function getAllLocationSlugs(): string[] {
  const slugs: string[] = [];
  for (const citySlug of getRoutableCitySlugs()) {
    slugs.push(citySlug);
    slugs.push(`${citySlug}-web-design`);
    slugs.push(`${citySlug}-seo-services`);
  }
  return slugs;
}

export function parseLocationSlug(slug: string): ParsedLocationSlug | null {
  const citySlugs = getRoutableCitySlugs().sort((a, b) => b.length - a.length);

  for (const citySlug of citySlugs) {
    if (slug === citySlug) {
      return { kind: 'hub', citySlug };
    }
    if (slug === `${citySlug}-web-design`) {
      return { kind: 'web-design', citySlug };
    }
    if (slug === `${citySlug}-seo-services`) {
      return { kind: 'seo-services', citySlug };
    }
  }
  return null;
}
