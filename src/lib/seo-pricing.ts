/**
 * Single source of truth for SEO & conversion (CRO) pricing.
 *
 * Every surface that mentions SEO packages — the SEO services pages, the
 * pricing page, and the free-website promo — imports from here so the numbers
 * can never drift apart. Update prices/deliverables in this file only.
 */

export interface SeoPackage {
  id: string;
  name: string;
  /** Display price, e.g. "$2,250" or "$500". */
  price: string;
  /** Numeric price for any math (discounts, sorting). */
  priceValue: number;
  /** Cadence label shown next to the price, e.g. "/mo" or "one-time". */
  cadence: string;
  tagline: string;
  description: string;
  features: string[];
  /** Visually emphasize this tier (used for "Grow"). */
  highlighted?: boolean;
}

/**
 * Phase 1 — the one-time foundation. Every ongoing engagement is built on top
 * of this initial fix, which is why it anchors the SEO offering site-wide.
 */
export const seoOneTimeFix: SeoPackage = {
  id: 'seo-fix',
  name: 'SEO Foundation Fix',
  price: '$2,250',
  priceValue: 2250,
  cadence: 'one-time',
  tagline: 'The foundation every engagement starts with',
  description:
    'A one-time, deep technical fix that sets the stage for everything that follows — built on tools and data we could not access during the initial assessment.',
  features: [
    '2 conditional landing pages / local service pages',
    'Comprehensive SEO audit using deeper-level tools beyond the initial assessment',
    'Detailed CRO analytics installed to start tracking conversions & drop-offs',
  ],
};

/**
 * Phase 2 — ongoing monthly retainers. Deliverables escalate across tiers:
 * Maintain (one content piece), Grow (one of each), Dominate (two of each plus
 * unlimited CRO and A/B testing).
 */
export const seoRetainerTiers: SeoPackage[] = [
  {
    id: 'maintain',
    name: 'Maintain',
    price: '$500',
    priceValue: 500,
    cadence: '/mo',
    tagline: 'Keep momentum month over month',
    description:
      'Steady, compounding progress that keeps your rankings and conversions moving in the right direction.',
    features: [
      '1 content deliverable / month — your choice of a local SEO service page, a conditional landing page, or a highly targeted blog post',
      '1 CRO tweak / month',
      'Monthly performance report',
    ],
  },
  {
    id: 'grow',
    name: 'Grow',
    price: '$850',
    priceValue: 850,
    cadence: '/mo',
    tagline: 'Accelerate on every front',
    description:
      'One of each deliverable every month so traffic, local presence, and conversions all advance together.',
    highlighted: true,
    features: [
      'One of each, every month — a local SEO service page, a conditional landing page, AND a highly targeted blog post',
      '1 CRO tweak / month',
      'Monthly performance report',
    ],
  },
  {
    id: 'dominate',
    name: 'Dominate',
    price: '$1,200',
    priceValue: 1200,
    cadence: '/mo',
    tagline: 'Own your market',
    description:
      'Maximum output and a continuous experimentation program run in lockstep with your marketing team.',
    features: [
      'Two of each, every month — local SEO service pages, conditional landing pages, AND highly targeted blog posts',
      'Unlimited CRO revisions, coordinated with your marketing / advertising firm',
      'CRO experimentation & A/B testing to optimize conversions',
      'Detailed experiment results included in your monthly report',
    ],
  },
];

/**
 * Bundle incentive: 30% off the one-time SEO & conversion fix when paired with
 * a 6-month commitment to Grow or higher.
 */
export const seoBundleOffer = {
  label: '30% off',
  headline: 'Bundle & save 30% on your one-time SEO & conversion fix',
  description:
    'Pair the one-time SEO & conversion fix with a 6-month commitment to Grow or higher and take 30% off the upfront cost.',
};

/** Lowest monthly retainer price, for "starting at" teasers. */
export const seoStartingPrice = '500';
