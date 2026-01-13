import type { Metadata } from 'next';

const BASE_URL = 'https://www.lucidweb.studio';

// City-specific keywords for local SEO
const cityKeywords = [
  // Primary cities
  'San Diego web developer',
  'San Diego web design',
  'La Jolla web development',
  'Carlsbad web developer',
  'Escondido web design',
  'Chula Vista web developer',
  // North County
  'San Marcos web developer',
  'Vista web design',
  'Oceanside web developer',
  'Encinitas web design',
  'Poway web developer',
  'Rancho Bernardo web design',
  // South Bay
  'National City web developer',
  'Imperial Beach web design',
  // East County
  'El Cajon web developer',
  'La Mesa web design',
  'Santee web developer',
  // General local terms
  'web developer near me San Diego',
  'local web design company San Diego',
  'San Diego County web development',
  'North County San Diego website design',
  'South Bay San Diego web developer',
  'best web developer San Diego',
  'affordable web design San Diego',
  'small business web developer San Diego',
];

export const metadata: Metadata = {
  title: 'San Diego Web Developer | Web Design Services in San Marcos, Carlsbad & More',
  description:
    'Looking for a web developer in San Diego? Lucid Web Studios serves San Marcos, Carlsbad, Escondido, La Jolla, Chula Vista & all San Diego County. Local expertise, enterprise-quality websites. Free consultation.',
  keywords: cityKeywords,
  openGraph: {
    title: 'San Diego Web Developer | Local Web Design Experts | Lucid Web Studios',
    description:
      'San Diego\'s trusted web development partner. Serving San Marcos, Carlsbad, Escondido, La Jolla & beyond. 10+ years experience, 50+ local projects. Get a free consultation today.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lucid Web Studios',
    url: `${BASE_URL}/service-areas`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'San Diego Web Developer | Lucid Web Studios',
    description:
      'Looking for a web developer in San Diego? Local expertise serving San Marcos, Carlsbad, Escondido & all of San Diego County. Free consultation available.',
  },
  alternates: {
    canonical: '/service-areas',
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'San Diego',
    'geo.position': '33.1192;-117.0864',
    'ICBM': '33.1192, -117.0864',
  },
};

// JSON-LD structured data for LocalBusiness (GEO + SEO optimization)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'Lucid Web Studios',
  description: 'San Diego web development company specializing in custom websites, mobile apps, SEO, and e-commerce solutions for local businesses.',
  url: BASE_URL,
  telephone: '+1-619-555-1234',
  email: 'hello@lucidweb.studio',
  image: `${BASE_URL}/logo.png`,
  logo: `${BASE_URL}/logo.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Escondido',
    addressLocality: 'Escondido',
    addressRegion: 'CA',
    postalCode: '92025',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.1192,
    longitude: -117.0864,
  },
  areaServed: [
    { '@type': 'City', name: 'San Diego', '@id': 'https://www.wikidata.org/wiki/Q16552' },
    { '@type': 'City', name: 'San Marcos' },
    { '@type': 'City', name: 'Carlsbad' },
    { '@type': 'City', name: 'Escondido' },
    { '@type': 'City', name: 'La Jolla' },
    { '@type': 'City', name: 'Chula Vista' },
    { '@type': 'City', name: 'Oceanside' },
    { '@type': 'City', name: 'Vista' },
    { '@type': 'City', name: 'Encinitas' },
    { '@type': 'City', name: 'Poway' },
    { '@type': 'City', name: 'El Cajon' },
    { '@type': 'City', name: 'La Mesa' },
    { '@type': 'City', name: 'Santee' },
    { '@type': 'City', name: 'National City' },
    { '@type': 'City', name: 'Imperial Beach' },
    { '@type': 'City', name: 'Coronado' },
    { '@type': 'City', name: 'Del Mar' },
    { '@type': 'City', name: 'Solana Beach' },
    { '@type': 'City', name: 'Rancho Bernardo' },
    { '@type': 'AdministrativeArea', name: 'San Diego County' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Web Development',
          description: 'Next.js and React-based custom websites optimized for speed and SEO',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Cross-platform iOS and Android apps using Flutter and Kotlin Multiplatform',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Services',
          description: 'Technical SEO optimization achieving 100 Google Lighthouse scores',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Development',
          description: 'Shopify Hydrogen and headless commerce solutions',
        },
      },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://share.google/9QzfdpHBMY0OMRO2h',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '12',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function ServiceAreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
