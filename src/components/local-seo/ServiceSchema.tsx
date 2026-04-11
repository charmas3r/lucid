import React from 'react';

type ServiceSchemaProps = {
  serviceType: 'Web Design' | 'Local SEO Services';
  areaServed: string;
  pageUrl: string;
};

export function ServiceSchema({ serviceType, areaServed, pageUrl }: ServiceSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Lucid Web Studios',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Escondido',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: areaServed,
    },
    url: pageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
