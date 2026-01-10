import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Lucid Web Studios',
  description: 'Explore real results from real businesses. See how we\'ve helped companies across web development, mobile apps, e-commerce, SEO, and conversion optimization achieve transformative growth.',
  keywords: ['case studies', 'portfolio', 'web development projects', 'success stories', 'client results', 'San Diego web design'],
  openGraph: {
    title: 'Case Studies | Lucid Web Studios',
    description: 'Real results for real businesses. Explore our portfolio of successful digital transformations.',
    type: 'website',
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
