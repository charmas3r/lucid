import React from 'react';

type Breadcrumb = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  items: Breadcrumb[];
};

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
