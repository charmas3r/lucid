import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | San Diego Web Design',
  description:
    'Transparent pricing for web design, development, mobile apps, e-commerce, and SEO. Quality work at fair rates from Lucid Web Studios in San Diego.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing | Lucid Web Studios',
    description:
      'Quality work at fair, transparent rates for web design, development, mobile apps, e-commerce, and SEO.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
