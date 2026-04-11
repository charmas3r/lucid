// City metadata registry. Used by helpers and components that don't need full page content.
// Full per-city content lives in src/lib/local-seo/content/{citySlug}.ts.

export type CityRegistryEntry = {
  slug: string;
  displayName: string;
  population: number;
  isHQ: boolean;
  shortDescription: string;
};

export const NORTH_COUNTY_CITIES: readonly CityRegistryEntry[] = [
  {
    slug: 'escondido',
    displayName: 'Escondido',
    population: 151625,
    isHQ: true,
    shortDescription:
      'Our home base in Deer Springs. Priority service for Escondido businesses from the historic district to the wine country east of town.',
  },
  {
    slug: 'carlsbad',
    displayName: 'Carlsbad',
    population: 114935,
    isHQ: false,
    shortDescription:
      'Modern websites for Carlsbad\u2019s thriving business community \u2014 from Village boutiques to Palomar Airport Road tech firms.',
  },
  {
    slug: 'oceanside',
    displayName: 'Oceanside',
    population: 174068,
    isHQ: false,
    shortDescription:
      'Coastal North County\u2019s largest city. Websites built for tourism, restaurants, and service businesses.',
  },
  {
    slug: 'san-marcos',
    displayName: 'San Marcos',
    population: 94833,
    isHQ: false,
    shortDescription:
      'Serving San Marcos businesses from restaurants on Grand Avenue to tech startups near Cal State San Marcos.',
  },
  {
    slug: 'vista',
    displayName: 'Vista',
    population: 98381,
    isHQ: false,
    shortDescription:
      'Websites and local SEO for Vista\u2019s small business community \u2014 restaurants, home services, and retail.',
  },
  {
    slug: 'encinitas',
    displayName: 'Encinitas',
    population: 61588,
    isHQ: false,
    shortDescription:
      'Premium web design for Encinitas boutiques, wellness studios, and surf-inspired brands along the 101.',
  },
  {
    slug: 'poway',
    displayName: 'Poway',
    population: 48841,
    isHQ: false,
    shortDescription:
      'Professional websites and local SEO for Poway service businesses, from home services to medical practices.',
  },
  {
    slug: 'rancho-bernardo',
    displayName: 'Rancho Bernardo',
    population: 46563,
    isHQ: false,
    shortDescription:
      'Enterprise-quality websites for Rancho Bernardo corporate, tech, and professional service firms.',
  },
];

export function getCityRegistryEntry(slug: string): CityRegistryEntry | undefined {
  return NORTH_COUNTY_CITIES.find((c) => c.slug === slug);
}
