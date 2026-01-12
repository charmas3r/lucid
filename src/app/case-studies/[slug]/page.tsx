import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCaseStudyBySlug, getCaseStudies, urlFor } from '@/lib/sanity';
import { CaseStudyContent } from './CaseStudyContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug?.current || study._id,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Lucid Web Studios',
    };
  }

  const imageUrl = caseStudy.image?.asset?._ref 
    ? urlFor(caseStudy.image).width(1200).height(630).quality(90).url()
    : null;

  return {
    title: `${caseStudy.title} | Case Study | Lucid Web Studios`,
    description: caseStudy.description,
    keywords: [
      caseStudy.client,
      caseStudy.clientIndustry || caseStudy.industry,
      ...(caseStudy.services || []),
      'case study',
      'portfolio',
      'San Diego web design',
    ].filter(Boolean) as string[],
    openGraph: {
      title: `${caseStudy.title} | Case Study`,
      description: caseStudy.description,
      type: 'article',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} | Case Study`,
      description: caseStudy.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyContent caseStudy={caseStudy} />;
}
