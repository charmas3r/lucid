'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Box,
  Badge,
  Stack,
  SimpleGrid,
  Group,
  List,
  ThemeIcon,
  Tabs,
  Divider,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  IconCheck,
  IconArrowRight,
  IconCode,
  IconDeviceMobile,
  IconShoppingCart,
  IconChartBar,
  IconSearch,
  IconCalendar,
  IconSparkles,
  IconRocket,
  IconCrown,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';
import { trackEvent, EVENTS } from '@/lib/analytics';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Web Development Pricing
const webPricing = [
  {
    name: 'Starter Site',
    tagline: 'Perfect for small businesses',
    price: '$2,500',
    priceNote: 'starting at',
    icon: IconSparkles,
    popular: false,
    features: [
      'Up to 5 pages',
      'Mobile responsive design',
      'Basic SEO setup',
      'Contact form integration',
      'SSL certificate',
      '2 rounds of revisions',
      '30-day support',
    ],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
  },
  {
    name: 'Business Pro',
    tagline: 'For growing businesses',
    price: '$7,500',
    priceNote: 'starting at',
    icon: IconRocket,
    popular: true,
    features: [
      'Up to 15 pages',
      'Custom design & animations',
      'Advanced SEO optimization',
      'CMS integration (WordPress/Strapi)',
      'Analytics dashboard',
      'Blog functionality',
      'API integrations',
      'Unlimited revisions',
      '90-day support',
    ],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    name: 'Web Application',
    tagline: 'Custom web apps & platforms',
    price: '$15,000+',
    priceNote: 'starting at',
    icon: IconCrown,
    popular: false,
    features: [
      'Custom web application',
      'User authentication system',
      'Database design & setup',
      'Admin dashboard',
      'Third-party integrations',
      'Performance optimization',
      'Security audit included',
      '6-month support',
    ],
    gradient: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
  },
];

// Mobile App Pricing
const mobilePricing = [
  {
    name: 'MVP Launch',
    tagline: 'Validate your idea fast',
    price: '$15,000',
    priceNote: 'starting at',
    icon: IconSparkles,
    popular: false,
    features: [
      'Single platform (iOS or Android)',
      'Core feature set (up to 5 screens)',
      'Basic UI design',
      'Push notifications',
      'Analytics integration',
      'App store submission',
      '60-day bug support',
    ],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
  },
  {
    name: 'Cross-Platform',
    tagline: 'iOS & Android from one codebase',
    price: '$35,000',
    priceNote: 'starting at',
    icon: IconRocket,
    popular: true,
    features: [
      'iOS & Android apps',
      'React Native or Flutter',
      'Custom UI/UX design',
      'User authentication',
      'Backend API development',
      'Push notifications',
      'In-app purchases ready',
      'Third-party integrations',
      '90-day support',
    ],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    name: 'Enterprise App',
    tagline: 'Full-scale mobile solutions',
    price: 'Custom',
    priceNote: 'tailored to scope',
    icon: IconCrown,
    popular: false,
    features: [
      'Native iOS & Android',
      'Complex feature sets',
      'Offline functionality',
      'Real-time sync',
      'Advanced security',
      'Integration with existing systems',
      'Dedicated project manager',
      '1-year maintenance included',
    ],
    gradient: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
  },
];

// E-Commerce Pricing
const ecommercePricing = [
  {
    name: 'Shopify Starter',
    tagline: 'Quick launch online store',
    price: '$3,500',
    priceNote: 'starting at',
    icon: IconSparkles,
    popular: false,
    features: [
      'Shopify theme customization',
      'Up to 50 products',
      'Payment gateway setup',
      'Shipping configuration',
      'Basic SEO setup',
      'Mobile responsive',
      'Training session included',
      '30-day support',
    ],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
  },
  {
    name: 'Custom Storefront',
    tagline: 'Headless commerce solution',
    price: '$12,000',
    priceNote: 'starting at',
    icon: IconRocket,
    popular: true,
    features: [
      'Shopify + Hydrogen/Next.js',
      'Lightning-fast performance',
      'Custom design & UX',
      'Unlimited products',
      'Advanced filtering & search',
      'Subscription support',
      'Multi-currency ready',
      'Inventory management',
      '90-day support',
    ],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    name: 'Enterprise Commerce',
    tagline: 'High-volume scalable solution',
    price: 'Custom',
    priceNote: 'based on requirements',
    icon: IconCrown,
    popular: false,
    features: [
      'Fully custom platform',
      'Multi-store management',
      'B2B & B2C capabilities',
      'ERP/CRM integrations',
      'Custom checkout flows',
      'Advanced analytics',
      'Dedicated support team',
      'Performance SLA',
    ],
    gradient: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
  },
];

