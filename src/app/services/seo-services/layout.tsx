import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Services for San Diego Businesses',
  description:
    'Make your website fast, findable, and future-ready. Technical SEO, content strategy, and AI search optimization from Lucid Web Studios in San Diego.',
  alternates: {
    canonical: '/services/seo-services',
  },
  openGraph: {
    title: 'SEO Services | Lucid Web Studios',
    description:
      'Technical SEO, content strategy, and AI search optimization that make your site fast and findable.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
};

export default function SeoServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
