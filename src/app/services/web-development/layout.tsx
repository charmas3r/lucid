import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Web Development',
  description:
    'Custom websites built on Next.js and React — fast, accessible, and built to grow. Web development for San Diego businesses by Lucid Web Studios.',
  alternates: {
    canonical: '/services/web-development',
  },
  openGraph: {
    title: 'Web Development | Lucid Web Studios',
    description:
      'Fast, accessible custom websites built on Next.js and React, designed to grow with your business.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
};

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
