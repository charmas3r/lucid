import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversion Optimization',
  description:
    'Turn more San Diego website visitors into customers with data-driven CRO — A/B testing, funnel optimization, and UX improvements from Lucid Web Studios.',
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
