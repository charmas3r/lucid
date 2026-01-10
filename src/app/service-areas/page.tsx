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
  ThemeIcon,
  Group,
  List,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  IconArrowRight,
  IconMapPin,
  IconCircle,
  IconCircleFilled,
  IconBuilding,
  IconPhone,
  IconStar,
  IconCheck,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';

// Dynamically import the map component to avoid SSR issues with Leaflet
const ServiceAreasMap = dynamic(() => import('./ServiceAreasMap'), {
  ssr: false,
  loading: () => (
    <Box
      style={{
        height: 500,
        background: '#F8F9FB',
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#5A7099' }}>Loading map...</Text>
    </Box>
  ),
});

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

const serviceZones = {
  primary: {
    title: 'Primary Service Area',
    description: 'Our home base with same-day consultations available',
    color: '#1F4FD8',
    lightColor: 'rgba(31, 79, 216, 0.12)',
    borderColor: 'rgba(31, 79, 216, 0.25)',
    cities: [
      'San Diego (Downtown)',
      'La Jolla',
      'Del Mar',
      'Pacific Beach',
      'Ocean Beach',
      'Mission Beach',
      'Point Loma',
      'Coronado',
      'Mission Valley',
      'Hillcrest',
      'North Park',
      'University City',
    ],
    benefits: [
      'Same-day in-person consultations',
      'Priority support response',
      'Free on-site discovery meetings',
      'Local networking events access',
    ],
  },
  secondary: {
    title: 'Extended Service Area',
    description: 'Full services with scheduled visits',
    color: '#4DA3FF',
    lightColor: 'rgba(77, 163, 255, 0.12)',
    borderColor: 'rgba(77, 163, 255, 0.25)',
    cities: [
      'Carlsbad',
      'Encinitas',
      'Solana Beach',
      'Escondido',
      'Poway',
      'Santee',
      'La Mesa',
      'El Cajon',
      'Chula Vista',
      'National City',
      'Imperial Beach',
      'Rancho Bernardo',
    ],
    benefits: [
      'Scheduled in-person meetings',
      'Full service availability',
      'Next-day support response',
      'Hybrid remote/on-site work',
    ],
  },
  tertiary: {
    title: 'Remote Service Area',
    description: 'Full digital services with virtual meetings',
    color: '#3A6EA5',
    lightColor: 'rgba(58, 110, 165, 0.12)',
    borderColor: 'rgba(58, 110, 165, 0.25)',
    cities: [
      'Oceanside',
      'Vista',
      'San Marcos',
      'Fallbrook',
      'Temecula',
      'Murrieta',
      'Ramona',
      'Julian',
      'Alpine',
      'Jamul',
    ],
    benefits: [
      'Full remote services',
      'Video call consultations',
      'Monthly on-site visits available',
      'Same great quality of work',
    ],
  },
};

const stats = [
  { value: '150+', label: 'Local Projects Completed' },
  { value: '50+', label: 'San Diego Businesses Served' },
  { value: '9', label: 'Years Serving SD' },
  { value: '100%', label: 'Local Ownership' },
];

export default function ServiceAreasPage() {
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const zonesRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const mapInView = useInView(mapRef, { once: true, margin: '-100px' });
  const zonesInView = useInView(zonesRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

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
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: 450,
              height: 450,
              background: 'radial-gradient(circle, rgba(31, 79, 216, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '10%',
              width: 350,
              height: 350,
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.05) 0%, transparent 70%)',
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
              <Stack align="center" gap="xl" maw={900} mx="auto">
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
                    Service Areas
                  </Badge>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Title
                    order={1}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: '#0A1A3F',
                    }}
                  >
                    Proudly Serving{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      San Diego
                    </Text>{' '}
                    & Beyond
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    lh={1.8}
                    style={{ color: '#5A7099' }}
                  >
                    Lucid Web Studios is headquartered in Escondido, California. We specialize in 
                    helping local businesses throughout the greater San Diego area establish 
                    powerful digital presences that drive real growth.
                  </Text>
                </motion.div>

                {/* Stats */}
                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl" mt="xl">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Stack align="center" gap={4}>
                          <Text
                            fw={700}
                            style={{
                              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                              color: '#1F4FD8',
                            }}
                          >
                            {stat.value}
                          </Text>
                          <Text size="sm" ta="center" style={{ color: '#5A7099' }}>
                            {stat.label}
                          </Text>
                        </Stack>
                      </motion.div>
                    ))}
                  </SimpleGrid>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Interactive Map Section */}
        <Box
          component="section"
          py={80}
          style={{ background: '#FFFFFF' }}
          ref={mapRef}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={40}>
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
                  Coverage Map
                </Badge>
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: '#0A1A3F',
                  }}
                >
                  Our Service Coverage
                </Title>
                <Text size="lg" ta="center" maw={650} style={{ color: '#5A7099' }}>
                  Explore our service zones below. While we specialize in San Diego County, 
                  we offer remote services to clients anywhere.
                </Text>
              </Stack>

              {/* Map Legend */}
              <Group justify="center" gap="xl" mb="xl">
                <Group gap="xs">
                  <Box
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: serviceZones.primary.color,
                    }}
                  />
                  <Text size="sm" style={{ color: '#5A7099' }}>Primary Zone</Text>
                </Group>
                <Group gap="xs">
                  <Box
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: serviceZones.secondary.color,
                    }}
                  />
                  <Text size="sm" style={{ color: '#5A7099' }}>Extended Zone</Text>
                </Group>
                <Group gap="xs">
                  <Box
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: serviceZones.tertiary.color,
                    }}
                  />
                  <Text size="sm" style={{ color: '#5A7099' }}>Remote Zone</Text>
                </Group>
              </Group>

              {/* Map Container */}
              <Box
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid rgba(10, 26, 63, 0.08)',
                  boxShadow: '0 10px 40px rgba(10, 26, 63, 0.08)',
                }}
              >
                <ServiceAreasMap />
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Service Zones Detail Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={zonesRef}
        >
          <Container size="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={zonesInView ? 'animate' : 'initial'}
            >
              <Stack align="center" gap="lg" mb={60}>
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
                    Service Zones
                  </Badge>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                    }}
                  >
                    Cities We Serve
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={650} style={{ color: '#5A7099' }}>
                    From the beaches of Coronado to the hills of Escondido, we&apos;re proud to 
                    serve businesses across San Diego County.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <Stack gap={40}>
              {Object.entries(serviceZones).map(([key, zone], zoneIndex) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={zonesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: zoneIndex * 0.2 }}
                >
                  <Box
                    p={{ base: 'xl', md: 40 }}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 24,
                      border: `1px solid ${zone.borderColor}`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Zone indicator stripe */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: zone.color,
                      }}
                    />

                    <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={40}>
                      {/* Zone Header */}
                      <Box>
                        <Group gap="md" mb="lg">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <ThemeIcon
                              size={60}
                              radius="xl"
                              style={{
                                background: zone.color,
                                boxShadow: `0 8px 25px ${zone.lightColor}`,
                              }}
                            >
                              <IconMapPin size={28} color="#FFFFFF" stroke={1.5} />
                            </ThemeIcon>
                          </motion.div>
                          <Box>
                            <Title order={3} style={{ color: '#0A1A3F', fontSize: '1.5rem' }}>
                              {zone.title}
                            </Title>
                            <Text size="sm" style={{ color: '#5A7099' }}>
                              {zone.description}
                            </Text>
                          </Box>
                        </Group>

                        <Stack gap="xs">
                          {zone.benefits.map((benefit) => (
                            <Group key={benefit} gap="sm">
                              <ThemeIcon
                                size={24}
                                radius="xl"
                                style={{
                                  background: zone.lightColor,
                                }}
                              >
                                <IconCheck size={14} color={zone.color} stroke={2.5} />
                              </ThemeIcon>
                              <Text size="sm" style={{ color: '#5A7099' }}>
                                {benefit}
                              </Text>
                            </Group>
                          ))}
                        </Stack>
                      </Box>

                      {/* Cities Grid */}
                      <Box style={{ gridColumn: 'span 2' }}>
                        <Text
                          fw={600}
                          mb="md"
                          style={{ color: '#0A1A3F' }}
                        >
                          Cities & Neighborhoods
                        </Text>
                        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
                          {zone.cities.map((city, cityIndex) => (
                            <motion.div
                              key={city}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={zonesInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{
                                duration: 0.3,
                                delay: zoneIndex * 0.2 + cityIndex * 0.03,
                              }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <Group gap="xs">
                                <Box
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: zone.color,
                                    opacity: 0.6,
                                  }}
                                />
                                <Text size="sm" style={{ color: '#5A7099' }}>
                                  {city}
                                </Text>
                              </Group>
                            </motion.div>
                          ))}
                        </SimpleGrid>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </motion.div>
              ))}
            </Stack>

            {/* Remote Services Note */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={zonesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Box
                mt={60}
                p="xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.05) 0%, rgba(77, 163, 255, 0.05) 100%)',
                  borderRadius: 20,
                  border: '1px solid rgba(31, 79, 216, 0.1)',
                  textAlign: 'center',
                }}
              >
                <Group justify="center" gap="lg" wrap="wrap">
                  <ThemeIcon
                    size={50}
                    radius="xl"
                    style={{
                      background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                    }}
                  >
                    <IconBuilding size={24} color="#FFFFFF" stroke={1.5} />
                  </ThemeIcon>
                  <Box maw={600} ta={{ base: 'center', md: 'left' }}>
                    <Title order={4} mb={4} style={{ color: '#0A1A3F' }}>
                      Not in San Diego? No Problem!
                    </Title>
                    <Text size="sm" style={{ color: '#5A7099' }}>
                      While we&apos;re proudly San Diego-based, we serve clients across 
                      California and nationwide through our comprehensive remote services. 
                      All the expertise, none of the geographic limitations.
                    </Text>
                  </Box>
                </Group>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          component="section"
          py={100}
          style={{
            background: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={ctaRef}
        >
          {/* Decorative elements */}
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
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-5%',
              width: 300,
              height: 300,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <Container size="md" style={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="xl" ta="center">
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Get Started Today
                </Badge>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Ready to Grow Your San Diego Business?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  Whether you&apos;re in downtown San Diego or up in Temecula, we&apos;re ready 
                  to help you build a digital presence that drives real results.
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
                          background: '#FFFFFF',
                          color: '#1F4FD8',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: '#F8F9FB',
                          },
                        },
                      }}
                    >
                      Contact Us
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component="a"
                      href="tel:+16195551234"
                      size="lg"
                      radius="xl"
                      variant="outline"
                      leftSection={<IconPhone size={18} />}
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
                      Call Us
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
