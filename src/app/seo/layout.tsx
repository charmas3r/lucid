import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Services | Premier Search Engine Optimization | Lucid Web Studios',
  description:
    'Dominate search results with our SEO-first approach. Content strategy, technical SEO, link building, and analytics - we engineer websites for search dominance.',
  keywords: [
    'SEO services',
    'search engine optimization',
    'technical SEO',
    'content strategy',
    'link building',
    'SEO agency',
    'organic traffic',
    'SEO audit',
    'keyword research',
    'local SEO',
  ],
  openGraph: {
    title: 'SEO Services | Premier Search Engine Optimization | Lucid Web Studios',
    description:
      'Dominate search results with our SEO-first approach. Content strategy, technical SEO, link building, and analytics.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Services | Lucid Web Studios',
    description:
      'Dominate search results with our SEO-first approach to web development.',
  },
  alternates: {
    canonical: '/seo',
  },
};

export default function SEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

