import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Website Build for San Diego',
  description:
    'Claim a free custom website from Lucid Web Studios. We build a limited number of free sites each month for qualifying San Diego businesses. Apply today.',
  alternates: {
    canonical: '/free',
  },
  openGraph: {
    title: 'Claim Your Free Website | Lucid Web Studios',
    description:
      'A limited number of free custom websites each month for qualifying San Diego businesses.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
};

export default function FreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
