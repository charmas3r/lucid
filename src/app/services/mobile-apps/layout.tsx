import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile App Development',
  description:
    'Native and cross-platform iOS and Android apps from Lucid Web Studios — from MVP to production. Built for San Diego businesses on every platform.',
  alternates: {
    canonical: '/services/mobile-apps',
  },
  openGraph: {
    title: 'Mobile App Development | Lucid Web Studios',
    description:
      'Native and cross-platform iOS and Android apps, from MVP to production, for San Diego businesses.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
};

export default function MobileAppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
