import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | San Diego Web Design',
  description:
    'Get in touch with Lucid Web Studios to start your San Diego web design, development, mobile app, or SEO project. Free consultation — let\'s build it.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Lucid Web Studios',
    description:
      'Start your San Diego web design, development, mobile app, or SEO project with a free consultation.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
