'use client';

import {
  Container,
  Title,
  Text,
  Box,
  Badge,
  Stack,
  SimpleGrid,
  Group,
  List,
  ThemeIcon,
  Divider,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { IconCheck, IconBolt, IconRocket } from '@tabler/icons-react';
import {
  seoOneTimeFix,
  seoRetainerTiers,
  seoBundleOffer,
} from '@/lib/seo-pricing';

/**
 * Canonical SEO packages section: the one-time foundation fix, the three
 * monthly retainer tiers, and the bundle incentive. Rendered on both SEO pages
 * so the offering is presented identically everywhere. All copy/pricing comes
 * from `@/lib/seo-pricing`.
 */
export function SeoPackages({ background = '#0A1A3F' }: { background?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Box component="section" id="seo-packages" py={100} style={{ background }} ref={ref}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Stack align="center" gap="lg" mb={60}>
            <Badge
              size="lg"
              radius="xl"
              tt="uppercase"
              fw={600}
              style={{
                background: 'rgba(12, 206, 107, 0.15)',
                color: '#0CCE6B',
                border: '1px solid rgba(12, 206, 107, 0.3)',
                letterSpacing: '1px',
                fontSize: '0.7rem',
                padding: '10px 16px',
              }}
            >
              Packages & Pricing
            </Badge>
            <Title
              order={2}
              ta="center"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#FFFFFF' }}
            >
              Start With the Fix. Grow on a Plan.
            </Title>
            <Text size="lg" ta="center" maw={720} lh={1.8} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Every engagement begins with a one-time foundation fix, then continues with a monthly
              plan sized to how fast you want to grow.
            </Text>
          </Stack>
        </motion.div>

        {/* Phase 1 — One-time foundation fix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Box
            p="xl"
            mb={50}
            style={{
              background: 'linear-gradient(135deg, #0A1A3F 0%, #1A2F5F 100%)',
              borderRadius: 24,
              border: '2px solid rgba(12, 206, 107, 0.3)',
              boxShadow: '0 25px 50px rgba(10, 26, 63, 0.4)',
            }}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40} style={{ alignItems: 'center' }}>
              <Stack gap="lg">
                <Group gap="md">
                  <ThemeIcon
                    size={56}
                    radius="xl"
                    style={{ background: 'linear-gradient(135deg, #0CCE6B 0%, #1F4FD8 100%)' }}
                  >
                    <IconBolt size={28} color="#FFFFFF" stroke={1.5} />
                  </ThemeIcon>
                  <Box>
                    <Text size="sm" fw={500} tt="uppercase" style={{ color: '#0CCE6B', letterSpacing: '1px' }}>
                      Phase 1 — Start here
                    </Text>
                    <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.5rem' }}>
                      {seoOneTimeFix.name}
                    </Title>
                  </Box>
                </Group>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  {seoOneTimeFix.description}
                </Text>
                <List
                  spacing="sm"
                  size="sm"
                  icon={
                    <ThemeIcon size={20} radius="xl" style={{ background: 'rgba(12, 206, 107, 0.2)' }}>
                      <IconCheck size={12} color="#0CCE6B" stroke={3} />
                    </ThemeIcon>
                  }
                >
                  {seoOneTimeFix.features.map((feature) => (
                    <List.Item key={feature} style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {feature}
                    </List.Item>
                  ))}
                </List>
              </Stack>
              <Stack align="center" gap="xs">
                <Text size="sm" fw={500} tt="uppercase" style={{ color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '1px' }}>
                  {seoOneTimeFix.cadence}
                </Text>
                <Text fw={700} style={{ fontSize: '4rem', color: '#FFFFFF', lineHeight: 1.1 }}>
                  {seoOneTimeFix.price}
                </Text>
                <Text size="sm" ta="center" maw={260} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  The foundation that sets up every monthly plan below.
                </Text>
              </Stack>
            </SimpleGrid>
          </Box>
        </motion.div>

        {/* Phase 2 — Monthly retainer tiers */}
        <Group gap="sm" justify="center" mb={30}>
          <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
          <Text fw={600} size="sm" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '2px' }}>
            Phase 2 — Monthly Plans
          </Text>
          <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
        </Group>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={24}>
          {seoRetainerTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
              style={{ height: '100%' }}
            >
              <Box
                p="xl"
                style={{
                  background: tier.highlighted
                    ? 'linear-gradient(135deg, rgba(31, 79, 216, 0.18) 0%, rgba(77, 163, 255, 0.08) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 20,
                  border: tier.highlighted
                    ? '1px solid rgba(77, 163, 255, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  height: '100%',
                  position: 'relative',
                }}
              >
                {tier.highlighted && (
                  <Box
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      padding: '4px 8px',
                      borderRadius: 6,
                    }}
                  >
                    Most popular
                  </Box>
                )}
                <Stack gap="md" h="100%">
                  <Box>
                    <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.5rem' }}>
                      {tier.name}
                    </Title>
                    <Text size="sm" mt={4} style={{ color: '#4DA3FF' }}>
                      {tier.tagline}
                    </Text>
                  </Box>
                  <Group gap={4} align="baseline">
                    <Text fw={700} style={{ fontSize: '2.5rem', color: '#0CCE6B', lineHeight: 1 }}>
                      {tier.price}
                    </Text>
                    <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {tier.cadence}
                    </Text>
                  </Group>
                  <Text size="sm" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {tier.description}
                  </Text>
                  <List
                    spacing="sm"
                    size="sm"
                    icon={
                      <ThemeIcon size={18} radius="xl" style={{ background: 'rgba(12, 206, 107, 0.15)' }}>
                        <IconCheck size={10} color="#0CCE6B" stroke={3} />
                      </ThemeIcon>
                    }
                    style={{ flexGrow: 1 }}
                  >
                    {tier.features.map((feature) => (
                      <List.Item key={feature} style={{ color: 'rgba(255, 255, 255, 0.82)' }}>
                        {feature}
                      </List.Item>
                    ))}
                  </List>
                </Stack>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>

        {/* Bundle incentive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box
            mt={40}
            p="lg"
            style={{
              background: 'rgba(12, 206, 107, 0.05)',
              borderRadius: 16,
              border: '1px solid rgba(12, 206, 107, 0.2)',
            }}
          >
            <Group gap="md" justify="center" wrap="nowrap">
              <ThemeIcon
                size={48}
                radius="xl"
                style={{ background: 'linear-gradient(135deg, #0CCE6B 0%, #1F4FD8 100%)', flexShrink: 0 }}
              >
                <IconRocket size={24} color="#FFFFFF" stroke={1.5} />
              </ThemeIcon>
              <Box>
                <Text fw={600} style={{ color: '#0CCE6B' }}>
                  {seoBundleOffer.headline}
                </Text>
                <Text size="sm" mt={2} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {seoBundleOffer.description}
                </Text>
              </Box>
            </Group>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
