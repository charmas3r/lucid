'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Badge,
  Stack,
  SimpleGrid,
} from '@mantine/core';
import {
  IconArrowRight,
  IconCode,
  IconCurrencyDollar,
  IconCalendarCheck,
  IconMapPin,
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { trackEvent, EVENTS } from '@/lib/analytics';

// Dynamic import with SSR disabled
const RubiksCube3D = dynamic(
  () => import('./RubiksCube3D').then((mod) => mod.RubiksCube3D),
  { ssr: false }
);

// Hero Cube Visual - No state changes, completely static
function HeroCubeVisual() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        order: 1,
        width: '100%',
        maxWidth: 560,
        height: 400,
        overflow: 'visible',
        position: 'relative',
      }}
      className="hero-visual"
    >
      {/* 3D Cube - always rendered */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <RubiksCube3D />
      </div>
    </div>
  );
}

const trustBadges = [
  { icon: IconCode, label: '10+ Years Experience' },
  { icon: IconCurrencyDollar, label: 'Transparent Pricing' },
  { icon: IconCalendarCheck, label: 'Enterprise-Proven Expertise' },
  { icon: IconMapPin, label: 'Located in Escondido, CA' },
];

// Simplified animations for better LCP - no initial opacity:0
const fadeInUp = {
  initial: { opacity: 1, y: 0 }, // Start visible for LCP
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export function Hero() {
  return (
    <Box
      component="section"
      pt={160}
      pb={80}
      style={{ background: '#0A1A3F', position: 'relative' }}
    >
      {/* Static background gradient - no animation for LCP */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.15) 0%, rgba(77, 163, 255, 0.1) 100%)',
          borderRadius: '0 0 0 50%',
          pointerEvents: 'none',
        }}
      />
      
      <Container size="xl" style={{ position: 'relative' }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60} verticalSpacing={40}>
          {/* Left Content - order 2 on mobile so image comes first */}
          <div
            style={{ order: 2 }}
            className="hero-content"
          >
            <Stack gap="lg" justify="center">
              <div>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(77, 163, 255, 0.15)',
                    color: '#4DA3FF',
                    border: '1px solid rgba(77, 163, 255, 0.25)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Your reliable digital partner
                </Badge>
              </div>

              <div>
                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                  }}
                >
                  <Text
                    component="span"
                    inherit
                    className="metallic-text"
                  >
                    Web Development
                  </Text>{' '}
                  for San Diego businesses
                </Title>
              </div>

              <div>
                <Text
                  size="lg"
                  maw={480}
                  lh={1.7}
                  style={{ color: '#A5B4CF' }}
                >
                  From new digital projects to process optimization and support, 
                  we partner with businesses to deliver impactful results.
                </Text>
              </div>

              <div>
                <Group gap="md" mt="md">
                  <Button
                    component="a"
                    href="/contact"
                    size="lg"
                    radius="xl"
                    onClick={() => trackEvent(EVENTS.CTA_CLICK_BOOK_CALL, { location: 'hero' })}
                    styles={{
                      root: {
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          boxShadow: '0 6px 25px rgba(77, 163, 255, 0.4)',
                          transform: 'scale(1.03)',
                        },
                      },
                    }}
                  >
                    Book a call
                  </Button>
                  <Button
                    component="a"
                    href="/case-studies"
                    size="lg"
                    radius="xl"
                    variant="outline"
                    rightSection={<IconArrowRight size={18} />}
                    onClick={() => trackEvent(EVENTS.CTA_CLICK_VIEW_WORK, { location: 'hero' })}
                    styles={{
                      root: {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: '#FFFFFF',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#FFFFFF',
                          transform: 'scale(1.03)',
                        },
                      },
                    }}
                  >
                    View our work
                  </Button>
                </Group>
              </div>
            </Stack>
          </div>

          {/* Right - Hero Visual - Rubik's Cube */}
          <HeroCubeVisual />
        </SimpleGrid>

        {/* Trust Badges - static for LCP */}
        <Box
          mt={80}
          py="lg"
          px={{ base: 'md', sm: 'xl' }}
          style={{
            background: 'rgba(13, 31, 74, 0.6)',
            borderRadius: 16,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <SimpleGrid 
            cols={{ base: 2, sm: 2, md: 4 }} 
            spacing={{ base: 'md', sm: 'lg', md: 40 }}
            verticalSpacing={{ base: 'lg', md: 'md' }}
          >
            {trustBadges.map((badge) => (
              <Group key={badge.label} gap="sm" wrap="nowrap" className="trust-badge">
                <Box
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(77, 163, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <badge.icon size={18} color="#4DA3FF" stroke={1.8} />
                </Box>
                <Text
                  size="sm"
                  fw={600}
                  style={{
                    color: '#FFFFFF',
                  }}
                >
                  {badge.label}
                </Text>
              </Group>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
