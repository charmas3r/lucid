import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllLocationSlugs,
  getCityContent,
  parseLocationSlug,
} from '@/lib/local-seo';
import { CityHubPage } from '@/components/local-seo/CityHubPage';
import { CityServicePage } from '@/components/local-seo/CityServicePage';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lucidweb.studio';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ locationSlug: slug }));
}

type PageProps = {
  params: Promise<{ locationSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locationSlug } = await params;
  const parsed = parseLocationSlug(locationSlug);
  if (!parsed) return {};

  const city = getCityContent(parsed.citySlug);
  if (!city) return {};

  const page =
    parsed.kind === 'hub'
      ? city.hub
      : parsed.kind === 'web-design'
        ? city.webDesign
        : city.seoServices;

  const canonicalUrl = `${BASE_URL}/${locationSlug}`;

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.ogTitle,
      description: page.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Lucid Web Studios',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.ogTitle,
      description: page.metaDescription,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { locationSlug } = await params;
  const parsed = parseLocationSlug(locationSlug);
  if (!parsed) notFound();

  const city = getCityContent(parsed.citySlug);
  if (!city) notFound();

  if (parsed.kind === 'hub') {
    return <CityHubPage city={city} />;
  }
  if (parsed.kind === 'web-design') {
    return <CityServicePage city={city} kind="web-design" />;
  }
  return <CityServicePage city={city} kind="seo-services" />;
}
