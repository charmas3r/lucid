import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Web Design & Development Services',
    template: '%s | Lucid Web Studios',
  },
  description:
    'Web development, mobile apps, e-commerce, SEO, and conversion optimization from Lucid Web Studios — clarity-driven digital solutions for San Diego.',
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
