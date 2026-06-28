import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Case Studies',
    template: '%s | Lucid Web Studios',
  },
  description: 'See real results for real businesses — web development, mobile apps, e-commerce, SEO, and conversion optimization projects from Lucid Web Studios.',
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
