import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Lucid Web Studios | San Diego Web Design Agency',
  description:
    'Learn about Lucid Web Studios - a San Diego-based digital agency bringing clarity to local businesses through exceptional web design, development, and SEO since 2015.',
  keywords: [
    'about Lucid Web Studios',
    'San Diego web design agency',
    'local web development',
    'digital agency San Diego',
    'web design company',
    'Evan Smith developer',
  ],
  openGraph: {
    title: 'About Us | Lucid Web Studios',
    description:
      'A San Diego-based digital agency bringing clarity to local businesses through exceptional web design, development, and SEO.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Lucid Web Studios',
    description:
      'Learn about our mission to bring digital clarity to local businesses.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
