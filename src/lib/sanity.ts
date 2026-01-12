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

export interface CaseStudyGoal {
  goal: string;
  isPrimary?: boolean;
}

export interface CaseStudyPhase {
  phaseName: string;
  description?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudyCTA {
  text?: string;
  linkUrl?: string;
  linkText?: string;
}

export interface SanityCaseStudy {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  client: string;
  // New fields after Client Name
  clientIndustry?: string;
  clientLocation?: string;
  // Legacy industry field (for backward compatibility)
  industry?: string;
  category: 'web' | 'mobile' | 'ecommerce' | 'seo';
  description: string;
  // New fields after Short Description
  projectGoals?: CaseStudyGoal[];
  timeline?: string;
  challenge?: string;
  solution?: string;
  // New fields after Our Solution
  processApproach?: CaseStudyPhase[];
  techStack?: string[];
  services?: string[];
  metrics?: CaseStudyMetric[];
  // New field after Key Metrics
  resultsSummary?: string;
  testimonial?: CaseStudyTestimonial;
  // New CTA field
  callToAction?: CaseStudyCTA;
  featured: boolean;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  gradient?: string;
  publishedAt: string;
}

// GROQ Queries - includes all fields for frontend rendering
export const caseStudiesQuery = `*[_type == "caseStudy"] | order(featured desc, publishedAt desc) {
  _id,
  title,
  slug,
  client,
  clientIndustry,
  clientLocation,
  industry,
  category,
  description,
  projectGoals,
  timeline,
  challenge,
  solution,
  processApproach,
  techStack,
  services,
  metrics,
  resultsSummary,
  testimonial,
  callToAction,
  featured,
  image,
  gradient,
  publishedAt
}`;

export const featuredCaseStudiesQuery = `*[_type == "caseStudy" && featured == true] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  client,
  clientIndustry,
  clientLocation,
  industry,
  category,
  description,
  projectGoals,
  timeline,
  services,
  metrics,
  resultsSummary,
  featured,
  image,
  gradient
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  clientIndustry,
  clientLocation,
  industry,
  category,
  description,
  projectGoals,
  timeline,
  challenge,
  solution,
  processApproach,
  techStack,
  services,
  metrics,
  resultsSummary,
  testimonial,
  callToAction,
  featured,
  image,
  gradient,
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