// Conversion Optimization Pricing
const conversionPricing = [
  {
    name: 'Quick Wins Audit',
    tagline: 'Identify immediate opportunities',
    price: '$1,500',
    priceNote: 'one-time',
    icon: IconSparkles,
    popular: false,
    features: [
      'Full site conversion audit',
      'Heatmap & analytics review',
      'Top 10 issues identified',
      'Priority action plan',
      'Competitor benchmarking',
      'Video walkthrough',
      '30-min strategy call',
    ],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
  },
  {
    name: 'CRO Program',
    tagline: 'Ongoing optimization',
    price: '$2,500',
    priceNote: 'per month',
    icon: IconRocket,
    popular: true,
    features: [
      '2-4 A/B tests per month',
      'Continuous user research',
      'Heatmap & session analysis',
      'Landing page optimization',
      'Form & checkout optimization',
      'Monthly strategy calls',
      'Detailed reporting',
      'Dedicated CRO specialist',
    ],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    name: 'Full Funnel Redesign',
    tagline: 'Complete conversion overhaul',
    price: '$8,000',
    priceNote: 'starting at',
    icon: IconCrown,
    popular: false,
    features: [
      'Complete UX audit',
      'User journey redesign',
      'Psychology-driven wireframes',
      'High-converting landing pages',
      'Checkout flow optimization',
      'A/B testing setup',
      'Post-launch optimization',
      '90-day performance guarantee',
    ],
    gradient: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
  },
];

// SEO Pricing
const seoPricing = [
  {
    name: 'Technical SEO Fix',
    tagline: 'One-time optimization',
    price: '$2,000',
    priceNote: 'one-time',
    icon: IconSparkles,
    popular: false,
    features: [
      'Full technical audit',
      'Core Web Vitals optimization',
      'Site speed improvements',
      'Schema markup setup',
      'XML sitemap & robots.txt',
      'Google Search Console setup',
      'Implementation report',
    ],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
  },
  {
    name: 'Growth SEO',
    tagline: 'Monthly optimization',
    price: '$1,500',
    priceNote: 'per month',
    icon: IconRocket,
    popular: true,
    features: [
      'Technical SEO maintenance',
      'Content optimization',
      'Keyword research & tracking',
      'Link building outreach',
      'Competitor analysis',
      'Monthly reporting',
      'AI assistant optimization',
      'Quarterly strategy sessions',
    ],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    name: 'SEO + Content',
    tagline: 'Full organic growth',
    price: '$3,500',
    priceNote: 'per month',
    icon: IconCrown,
    popular: false,
    features: [
      'Everything in Growth SEO',
      '4 SEO blog posts/month',
      'Content strategy & calendar',
      'Topic cluster development',
      'Featured snippet optimization',
      'Local SEO (if applicable)',
      'Google Business optimization',
      'Dedicated SEO manager',
    ],
    gradient: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
  },
];

const serviceCategories = [
  { value: 'web', label: 'Web Development', icon: IconCode, pricing: webPricing },
  { value: 'mobile', label: 'Mobile Apps', icon: IconDeviceMobile, pricing: mobilePricing },
  { value: 'ecommerce', label: 'E-Commerce', icon: IconShoppingCart, pricing: ecommercePricing },
  { value: 'conversion', label: 'Conversion', icon: IconChartBar, pricing: conversionPricing },
  { value: 'seo', label: 'SEO', icon: IconSearch, pricing: seoPricing },
];

const addOns = [
  { name: 'Monthly Maintenance', price: '$299/mo', description: 'Updates, backups, security monitoring' },
  { name: 'Logo & Branding', price: '$1,500', description: 'Complete brand identity package' },
  { name: 'Content Writing', price: '$150/page', description: 'SEO-optimized copywriting' },
  { name: 'Photography', price: '$500', description: 'Professional product/team photos' },
];

