'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Box,
  Stack,
  SimpleGrid,
  Group,
  Paper,
  Badge,
  Accordion,
} from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowRight,
  IconCode,
  IconSearch,
  IconMapPin,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandGoogle,
  IconStar,
  IconBuildingStore,
  IconCoin,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';
import type { CityContent, ServicePageContent } from '@/lib/local-seo';
import { LocalBusinessSchema } from './LocalBusinessSchema';
import { ServiceSchema } from './ServiceSchema';
import { BreadcrumbSchema } from './BreadcrumbSchema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lucidweb.studio';

type ServiceKind = 'web-design' | 'seo-services';

type CityServicePageProps = {
  city: CityContent;
  kind: ServiceKind;
};

export function CityServicePage({ city, kind }: CityServicePageProps) {
  const content: ServicePageContent =
    kind === 'web-design' ? city.webDesign : city.seoServices;

  const accent = kind === 'web-design' ? '#4DA3FF' : '#10B981';
  const Icon = kind === 'web-design' ? IconCode : IconSearch;
  const serviceLabel = kind === 'web-design' ? 'Web Design' : 'SEO Services';
  const schemaServiceType =
    kind === 'web-design' ? 'Web Design' : 'Local SEO Services';
  const pagePath =
    kind === 'web-design' ? `${city.slug}-web-design` : `${city.slug}-seo-services`;
  const siblingPath =
    kind === 'web-design' ? `${city.slug}-seo-services` : `${city.slug}-web-design`;
  const siblingLabel =
    kind === 'web-design' ? `${city.displayName} SEO Services` : `${city.displayName} Web Design`;
  const pageUrl = `${BASE_URL}/${pagePath}`;

  return (
    <>
      <LocalBusinessSchema areaServed={city.displayName} pageUrl={pageUrl} />
      <ServiceSchema
        serviceType={schemaServiceType}
        areaServed={city.displayName}
        pageUrl={pageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Service Areas', url: `${BASE_URL}/service-areas` },
          { name: city.displayName, url: `${BASE_URL}/${city.slug}` },
          { name: serviceLabel, url: pageUrl },
        ]}
      />
      <Navigation />
      <main>
        {/* Hero */}
        <Box
          component="section"
          pt={160}
          pb={80}
          style={{
            background: 'linear-gradient(180deg, #0A1A3F 0%, #081430 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                size="lg"
                variant="outline"
                leftSection={<IconMapPin size={16} />}
                style={{
                  color: accent,
                  borderColor: `${accent}66`,
                  marginBottom: 24,
                }}
              >
                {city.displayName}, {city.county}
              </Badge>
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: '#FFFFFF',
                  marginBottom: 24,
                  lineHeight: 1.1,
                }}
              >
                {content.heroHeadline}
              </Title>
              <Text size="xl" style={{ color: '#A5B4CF', maxWidth: 720 }}>
                {content.heroSubheadline}
              </Text>
              <Group mt={40}>
                <Button
                  component={Link}
                  href="/contact"
                  size="lg"
                  rightSection={<IconArrowRight size={18} />}
                  style={{ background: accent }}
                >
                  Get a Free Quote
                </Button>
                <Button
                  component={Link}
                  href={`/${city.slug}`}
                  size="lg"
                  variant="outline"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  About {city.displayName}
                </Button>
              </Group>
            </motion.div>
          </Container>
        </Box>

        {/* Local intro */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Stack gap="lg">
              {content.localIntro.map((paragraph, idx) => (
                <Text key={idx} size="lg" style={{ color: '#D1DAEE', lineHeight: 1.7 }}>
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* Industries */}
        <Box component="section" py={80} style={{ background: '#081430' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Industries we serve in {city.displayName}
            </Title>
            <Text ta="center" size="lg" style={{ color: '#A5B4CF', marginBottom: 48 }}>
              Specialized experience across {city.displayName}&apos;s core business sectors
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              {content.industries.map((industry) => (
                <Paper
                  key={industry.name}
                  p="xl"
                  radius="lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Group gap={12} mb={12}>
                    <Icon size={28} color={accent} />
                    <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>
                      {industry.name}
                    </Title>
                  </Group>
                  <Text style={{ color: '#A5B4CF' }}>{industry.description}</Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Our process (shared across all cities) */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Our process
            </Title>
            <Text ta="center" size="lg" style={{ color: '#A5B4CF', marginBottom: 48 }}>
              {kind === 'web-design'
                ? `How we take a ${city.displayName} web design project from kickoff to launch.`
                : `How we take a ${city.displayName} SEO engagement from audit to rankings.`}
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="lg">
              {(kind === 'web-design'
                ? [
                    { step: '01', title: 'Discovery', desc: 'Free in-person kickoff. We learn your business and goals.' },
                    { step: '02', title: 'Design', desc: 'Wireframes and visuals, iterated until you approve.' },
                    { step: '03', title: 'Build', desc: 'Custom Next.js build with clean, typed, tested code.' },
                    { step: '04', title: 'Launch', desc: 'Deploy to Vercel with zero-downtime rollout.' },
                    { step: '05', title: 'Support', desc: 'Ongoing tweaks, performance monitoring, and content help.' },
                  ]
                : [
                    { step: '01', title: 'Audit', desc: 'Deep crawl of your site, GBP, and competitor landscape.' },
                    { step: '02', title: 'Strategy', desc: `Priority-ranked plan tailored to your ${city.displayName} market.` },
                    { step: '03', title: 'On-page', desc: 'Technical fixes, schema, metadata, content optimization.' },
                    { step: '04', title: 'Local signals', desc: 'GBP optimization, citations, reviews, local content.' },
                    { step: '05', title: 'Report', desc: 'Monthly rankings and traffic reports with next-step recommendations.' },
                  ]
              ).map((item) => (
                <Paper
                  key={item.step}
                  p="lg"
                  radius="md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Text size="sm" fw={700} style={{ color: accent, marginBottom: 6 }}>
                    {item.step}
                  </Text>
                  <Title order={4} style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: 6 }}>
                    {item.title}
                  </Title>
                  <Text size="sm" style={{ color: '#A5B4CF' }}>
                    {item.desc}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Tech stack (web-design) OR Local SEO breakdown (seo-services) */}
        <Box component="section" py={80} style={{ background: '#081430' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 16 }}>
              {kind === 'web-design'
                ? 'The tech stack we build on'
                : 'What local SEO includes'}
            </Title>
            <Text ta="center" size="lg" style={{ color: '#A5B4CF', marginBottom: 48 }}>
              {kind === 'web-design'
                ? 'Enterprise-grade tools, tuned for small business budgets.'
                : `The same playbook we use for every ${city.displayName} client.`}
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {(kind === 'web-design'
                ? [
                    { icon: IconBrandNextjs, title: 'Next.js', desc: 'Server components, App Router, blazing speed.' },
                    { icon: IconBrandReact, title: 'React 19', desc: 'Modern component architecture.' },
                    { icon: IconBrandTypescript, title: 'TypeScript', desc: 'Type-safe code, fewer bugs.' },
                    { icon: IconBrandVercel, title: 'Vercel', desc: 'Global edge deployment.' },
                  ]
                : [
                    { icon: IconBrandGoogle, title: 'Google Business Profile', desc: 'Full optimization, posts, Q&A, photos.' },
                    { icon: IconStar, title: 'Review management', desc: 'Generation, monitoring, and responses.' },
                    { icon: IconBuildingStore, title: 'Local citations', desc: 'Consistent NAP across 50+ directories.' },
                    { icon: IconSearch, title: 'Technical SEO', desc: 'Schema, metadata, site speed, Core Web Vitals.' },
                  ]
              ).map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Paper
                    key={item.title}
                    p="lg"
                    radius="md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <ItemIcon size={28} color={accent} style={{ marginBottom: 12 }} />
                    <Title order={4} style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: 6 }}>
                      {item.title}
                    </Title>
                    <Text size="sm" style={{ color: '#A5B4CF' }}>
                      {item.desc}
                    </Text>
                  </Paper>
                );
              })}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Case study (optional) */}
        {content.caseStudy && (
          <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
            <Container size="md">
              <Paper
                p="xl"
                radius="lg"
                style={{
                  background: `linear-gradient(135deg, ${accent}15 0%, transparent 100%)`,
                  border: `1px solid ${accent}33`,
                }}
              >
                <Badge
                  variant="filled"
                  style={{ background: accent, marginBottom: 16 }}
                >
                  Case Study
                </Badge>
                <Title order={3} style={{ color: '#FFFFFF', marginBottom: 12 }}>
                  {content.caseStudy.title}
                </Title>
                <Text size="lg" style={{ color: '#D1DAEE', marginBottom: 20 }}>
                  {content.caseStudy.summary}
                </Text>
                {content.caseStudy.href && (
                  <Button
                    component={Link}
                    href={content.caseStudy.href}
                    variant="outline"
                    rightSection={<IconArrowRight size={16} />}
                    style={{ color: accent, borderColor: accent }}
                  >
                    See our work
                  </Button>
                )}
              </Paper>
            </Container>
          </Box>
        )}

        {/* Pricing callout */}
        <Box component="section" py={60} style={{ background: '#081430' }}>
          <Container size="md">
            <Paper
              p="xl"
              radius="lg"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <Group gap={16} align="flex-start">
                <IconCoin size={32} color={accent} style={{ flexShrink: 0 }} />
                <Box style={{ flex: 1 }}>
                  <Title order={3} style={{ color: '#FFFFFF', marginBottom: 8 }}>
                    Transparent, fixed pricing
                  </Title>
                  <Text style={{ color: '#A5B4CF', marginBottom: 16 }}>
                    {kind === 'web-design'
                      ? `Most ${city.displayName} small-business websites land in the mid four figures to low five figures. We quote fixed project pricing upfront \u2014 no hourly surprises, no scope creep invoices.`
                      : `Our ${city.displayName} local SEO retainers start in the low four figures per month, scaling with your industry\u2019s competitiveness. No long-term contracts.`}
                  </Text>
                  <Button
                    component={Link}
                    href="/pricing"
                    variant="outline"
                    size="sm"
                    rightSection={<IconArrowRight size={14} />}
                    style={{ color: accent, borderColor: accent }}
                  >
                    See pricing details
                  </Button>
                </Box>
              </Group>
            </Paper>
          </Container>
        </Box>

        {/* FAQ */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 48 }}>
              Frequently asked questions
            </Title>
            <Accordion
              variant="separated"
              radius="md"
              styles={{
                item: {
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                },
                control: { color: '#FFFFFF' },
                label: { color: '#FFFFFF' },
                panel: { color: '#A5B4CF' },
                chevron: { color: '#4DA3FF' },
              }}
            >
              {content.faq.map((item, idx) => (
                <Accordion.Item key={idx} value={`faq-${idx}`}>
                  <Accordion.Control>{item.question}</Accordion.Control>
                  <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Container>
        </Box>

        {/* Related / sibling */}
        <Box component="section" py={60} style={{ background: '#0A1A3F' }}>
          <Container size="md" ta="center">
            <Text size="sm" style={{ color: '#7A8AA8', marginBottom: 12 }}>
              Also serving {city.displayName}
            </Text>
            <Button
              component={Link}
              href={`/${siblingPath}`}
              variant="outline"
              rightSection={<IconArrowRight size={16} />}
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              {siblingLabel}
            </Button>
          </Container>
        </Box>

        {/* CTA */}
        <Box component="section" py={100} style={{ background: '#081430' }}>
          <Container size="md" ta="center">
            <Title order={2} style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Let&apos;s talk about your {city.displayName} project
            </Title>
            <Text size="lg" style={{ color: '#A5B4CF', marginBottom: 32 }}>
              Free in-person consultation. Fixed pricing. No obligation.
            </Text>
            <Button
              component={Link}
              href="/contact"
              size="xl"
              rightSection={<IconArrowRight size={20} />}
              style={{ background: accent }}
            >
              Start the Conversation
            </Button>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
