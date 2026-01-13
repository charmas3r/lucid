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
  Table,
  Paper,
  Anchor,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  IconArrowRight,
  IconMapPin,
  IconBuilding,
  IconPhone,
  IconCheck,
  IconX,
  IconStar,
  IconBrandGoogle,
  IconClock,
  IconUsers,
  IconRocket,
  IconShieldCheck,
  IconHeartHandshake,
  IconCode,
  IconDeviceMobile,
  IconSearch,
  IconShoppingCart,
  IconChartBar,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';

// Dynamically import the map component to avoid SSR issues with Leaflet
const ServiceAreasMap = dynamic(() => import('./ServiceAreasMap'), {
  ssr: false,
  loading: () => (
    <Box
      style={{
        height: 500,
        background: '#0D1F4A',
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#A5B4CF' }}>Loading map...</Text>
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

// Service zones data
const serviceZones = {
  primary: {
    title: 'Primary Service Area',
    description: 'Our home base with same-day consultations available',
    color: '#4DA3FF',
    lightColor: 'rgba(77, 163, 255, 0.15)',
    borderColor: 'rgba(77, 163, 255, 0.3)',
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
    color: '#10B981',
    lightColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
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
    color: '#A855F7',
    lightColor: 'rgba(168, 85, 247, 0.15)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
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

// Stats for social proof
const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'San Diego Based' },
  { value: '5.0', label: 'Google Rating', icon: IconStar },
];

// Why choose Lucid - key differentiators
const whyChooseLucid = [
  {
    icon: IconUsers,
    title: 'Truly Local',
    description: 'Headquartered in Escondido. We understand San Diego businesses because we are one.',
  },
  {
    icon: IconCode,
    title: 'Enterprise Expertise',
    description: '10+ years building apps at major tech companies, now serving local businesses.',
  },
  {
    icon: IconRocket,
    title: 'Modern Technology',
    description: 'Next.js, React, and cutting-edge tools—not outdated WordPress templates.',
  },
  {
    icon: IconShieldCheck,
    title: 'Transparent Pricing',
    description: 'Clear quotes upfront. No hidden fees, no surprise invoices.',
  },
  {
    icon: IconHeartHandshake,
    title: 'Personal Service',
    description: 'Direct access to developers. No account managers or middlemen.',
  },
  {
    icon: IconClock,
    title: 'Fast Turnaround',
    description: 'Most projects launch in 4-8 weeks, not months.',
  },
];

// Comparison data - Lucid vs typical competitors
const comparisonData = [
  { feature: 'Local San Diego team', lucid: true, agencies: 'Sometimes', freelancers: 'Rarely' },
  { feature: 'Enterprise-grade code quality', lucid: true, agencies: true, freelancers: false },
  { feature: 'Direct developer access', lucid: true, agencies: false, freelancers: true },
  { feature: 'Modern tech stack (Next.js/React)', lucid: true, agencies: 'Sometimes', freelancers: 'Sometimes' },
  { feature: 'Fixed project pricing', lucid: true, agencies: 'Sometimes', freelancers: true },
  { feature: 'Ongoing support included', lucid: true, agencies: 'Extra cost', freelancers: 'Varies' },
  { feature: 'SEO optimization included', lucid: true, agencies: 'Extra cost', freelancers: false },
  { feature: '100 Lighthouse scores', lucid: true, agencies: 'Rarely', freelancers: 'Rarely' },
  { feature: 'Same-day local meetings', lucid: true, agencies: 'Sometimes', freelancers: false },
  { feature: 'Source code ownership', lucid: true, agencies: 'Sometimes', freelancers: true },
];

// City-specific content for SEO
const cityContent = [
  {
    city: 'San Marcos',
    description: 'San Marcos businesses trust Lucid Web Studios for websites that convert. From restaurants on Grand Avenue to tech startups near Cal State San Marcos, we build digital experiences that drive local growth.',
    industries: ['Restaurants & Hospitality', 'Education Services', 'Retail & E-commerce', 'Professional Services'],
  },
  {
    city: 'Carlsbad',
    description: 'Carlsbad\'s thriving business community deserves world-class web presence. We help Carlsbad companies—from Village boutiques to Palomar Airport Road tech firms—stand out online.',
    industries: ['Tourism & Hospitality', 'Tech Startups', 'Wellness & Fitness', 'Real Estate'],
  },
  {
    city: 'Escondido',
    description: 'As our home base, Escondido businesses get priority service. From Grand Avenue shops to breweries and wineries, we\'re your neighbors building your digital future.',
    industries: ['Food & Beverage', 'Healthcare', 'Home Services', 'Auto Services'],
  },
  {
    city: 'La Jolla',
    description: 'La Jolla businesses demand excellence—and we deliver. Premium websites for premium brands, from Prospect Street galleries to biotech innovators in the UTC area.',
    industries: ['Luxury Retail', 'Biotech & Healthcare', 'Professional Services', 'Hospitality'],
  },
  {
    city: 'Chula Vista',
    description: 'South Bay\'s fastest-growing city deserves fast-growing businesses. We help Chula Vista companies compete with responsive, SEO-optimized websites.',
    industries: ['Healthcare', 'Retail', 'Professional Services', 'Construction'],
  },
  {
    city: 'Oceanside',
    description: 'From the Oceanside pier to Camp Pendleton, we serve North County\'s coastal businesses with websites built for the modern web.',
    industries: ['Tourism', 'Surf & Outdoor', 'Military Services', 'Restaurants'],
  },
];

// Services offered
const services = [
  { icon: IconCode, name: 'Web Development', description: 'Custom Next.js & React websites' },
  { icon: IconDeviceMobile, name: 'Mobile Apps', description: 'iOS & Android applications' },
  { icon: IconSearch, name: 'SEO Services', description: 'Rank higher on Google' },
  { icon: IconShoppingCart, name: 'E-Commerce', description: 'Shopify & custom stores' },
  { icon: IconChartBar, name: 'Conversion Optimization', description: 'Turn visitors into customers' },
];

export default function ServiceAreasPage() {
  const heroRef = useRef(null);
  const whyRef = useRef(null);
  const comparisonRef = useRef(null);
  const citiesRef = useRef(null);
  const mapRef = useRef(null);
  const zonesRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whyInView = useInView(whyRef, { once: true, margin: '-100px' });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: '-100px' });
  const citiesInView = useInView(citiesRef, { once: true, margin: '-100px' });
  const mapInView = useInView(mapRef, { once: true, margin: '-100px' });
  const zonesInView = useInView(zonesRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const renderCheckOrX = (value: boolean | string) => {
    if (value === true) {
      return <IconCheck size={20} color="#10B981" stroke={2.5} />;
    }
    if (value === false) {
      return <IconX size={20} color="#EF4444" stroke={2.5} />;
    }
    return <Text size="sm" c="dimmed">{value}</Text>;
  };

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
            background: 'linear-gradient(180deg, #0A1A3F 0%, #081430 100%)',
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
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.08) 0%, transparent 70%)',
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
              background: 'radial-gradient(circle, rgba(31, 79, 216, 0.06) 0%, transparent 70%)',
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
                      background: 'rgba(77, 163, 255, 0.15)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    San Diego Web Developer
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
                      color: '#FFFFFF',
                    }}
                  >
                    Your Local{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #4DA3FF 0%, #10B981 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      San Diego
                    </Text>{' '}
                    Web Development Partner
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    lh={1.8}
                    style={{ color: '#A5B4CF' }}
                  >
                    Lucid Web Studios is headquartered in Escondido, serving businesses across 
                    San Diego County—from San Marcos to Chula Vista, La Jolla to El Cajon. 
                    We bring enterprise-quality web development to local businesses that deserve better.
                  </Text>
                </motion.div>

                {/* Google Business Profile Link */}
                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Anchor
                    href="https://share.google/9QzfdpHBMY0OMRO2h"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Paper
                      p="md"
                      radius="xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Group gap="sm">
                        <IconBrandGoogle size={20} color="#4DA3FF" />
                        <Group gap={4}>
                          {[...Array(5)].map((_, i) => (
                            <IconStar key={i} size={16} color="#FBBF24" fill="#FBBF24" />
                          ))}
                        </Group>
                        <Text size="sm" c="white" fw={500}>5.0 on Google</Text>
                        <Text size="sm" c="dimmed">• View Reviews</Text>
                      </Group>
                    </Paper>
                  </Anchor>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap="md">
                    <Button
                      component={Link}
                      href="/contact"
                      size="lg"
                      radius="xl"
                      rightSection={<IconArrowRight size={18} />}
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(77, 163, 255, 0.3)',
                          },
                        },
                      }}
                    >
                      Free Consultation
                    </Button>
                    <Button
                      component={Link}
                      href="/services"
                      size="lg"
                      radius="xl"
                      variant="outline"
                      styles={{
                        root: {
                          borderColor: 'rgba(77, 163, 255, 0.5)',
                          color: '#4DA3FF',
                          '&:hover': {
                            background: 'rgba(77, 163, 255, 0.1)',
                            borderColor: '#4DA3FF',
                          },
                        },
                      }}
                    >
                      View Services
                    </Button>
                  </Group>
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
                          <Group gap={4}>
                            {stat.icon && <stat.icon size={24} color="#FBBF24" fill="#FBBF24" />}
                            <Text
                              fw={700}
                              style={{
                                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                                color: '#4DA3FF',
                              }}
                            >
                              {stat.value}
                            </Text>
                          </Group>
                          <Text size="sm" ta="center" style={{ color: '#A5B4CF' }}>
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

        {/* Why Choose Lucid Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={whyRef}
        >
          <Container size="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={whyInView ? 'animate' : 'initial'}
            >
              <Stack align="center" gap="lg" mb={60}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Badge
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    fw={600}
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    Why San Diego Businesses Choose Us
                  </Badge>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    The Lucid Difference
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: '#A5B4CF' }}>
                    We&apos;re not a faceless agency or an overseas freelancer. We&apos;re your San Diego 
                    neighbors with enterprise-level skills, dedicated to helping local businesses thrive online.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {whyChooseLucid.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#081430',
                      borderRadius: 20,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Stack gap="md">
                      <ThemeIcon
                        size={56}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)',
                          boxShadow: '0 4px 15px rgba(77, 163, 255, 0.25)',
                        }}
                      >
                        <item.icon size={26} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                      <Title order={4} style={{ color: '#FFFFFF' }}>
                        {item.title}
                      </Title>
                      <Text size="sm" lh={1.7} style={{ color: '#A5B4CF' }}>
                        {item.description}
                      </Text>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Comparison Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#081430' }}
          ref={comparisonRef}
        >
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={60}>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(168, 85, 247, 0.15)',
                    color: '#A855F7',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  How We Compare
                </Badge>
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Lucid vs. The Competition
                </Title>
                <Text size="lg" ta="center" maw={650} style={{ color: '#A5B4CF' }}>
                  See how we stack up against typical big agencies and freelance developers. 
                  We combine the best of both worlds.
                </Text>
              </Stack>

              <Paper
                radius="xl"
                style={{
                  background: '#0A1A3F',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <Box style={{ overflowX: 'auto' }}>
                  <Table
                    horizontalSpacing="lg"
                    verticalSpacing="md"
                    styles={{
                      table: { minWidth: 600 },
                      thead: { background: 'rgba(77, 163, 255, 0.1)' },
                      th: { color: '#FFFFFF', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)' },
                      td: { borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#A5B4CF' },
                    }}
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Feature</Table.Th>
                        <Table.Th ta="center">
                          <Text fw={700} c="#4DA3FF">Lucid Web Studios</Text>
                        </Table.Th>
                        <Table.Th ta="center">Big Agencies</Table.Th>
                        <Table.Th ta="center">Freelancers</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {comparisonData.map((row) => (
                        <Table.Tr key={row.feature}>
                          <Table.Td>{row.feature}</Table.Td>
                          <Table.Td ta="center">{renderCheckOrX(row.lucid)}</Table.Td>
                          <Table.Td ta="center">{renderCheckOrX(row.agencies)}</Table.Td>
                          <Table.Td ta="center">{renderCheckOrX(row.freelancers)}</Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Box>
              </Paper>
            </motion.div>
          </Container>
        </Box>

        {/* City-Specific Content Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={citiesRef}
        >
          <Container size="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={citiesInView ? 'animate' : 'initial'}
            >
              <Stack align="center" gap="lg" mb={60}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
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
                    Local Expertise
                  </Badge>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    Web Development for Your City
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: '#A5B4CF' }}>
                    We know San Diego County inside and out. Our local expertise means we understand 
                    your market, your customers, and what it takes to succeed in your community.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
              {cityContent.map((city, index) => (
                <motion.div
                  key={city.city}
                  initial={{ opacity: 0, y: 30 }}
                  animate={citiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Paper
                    p="xl"
                    radius="lg"
                    style={{
                      background: '#081430',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      height: '100%',
                    }}
                  >
                    <Stack gap="md">
                      <Group gap="sm">
                        <ThemeIcon
                          size={40}
                          radius="xl"
                          style={{ background: 'rgba(77, 163, 255, 0.15)' }}
                        >
                          <IconMapPin size={20} color="#4DA3FF" />
                        </ThemeIcon>
                        <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>
                          {city.city} Web Developer
                        </Title>
                      </Group>
                      <Text size="sm" lh={1.7} style={{ color: '#A5B4CF' }}>
                        {city.description}
                      </Text>
                      <Box>
                        <Text size="xs" fw={600} c="#4DA3FF" mb="xs">
                          Industries We Serve:
                        </Text>
                        <Group gap="xs">
                          {city.industries.map((industry) => (
                            <Badge
                              key={industry}
                              size="sm"
                              variant="light"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#A5B4CF',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                              }}
                            >
                              {industry}
                            </Badge>
                          ))}
                        </Group>
                      </Box>
                    </Stack>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Services Overview */}
        <Box
          component="section"
          py={80}
          style={{ background: '#081430' }}
        >
          <Container size="lg">
            <Stack align="center" gap="lg" mb={40}>
              <Title
                order={2}
                ta="center"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Services Available to San Diego Businesses
              </Title>
            </Stack>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="lg">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href="/services" style={{ textDecoration: 'none' }}>
                    <Paper
                      p="lg"
                      radius="lg"
                      ta="center"
                      style={{
                        background: '#0A1A3F',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Stack gap="sm" align="center">
                        <ThemeIcon
                          size={48}
                          radius="xl"
                          style={{ background: 'rgba(77, 163, 255, 0.15)' }}
                        >
                          <service.icon size={24} color="#4DA3FF" />
                        </ThemeIcon>
                        <Text fw={600} size="sm" c="white">{service.name}</Text>
                        <Text size="xs" c="dimmed">{service.description}</Text>
                      </Stack>
                    </Paper>
                  </Link>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Interactive Map Section */}
        <Box
          component="section"
          py={80}
          style={{ background: '#0A1A3F' }}
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
                    background: 'rgba(77, 163, 255, 0.15)',
                    color: '#4DA3FF',
                    border: '1px solid rgba(77, 163, 255, 0.25)',
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
                    color: '#FFFFFF',
                  }}
                >
                  Our Service Coverage
                </Title>
                <Text size="lg" ta="center" maw={650} style={{ color: '#A5B4CF' }}>
                  We serve all of San Diego County with tiered service levels based on proximity.
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
                  <Text size="sm" style={{ color: '#A5B4CF' }}>Primary Zone</Text>
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
                  <Text size="sm" style={{ color: '#A5B4CF' }}>Extended Zone</Text>
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
                  <Text size="sm" style={{ color: '#A5B4CF' }}>Remote Zone</Text>
                </Group>
              </Group>

              {/* Map Container */}
              <Box
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
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
          style={{ background: '#081430' }}
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
                      background: 'rgba(77, 163, 255, 0.15)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
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
                      color: '#FFFFFF',
                    }}
                  >
                    Cities We Serve
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={650} style={{ color: '#A5B4CF' }}>
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
                      background: '#0A1A3F',
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
                          <ThemeIcon
                            size={60}
                            radius="xl"
                            style={{
                              background: zone.lightColor,
                              boxShadow: `0 8px 25px ${zone.lightColor}`,
                            }}
                          >
                            <IconMapPin size={28} color={zone.color} stroke={1.5} />
                          </ThemeIcon>
                          <Box>
                            <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.5rem' }}>
                              {zone.title}
                            </Title>
                            <Text size="sm" style={{ color: '#A5B4CF' }}>
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
                              <Text size="sm" style={{ color: '#A5B4CF' }}>
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
                          style={{ color: '#FFFFFF' }}
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
                            >
                              <Group gap="xs">
                                <Box
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: zone.color,
                                    opacity: 0.8,
                                  }}
                                />
                                <Text size="sm" style={{ color: '#A5B4CF' }}>
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
                  background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
                  borderRadius: 20,
                  border: '1px solid rgba(77, 163, 255, 0.15)',
                  textAlign: 'center',
                }}
              >
                <Group justify="center" gap="lg" wrap="wrap">
                  <ThemeIcon
                    size={50}
                    radius="xl"
                    style={{
                      background: 'linear-gradient(135deg, #4DA3FF 0%, #10B981 100%)',
                    }}
                  >
                    <IconBuilding size={24} color="#FFFFFF" stroke={1.5} />
                  </ThemeIcon>
                  <Box maw={600} ta={{ base: 'center', md: 'left' }}>
                    <Title order={4} mb={4} style={{ color: '#FFFFFF' }}>
                      Not in San Diego? No Problem!
                    </Title>
                    <Text size="sm" style={{ color: '#A5B4CF' }}>
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
            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
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
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Ready to Get Started?
                </Badge>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Let&apos;s Build Something Great for Your San Diego Business
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.9)' }} lh={1.8}>
                  Whether you&apos;re in San Marcos, Carlsbad, La Jolla, or anywhere in San Diego County, 
                  we&apos;re ready to help you build a digital presence that drives real results.
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
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: '#F8F9FB',
                          },
                        },
                      }}
                    >
                      Schedule Free Consultation
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
                          borderColor: 'rgba(255, 255, 255, 0.4)',
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

                {/* Google Business Profile */}
                <Anchor
                  href="https://share.google/9QzfdpHBMY0OMRO2h"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Group gap="xs" mt="md">
                    <IconBrandGoogle size={18} color="rgba(255,255,255,0.8)" />
                    <Text size="sm" c="rgba(255,255,255,0.8)">
                      View us on Google Business Profile
                    </Text>
                  </Group>
                </Anchor>
              </Stack>
            </motion.div>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
