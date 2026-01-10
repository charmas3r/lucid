import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Lucid - Digital Solutions for San Diego Businesses',
  description:
    'Expert web development, mobile apps, e-commerce, SEO, and conversion optimization services. Lucid brings clarity to your digital presence with cutting-edge technology and results-driven strategies.',
  openGraph: {
    title: 'Services | Lucid',
    description:
      'Expert web development, mobile apps, e-commerce, SEO, and conversion optimization services. Lucid brings clarity to your digital presence.',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
