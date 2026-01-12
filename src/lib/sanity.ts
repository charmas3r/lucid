import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const sanityClient = createClient({
  projectId: 's6b35i15',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for faster reads
});

// Image URL builder
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types for Case Studies
export interface CaseStudyMetric {
  value: string;
  label: string;
  icon?: string;
}

export interface SanityCaseStudy {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  client: string;
  industry: string;
  category: 'web' | 'mobile' | 'ecommerce' | 'seo';
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  metrics: CaseStudyMetric[];
  timeline: string;
  featured: boolean;
  image?: {
    asset: {
      _ref: string;
    };
  };
  gradient?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  publishedAt: string;
}

// GROQ Queries
export const caseStudiesQuery = `*[_type == "caseStudy"] | order(featured desc, publishedAt desc) {
  _id,
  title,
  slug,
  client,
  industry,
  category,
  description,
  challenge,
  solution,
  services,
  metrics,
  timeline,
  featured,
  image,
  gradient,
  testimonial,
  publishedAt
}`;

export const featuredCaseStudiesQuery = `*[_type == "caseStudy" && featured == true] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  client,
  industry,
  category,
  description,
  services,
  metrics,
  timeline,
  featured,
  image,
  gradient
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  industry,
  category,
  description,
  challenge,
  solution,
  services,
  metrics,
  timeline,
  featured,
  image,
  gradient,
  testimonial,
  publishedAt
}`;

// Fetch functions
export async function getCaseStudies(): Promise<SanityCaseStudy[]> {
  return sanityClient.fetch(caseStudiesQuery);
}

export async function getFeaturedCaseStudies(): Promise<SanityCaseStudy[]> {
  return sanityClient.fetch(featuredCaseStudiesQuery);
}

export async function getCaseStudyBySlug(slug: string): Promise<SanityCaseStudy | null> {
  return sanityClient.fetch(caseStudyBySlugQuery, { slug });
}
