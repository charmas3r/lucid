import { getCaseStudies, SanityCaseStudy } from '@/lib/sanity';
import { CaseStudiesContent } from './CaseStudiesContent';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CaseStudiesPage() {
  let caseStudies: SanityCaseStudy[] = [];
  
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error('Error fetching case studies from Sanity:', error);
  }
  
  return <CaseStudiesContent caseStudies={caseStudies} />;
}
