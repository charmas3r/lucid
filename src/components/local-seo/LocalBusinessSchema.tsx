import React from 'react';

type LocalBusinessSchemaProps = {
  areaServed: string;
  pageUrl: string;
};

export function LocalBusinessSchema({ areaServed, pageUrl }: LocalBusinessSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': pageUrl,
    name: 'Lucid Web Studios',
    url: pageUrl,
    description:
      'Modern web design and local SEO studio based in Escondido, California, serving North County San Diego.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Escondido',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: areaServed },
      { '@type': 'AdministrativeArea', name: 'North County San Diego' },
    ],
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