function PricingCard({ tier, index, isInView, category }: { tier: typeof webPricing[0]; index: number; isInView: boolean; category: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
      style={{ height: '100%' }}
    >
      <Box
        p="xl"
        style={{
          background: tier.popular ? 'linear-gradient(135deg, #0A1A3F 0%, #1A2F5F 100%)' : '#F8F9FB',
          borderRadius: 24,
          border: tier.popular ? 'none' : '1px solid rgba(10, 26, 63, 0.06)',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: tier.popular ? '0 25px 50px rgba(10, 26, 63, 0.25)' : 'none',
        }}
      >
        {tier.popular && (
          <Badge
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)',
              color: '#FFFFFF',
            }}
          >
            Most Popular
          </Badge>
        )}

        <Stack gap="lg" h="100%">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ThemeIcon
              size={60}
              radius="xl"
              style={{
                background: tier.gradient,
                boxShadow: tier.popular ? '0 8px 25px rgba(77, 163, 255, 0.4)' : '0 8px 25px rgba(31, 79, 216, 0.2)',
              }}
            >
              <tier.icon size={28} color="#FFFFFF" stroke={1.5} />
            </ThemeIcon>
          </motion.div>

          <Box>
            <Text
              size="sm"
              fw={500}
              style={{ color: tier.popular ? 'rgba(255, 255, 255, 0.7)' : '#5A7099' }}
            >
              {tier.tagline}
            </Text>
            <Title
              order={3}
              mt={4}
              style={{
                fontSize: '1.5rem',
                color: tier.popular ? '#FFFFFF' : '#0A1A3F',
              }}
            >
              {tier.name}
            </Title>
          </Box>

          <Box>
            <Text
              size="xs"
              tt="uppercase"
              fw={500}
              style={{ color: tier.popular ? 'rgba(255, 255, 255, 0.6)' : '#8A9BB8', letterSpacing: '0.5px' }}
            >
              {tier.priceNote}
            </Text>
            <Text
              fw={700}
              style={{
                fontSize: '2.5rem',
                color: tier.popular ? '#FFFFFF' : '#0A1A3F',
                lineHeight: 1.2,
              }}
            >
              {tier.price}
            </Text>
          </Box>

          <List
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon
                size={20}
                radius="xl"
                style={{
                  background: tier.popular ? 'rgba(77, 163, 255, 0.3)' : 'rgba(31, 79, 216, 0.1)',
                }}
              >
                <IconCheck size={12} color={tier.popular ? '#4DA3FF' : '#1F4FD8'} />
              </ThemeIcon>
            }
            style={{ flexGrow: 1 }}
          >
            {tier.features.map((feature) => (
              <List.Item
                key={feature}
                style={{ color: tier.popular ? 'rgba(255, 255, 255, 0.9)' : '#5A7099' }}
              >
                {feature}
              </List.Item>
            ))}
          </List>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              component={Link}
              href="/contact"
              fullWidth
              size="lg"
              radius="xl"
              rightSection={<IconArrowRight size={18} />}
              onClick={() => trackEvent(EVENTS.PRICING_SELECT_PLAN, { plan: tier.name, category, price: tier.price })}
              styles={{
                root: {
                  background: tier.popular 
                    ? 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)'
                    : tier.gradient,
                  border: 'none',
                  transition: 'all 0.2s ease',
                },
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Stack>
      </Box>
    </motion.div>
  );
}

