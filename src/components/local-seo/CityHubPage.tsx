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
} from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowRight,
  IconCode,
  IconSearch,
  IconMapPin,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';
import type { CityContent } from '@/lib/local-seo';
import { LocalBusinessSchema } from './LocalBusinessSchema';
import { BreadcrumbSchema } from './BreadcrumbSchema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lucidweb.studio';

type CityHubPageProps = {
  city: CityContent;
};

export function CityHubPage({ city }: CityHubPageProps) {
  const pageUrl = `${BASE_URL}/${city.slug}`;
  const webDesignUrl = `/${city.slug}-web-design`;
  const seoUrl = `/${city.slug}-seo-services`;
  const hub = city.hub;

  return (
    <>
      <LocalBusinessSchema areaServed={city.displayName} pageUrl={pageUrl} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Service Areas', url: `${BASE_URL}/service-areas` },
          { name: city.displayName, url: pageUrl },
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
                  color: '#4DA3FF',
                  borderColor: 'rgba(77, 163, 255, 0.4)',
                  marginBottom: 24,
                }}
              >
                {city.county}
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
                {hub.heroHeadline}
              </Title>
              <Text size="xl" style={{ color: '#A5B4CF', maxWidth: 720 }}>
                {hub.heroSubheadline}
              </Text>
              <Group mt={40}>
                <Button
                  component={Link}
                  href="/contact"
                  size="lg"
                  rightSection={<IconArrowRight size={18} />}
                  style={{ background: '#4DA3FF' }}
                >
                  Start a Project
                </Button>
                <Button
                  component={Link}
                  href="/service-areas"
                  size="lg"
                  variant="outline"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  All Service Areas
                </Button>
              </Group>
            </motion.div>
          </Container>
        </Box>

        {/* Local intro */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Stack gap="lg">
              {hub.localIntro.map((paragraph, idx) => (
                <Text key={idx} size="lg" style={{ color: '#D1DAEE', lineHeight: 1.7 }}>
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* Service cards */}
        <Box component="section" py={80} style={{ background: '#081430' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 48 }}>
              {city.displayName} Services
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              <Paper
                component={Link}
                href={webDesignUrl}
                p="xl"
                radius="lg"
                style={{
                  background: 'rgba(77, 163, 255, 0.08)',
                  border: '1px solid rgba(77, 163, 255, 0.2)',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <IconCode size={40} color="#4DA3FF" style={{ marginBottom: 16 }} />
                <Title order={3} style={{ color: '#FFFFFF', marginBottom: 12 }}>
                  {city.displayName} Web Design
                </Title>
                <Text style={{ color: '#A5B4CF', marginBottom: 16 }}>
                  Custom websites built on Next.js for {city.displayName} businesses. Fast,
                  modern, and owned by you.
                </Text>
                <Group gap={6} style={{ color: '#4DA3FF' }}>
                  <Text size="sm" fw={600}>
                    Learn more
                  </Text>
                  <IconArrowRight size={16} />
                </Group>
              </Paper>

              <Paper
                component={Link}
                href={seoUrl}
                p="xl"
                radius="lg"
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <IconSearch size={40} color="#10B981" style={{ marginBottom: 16 }} />
                <Title order={3} style={{ color: '#FFFFFF', marginBottom: 12 }}>
                  {city.displayName} SEO Services
                </Title>
                <Text style={{ color: '#A5B4CF', marginBottom: 16 }}>
                  Local SEO, Google Business Profile management, and technical optimization
                  for {city.displayName} businesses.
                </Text>
                <Group gap={6} style={{ color: '#10B981' }}>
                  <Text size="sm" fw={600}>
                    Learn more
                  </Text>
                  <IconArrowRight size={16} />
                </Group>
              </Paper>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Local angle */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Title order={2} style={{ color: '#FFFFFF', marginBottom: 24 }}>
              {hub.localAngle.heading}
            </Title>
            <Text size="lg" style={{ color: '#D1DAEE', lineHeight: 1.7 }}>
              {hub.localAngle.body}
            </Text>
          </Container>
        </Box>

        {/* CTA */}
        <Box component="section" py={100} style={{ background: '#081430' }}>
          <Container size="md" ta="center">
            <Title order={2} style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Ready to start your {city.displayName} project?
            </Title>
            <Text size="lg" style={{ color: '#A5B4CF', marginBottom: 32 }}>
              Free in-person discovery meeting. No obligation.
            </Text>
            <Button
              component={Link}
              href="/contact"
              size="xl"
              rightSection={<IconArrowRight size={20} />}
              style={{ background: '#4DA3FF' }}
            >
              Get in Touch
            </Button>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
