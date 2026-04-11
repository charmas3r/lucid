export type FAQ = {
  question: string;
  answer: string;
};

export type Industry = {
  name: string;
  description: string;
};

export type LocalCaseStudy = {
  title: string;
  summary: string;
  href?: string;
};

export type HubPageContent = {
  title: string;
  metaDescription: string;
  ogTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  localIntro: string[];
  localAngle: {
    kind: 'case-study' | 'industry-spotlight' | 'why-local';
    heading: string;
    body: string;
  };
};

export type ServicePageContent = {
  title: string;
  metaDescription: string;
  ogTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  localIntro: string[];
  industries: Industry[];
  caseStudy?: LocalCaseStudy;
  faq: FAQ[];
};

export type CityContent = {
  slug: string;
  displayName: string;
  county: 'North County San Diego';
  population: number;
  neighborhoods: string[];
  hub: HubPageContent;
  webDesign: ServicePageContent;
  seoServices: ServicePageContent;
};

export type ParsedLocationSlug =
  | { kind: 'hub'; citySlug: string }
  | { kind: 'web-design'; citySlug: string }
  | { kind: 'seo-services'; citySlug: string };
