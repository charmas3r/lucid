import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversion Optimization | Lucid - Turn Visitors Into Customers',
  description:
    'Increase your conversion rates with psychology-driven design and data-backed optimization. We help San Diego businesses turn more website visitors into paying customers through A/B testing, funnel optimization, and UX improvements.',
  keywords: [
    'conversion optimization',
    'conversion rate optimization',
    'CRO',
    'A/B testing',
    'funnel optimization',
    'landing page optimization',
    'increase conversions',
    'reduce bounce rate',
    'UX optimization',
    'San Diego',
  ],
  openGraph: {
    title: 'Conversion Optimization | Lucid',
    description:
      'Turn more visitors into paying customers. Psychology-driven design and data-backed optimization for 2-3x conversion rates.',
    type: 'website',
  },
};

export default function ConversionOptimizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
