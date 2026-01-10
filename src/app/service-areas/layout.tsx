import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Areas | San Diego Web Development | Lucid Web Studios',
  description:
    'Lucid Web Studios proudly serves San Diego and surrounding areas including La Jolla, Carlsbad, Chula Vista, Escondido, and more. Local web development and digital marketing expertise.',
  keywords: [
    'San Diego web development',
    'La Jolla web design',
    'Carlsbad web development',
    'North County San Diego website',
    'South Bay San Diego web design',
    'San Diego SEO services',
    'local web developer San Diego',
    'web design near me San Diego',
    'San Diego digital agency',
    'web development San Diego County',
  ],
  openGraph: {
    title: 'Service Areas | San Diego Web Development | Lucid Web Studios',
    description:
      'Proudly serving San Diego County including La Jolla, Carlsbad, Chula Vista, Escondido, and all surrounding communities with expert web development services.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lucid Web Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Areas | San Diego Web Development',
    description:
      'Proudly serving San Diego County with expert web development, SEO, and digital marketing services.',
  },
  alternates: {
    canonical: '/service-areas',
  },
};

export default function ServiceAreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
