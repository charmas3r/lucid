import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Commerce Development',
  description:
    'Online stores built to sell. Lucid Web Studios builds fast Shopify and headless e-commerce sites that turn browsers into buyers for San Diego brands.',
  alternates: {
    canonical: '/services/ecommerce',
  },
  openGraph: {
    title: 'E-Commerce Development | Lucid Web Studios',
    description:
      'Fast Shopify and headless e-commerce stores built to convert browsers into buyers.',
    type: 'website',
    siteName: 'Lucid Web Studios',
  },
};

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
