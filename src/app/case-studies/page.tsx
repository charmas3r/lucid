import { getCaseStudies, SanityCaseStudy } from '@/lib/sanity';
import { CaseStudiesContent } from './CaseStudiesContent';

// Fallback data when Sanity is empty
const fallbackCaseStudies = [
  {
    _id: 'coastal-dental',
    slug: { current: 'coastal-dental' },
    category: 'web' as const,
    title: 'Coastal Dental Group',
    client: 'Coastal Dental Group',
    description: 'A full website redesign that increased patient bookings by 340% and established them as the premier dental practice in La Jolla.',
    challenge: 'The practice was struggling with an outdated website that didn\'t convert visitors into patients.',
    solution: 'We built a modern, fast website with online booking integration and local SEO optimization.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    industry: 'Healthcare',
    timeline: '8 weeks',
    metrics: [
      { label: 'Patient Bookings', value: '+342%' },
      { label: 'Organic Traffic', value: '+600%' },
      { label: 'Lighthouse Score', value: '100' },
    ],
    services: ['Web Design', 'Development', 'SEO'],
    testimonial: {
      quote: 'Lucid transformed our online presence completely. The new website pays for itself every month with the new patients we get.',
      author: 'Dr. Sarah Chen',
      role: 'Practice Owner',
    },
    featured: true,
    publishedAt: '2024-01-15',
  },
  {
    _id: 'harvest-table',
    slug: { current: 'harvest-table' },
    category: 'ecommerce' as const,
    title: 'Harvest Table',
    client: 'Harvest Table',
    description: 'Built a custom e-commerce solution connecting local farms directly to consumers, featuring subscription boxes and same-day delivery.',
    challenge: 'The client needed a way to sell farm-fresh products online with subscription capabilities.',
    solution: 'We created a custom e-commerce platform with subscription management, delivery routing, and inventory sync.',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    industry: 'Food & Beverage',
    timeline: '12 weeks',
    metrics: [
      { label: 'Monthly Revenue', value: '+738%' },
      { label: 'Subscriber Base', value: '2,400' },
      { label: 'Cart Abandonment', value: '-70%' },
    ],
    services: ['E-Commerce', 'Custom Development', 'UX Design'],
    testimonial: {
      quote: 'They didn\'t just build us a website—they built us a business. The subscription system alone generates $40k monthly.',
      author: 'Marcus Rivera',
      role: 'Founder',
    },
    featured: true,
    publishedAt: '2024-02-20',
  },
  {
    _id: 'summit-fitness',
    slug: { current: 'summit-fitness' },
    category: 'mobile' as const,
    title: 'Summit Fitness',
    client: 'Summit Fitness',
    description: 'A comprehensive fitness app with AI-powered workout recommendations, social features, and integration with wearable devices.',
    challenge: 'Create a fitness app that stands out in a crowded market with unique AI features.',
    solution: 'Built a cross-platform app using Flutter with ML-powered recommendations and Apple/Google Health integration.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    industry: 'Health & Fitness',
    timeline: '16 weeks',
    metrics: [
      { label: 'App Downloads', value: '45K+' },
      { label: 'Monthly Active Users', value: '28K+' },
      { label: 'App Store Rating', value: '4.8' },
    ],
    services: ['Mobile Development', 'UI/UX Design', 'Backend'],
    testimonial: {
      quote: 'The app exceeded every expectation. Users love the AI recommendations—retention is through the roof.',
      author: 'Jake Morrison',
      role: 'CEO',
    },
    featured: true,
    publishedAt: '2024-03-10',
  },
  {
    _id: 'pacific-law',
    slug: { current: 'pacific-law' },
    category: 'seo' as const,
    title: 'Pacific Law Partners',
    client: 'Pacific Law Partners',
    description: 'Comprehensive SEO strategy that took a boutique law firm from page 5 to position 1 for their key practice areas.',
    challenge: 'The firm was invisible in search results and losing potential clients to competitors.',
    solution: 'Implemented a full SEO overhaul including technical fixes, content strategy, and local SEO.',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    industry: 'Legal Services',
    timeline: '6 months',
    metrics: [
      { label: 'Organic Rankings', value: '#1' },
      { label: 'Qualified Leads', value: '+1,467%' },
      { label: 'Revenue Growth', value: '+394%' },
    ],
    services: ['SEO', 'Content Strategy', 'Local SEO'],
    testimonial: {
      quote: 'We went from invisible to dominant. Lucid\'s SEO work doubled our firm\'s size in under a year.',
      author: 'Jennifer Walsh',
      role: 'Managing Partner',
    },
    featured: false,
    publishedAt: '2023-11-05',
  },
  {
    _id: 'artisan-coffee',
    slug: { current: 'artisan-coffee' },
    category: 'web' as const,
    title: 'Artisan Coffee Roasters',
    client: 'Artisan Coffee Roasters',
    description: 'Data-driven CRO that increased online sales by 287% through strategic A/B testing and user experience improvements.',
    challenge: 'Low conversion rates were limiting the growth potential of this specialty coffee brand.',
    solution: 'Conducted extensive user research and implemented data-driven UX improvements.',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    industry: 'Food & Beverage',
    timeline: '4 months',
    metrics: [
      { label: 'Conversion Rate', value: '+283%' },
      { label: 'Average Order Value', value: '+81%' },
      { label: 'Revenue', value: '+292%' },
    ],
    services: ['CRO', 'A/B Testing', 'Analytics'],
    testimonial: {
      quote: 'The ROI was immediate. Every change they made was backed by data, and the results speak for themselves.',
      author: 'David Park',
      role: 'Owner',
    },
    featured: false,
    publishedAt: '2023-10-15',
  },
  {
    _id: 'verde-landscaping',
    slug: { current: 'verde-landscaping' },
    category: 'web' as const,
    title: 'Verde Landscaping',
    client: 'Verde Landscaping',
    description: 'A conversion-focused website that turned a local landscaper into the most booked contractor in North County.',
    challenge: 'The business relied solely on word-of-mouth and needed to scale through digital channels.',
    solution: 'Built a lead-generation focused website with instant quote calculators and scheduling.',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    industry: 'Home Services',
    timeline: '6 weeks',
    metrics: [
      { label: 'Monthly Leads', value: '+1,013%' },
      { label: 'Quote Requests', value: '+1,575%' },
      { label: 'Page Load Time', value: '-87%' },
    ],
    services: ['Web Design', 'Lead Gen', 'Speed Optimization'],
    testimonial: {
      quote: 'I had to hire 3 more crews to handle all the new business. Best investment I ever made.',
      author: 'Carlos Mendez',
      role: 'Owner',
    },
    featured: false,
    publishedAt: '2023-09-20',
  },
  {
    _id: 'mindful-therapy',
    slug: { current: 'mindful-therapy' },
    category: 'mobile' as const,
    title: 'Mindful Therapy',
    client: 'Mindful Therapy',
    description: 'A HIPAA-compliant telehealth app connecting patients with licensed therapists, featuring secure video and messaging.',
    challenge: 'Build a healthcare app that meets strict compliance requirements while being user-friendly.',
    solution: 'Developed a secure, HIPAA-compliant platform with encrypted video and messaging.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    industry: 'Healthcare',
    timeline: '20 weeks',
    metrics: [
      { label: 'Active Patients', value: '12K+' },
      { label: 'Session Completion', value: '94%' },
      { label: 'Provider Network', value: '180+' },
    ],
    services: ['Mobile App', 'HIPAA Compliance', 'Backend'],
    testimonial: {
      quote: 'They understood healthcare compliance deeply. The app is beautiful, secure, and our patients love it.',
      author: 'Dr. Amanda Torres',
      role: 'Clinical Director',
    },
    featured: false,
    publishedAt: '2023-08-10',
  },
  {
    _id: 'urban-threads',
    slug: { current: 'urban-threads' },
    category: 'ecommerce' as const,
    title: 'Urban Threads',
    client: 'Urban Threads',
    description: 'Complete platform migration and redesign that tripled sales and established a cult following among young professionals.',
    challenge: 'The existing platform was slow and couldn\'t handle the brand\'s growing product catalog.',
    solution: 'Migrated to Shopify Plus with a custom theme and advanced filtering.',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    industry: 'Fashion',
    timeline: '10 weeks',
    metrics: [
      { label: 'Monthly Sales', value: '+247%' },
      { label: 'Return Rate', value: '-76%' },
      { label: 'Mobile Conversion', value: '+425%' },
    ],
    services: ['E-Commerce', 'UX Design', 'Shopify Plus'],
    testimonial: {
      quote: 'The new site feels premium. Our customers literally tell us how much they love shopping with us now.',
      author: 'Nina Chen',
      role: 'Founder',
    },
    featured: false,
    publishedAt: '2023-07-25',
  },
];

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CaseStudiesPage() {
  let caseStudies: SanityCaseStudy[] = [];
  
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error('Error fetching case studies from Sanity:', error);
  }
  
  // Use Sanity data if available, otherwise fallback
  const studies = caseStudies.length > 0 ? caseStudies : fallbackCaseStudies;
  
  return <CaseStudiesContent caseStudies={studies} />;
}
