import type { CityContent, ParsedLocationSlug } from './types';
import { NORTH_COUNTY_CITIES, getCityRegistryEntry } from './cities';
import { escondidoContent } from './content/escondido';

export * from './types';
export * from './cities';

const CITY_CONTENT_REGISTRY: Record<string, CityContent> = {
  escondido: escondidoContent,
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

export { getCityRegistryEntry, NORTH_COUNTY_CITIES };
