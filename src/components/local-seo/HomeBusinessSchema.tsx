import React from 'react';

const SITE_URL = 'https://www.lucidweb.studio';

/**
 * Root LocalBusiness structured data for the home page.
 *
 * Richer than the per-city LocalBusinessSchema: includes the business
 * address, geo coordinates, and phone so Google can associate Lucid Web
 * Studios with Escondido / North County San Diego for local search.
 * Rendered only on the home page to avoid duplicating the schema that the
 * city landing pages already emit.
 */
export function HomeBusinessSchema() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Lucid Web Studios',
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    description:
      'Escondido web development and local SEO studio building fast, modern websites and apps for North County San Diego businesses.',
    telephone: '+1-858-215-4894',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Escondido',
      addressRegion: 'CA',
      postalCode: '92026',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.1192,
      longitude: -117.0864,
    },
    areaServed: [
      { '@type': 'City', name: 'Escondido' },
      { '@type': 'AdministrativeArea', name: 'North County San Diego' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