export default function PricingPage() {
  const heroRef = useRef(null);
  const pricingRef = useRef(null);
  const addOnsRef = useRef(null);
  const faqRef = useRef(null);
  const [activeTab, setActiveTab] = useState<string | null>('web');

  const heroInView = useInView(heroRef, { once: true });
  const pricingInView = useInView(pricingRef, { once: true, margin: '-100px' });
  const addOnsInView = useInView(addOnsRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });

  const currentPricing = serviceCategories.find(cat => cat.value === activeTab)?.pricing || webPricing;

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <Box
          component="section"
          pt={160}
          pb={80}
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={heroRef}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(31, 79, 216, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <Container size="xl" style={{ position: 'relative' }}>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={heroInView ? 'animate' : 'initial'}
            >
              <Stack align="center" gap="xl">
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Badge
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    fw={600}
                    style={{
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    Transparent Pricing
                  </Badge>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Title
                    order={1}
                    ta="center"
                    maw={800}
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: '#FFFFFF',
                    }}
                  >
                    Invest in{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Quality
                    </Text>{' '}
                    That Pays Off
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    maw={650}
                    lh={1.8}
                    style={{ color: '#A5B4CF' }}
                  >
                    No hidden fees, no surprise charges. Choose the service and package that fits your needs,
                    or let us create a custom solution for your business.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Pricing Tabs & Tiers */}
        <Box
          component="section"
          id="packages"
          py={80}
          style={{ background: '#0A1A3F' }}
          ref={pricingRef}
        >
          <Container size="xl">
            {/* Service Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Tabs
                value={activeTab}
                onChange={(value) => {
                  setActiveTab(value);
                  if (value) trackEvent(EVENTS.PRICING_VIEW_TAB, { tab: value });
                }}
                variant="pills"
                radius="xl"
                styles={{
                  root: {
                    marginBottom: 50,
                  },
                  list: {
                    justifyContent: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                    background: '#081430',
                    padding: 8,
                    borderRadius: 50,
                    display: 'inline-flex',
                    width: 'auto',
                    margin: '0 auto',
                  },
                  tab: {
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    padding: '12px 20px',
                    color: '#A5B4CF',
                    border: 'none',
                  },
                }}
                classNames={{
                  tab: 'pricing-tab',
                }}
              >
                <Tabs.List>
                  {serviceCategories.map((category) => (
                    <Tabs.Tab
                      key={category.value}
                      value={category.value}
                      leftSection={<category.icon size={18} />}
                    >
                      {category.label}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>
            </motion.div>

            {/* Pricing Cards */}
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}>
              {currentPricing.map((tier, index) => (
                <PricingCard
                  key={`${activeTab}-${tier.name}`}
                  tier={tier}
                  index={index}
                  isInView={pricingInView}
                  category={activeTab || 'web'}
                />
              ))}
            </SimpleGrid>

            {/* Note about custom pricing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={pricingInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Text ta="center" size="sm" mt={40} style={{ color: '#8A9BB8' }}>
                All prices are estimates. Final pricing depends on project scope and requirements.{' '}
                <Text component={Link} href="/contact" style={{ color: '#1F4FD8', textDecoration: 'underline' }}>
                  Get a custom quote →
                </Text>
              </Text>
            </motion.div>
          </Container>
        </Box>

        {/* Bundle Savings */}
        <Box
          component="section"
          py={60}
          style={{ background: 'linear-gradient(135deg, #0A1A3F 0%, #1A2F5F 100%)' }}
        >
          <Container size="lg">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40} style={{ alignItems: 'center' }}>
              <Box>
                <Badge
                  size="lg"
                  radius="xl"
                  mb="md"
                  style={{
                    background: 'rgba(77, 163, 255, 0.2)',
                    color: '#4DA3FF',
                    border: '1px solid rgba(77, 163, 255, 0.3)',
                  }}
                >
                  Bundle & Save
                </Badge>
                <Title order={2} style={{ color: '#FFFFFF', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  Combine Services for Better Results
                </Title>
                <Text size="md" mt="md" style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  Need a website, mobile app, AND conversion optimization? Bundle services together 
                  and save 15-20% while ensuring everything works together seamlessly.
                </Text>
              </Box>
              <Stack gap="md">
                {[
                  { bundle: 'Website + SEO', savings: 'Save 15%', desc: 'Launch optimized from day one' },
                  { bundle: 'Website + Conversion', savings: 'Save 15%', desc: 'Built to convert visitors' },
                  { bundle: 'E-Commerce + SEO + CRO', savings: 'Save 20%', desc: 'Complete growth stack' },
                ].map((item) => (
                  <Box
                    key={item.bundle}
                    p="md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 12,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Group justify="space-between">
                      <Box>
                        <Text fw={600} style={{ color: '#FFFFFF' }}>{item.bundle}</Text>
                        <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.desc}</Text>
                      </Box>
                      <Badge
                        size="lg"
                        style={{
                          background: 'linear-gradient(135deg, #0CCE6B 0%, #0A9F55 100%)',
                          color: '#FFFFFF',
                        }}
                      >
                        {item.savings}
                      </Badge>
                    </Group>
                  </Box>
                ))}
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Add-ons Section */}
        <Box
          component="section"
          py={80}
          style={{ background: '#081430' }}
          ref={addOnsRef}
        >
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="xl" mb={60}>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(31, 79, 216, 0.08)',
                    color: '#1F4FD8',
                    border: '1px solid rgba(31, 79, 216, 0.15)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Add-Ons
                </Badge>
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Enhance Any Package
                </Title>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={20}>
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    p="lg"
                    style={{
                      background: '#0A1A3F',
                      borderRadius: 16,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                    }}
                  >
                    <Stack gap="xs">
                      <Text fw={600} style={{ color: '#FFFFFF' }}>
                        {addon.name}
                      </Text>
                      <Text
                        fw={700}
                        style={{
                          fontSize: '1.25rem',
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {addon.price}
                      </Text>
                      <Text size="sm" style={{ color: '#A5B4CF' }}>
                        {addon.description}
                      </Text>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* FAQ / CTA Section */}
        <Box
          component="section"
          py={100}
          style={{
            background: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={faqRef}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: 400,
              height: 400,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <Container size="md" style={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="xl" ta="center">
                <ThemeIcon
                  size={70}
                  radius="xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <IconCalendar size={32} color="#FFFFFF" stroke={1.5} />
                </ThemeIcon>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Not Sure Where to Start?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  Schedule a free 30-minute consultation. We&apos;ll discuss your goals,
                  assess your needs, and recommend the best path forward—no strings attached.
                </Text>

                <Group gap="md" mt="md">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/contact"
                      size="lg"
                      radius="xl"
                      rightSection={<IconArrowRight size={18} />}
                      styles={{
                        root: {
                          background: '#0A1A3F',
                          color: '#1F4FD8',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: '#081430',
                          },
                        },
                      }}
                    >
                      Book Free Consultation
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/services"
                      size="lg"
                      radius="xl"
                      variant="outline"
                      styles={{
                        root: {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          color: '#FFFFFF',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderColor: '#FFFFFF',
                          },
                        },
                      }}
                    >
                      View Services
                    </Button>
                  </motion.div>
                </Group>
              </Stack>
            </motion.div>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
