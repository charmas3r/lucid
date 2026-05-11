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
  Divider,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  IconServer,
  IconMail,
  IconChartDots3,
  IconSettings,
  IconLayoutGrid,
  IconBrush,
  IconRefresh,
  IconServerCog,
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

const services = [
  {
    name: 'Web Development',
    icon: IconCode,
    signal: 'Projects from low four figures',
    description: 'From marketing sites to full-stack web applications — designed to convert and built to scale.',
    highlights: [
      'Responsive, mobile-first design',
      'Custom animations & interactions',
      'CMS integration',
      'SEO-ready architecture',
      'Performance optimized',
    ],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    name: 'Mobile Apps',
    icon: IconDeviceMobile,
    signal: 'Scoped to your requirements',
    description: 'Native and cross-platform apps for iOS and Android, from MVP to enterprise scale.',
    highlights: [
      'iOS & Android development',
      'React Native or Flutter',
      'Backend API development',
      'App store submission',
      'Post-launch support',
    ],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
  },
  {
    name: 'E-Commerce',
    icon: IconShoppingCart,
    signal: 'Tailored to your catalog size',
    description: 'Online stores built to sell — from Shopify customizations to fully headless solutions.',
    highlights: [
      'Shopify & headless commerce',
      'Payment & shipping setup',
      'Product management',
      'Conversion-optimized checkout',
      'Multi-currency support',
    ],
    gradient: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
  },
  {
    name: 'SEO',
    icon: IconSearch,
    signal: 'Monthly plans available',
    description: 'Get found by the right people. Technical SEO, content strategy, and ongoing optimization.',
    highlights: [
      'Technical SEO audits',
      'Keyword research & tracking',
      'Content optimization',
      'Link building outreach',
      'Monthly reporting',
    ],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    name: 'Conversion Optimization',
    icon: IconChartBar,
    signal: 'ROI-focused engagements',
    description: 'Turn more visitors into customers with data-driven UX improvements and A/B testing.',
    highlights: [
      'Conversion audits',
      'A/B testing programs',
      'Landing page optimization',
      'User journey analysis',
      'Performance guarantees',
    ],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
  },
];

const managedAddOns = [
  {
    name: 'Email Management',
    price: '$10',
    period: '/mo',
    icon: IconMail,
    description: 'Full email marketing setup and management',
    features: [
      'Complete email platform setup',
      'Audience management & segmentation',
      'At least 1 new email template per month',
      'Campaign performance tracking',
    ],
  },
  {
    name: 'Analytics',
    price: '$10',
    period: '/mo',
    icon: IconChartDots3,
    description: 'Comprehensive analytics and insights',
    features: [
      'User journey tracking & analysis',
      'Conversion metrics & reporting',
      'Full management & configuration',
      'Monthly insights & recommendations',
    ],
  },
  {
    name: 'CMS Management',
    price: '$10',
    period: '/mo',
    icon: IconSettings,
    description: 'Keep your content platform optimized',
    features: [
      'Content platform optimizations',
      'Access to our asset compression tools',
      'Image & media optimization',
      'Performance monitoring & tuning',
    ],
  },
];

const buildAddOns = [
  {
    name: 'Additional pages',
    price: '$20',
    period: '/page',
    icon: IconLayoutGrid,
    description: 'Expand beyond the base build with extra landing or content pages.',
  },
  {
    name: 'Custom design',
    price: '$50',
    period: '/page',
    icon: IconBrush,
    description: 'Move beyond templates with bespoke layouts and visuals.',
  },
  {
    name: 'CMS integration',
    price: '$50',
    period: '/page',
    icon: IconServerCog,
    description: 'Wire up a managed CMS so you can edit content yourself.',
  },
  {
    name: 'Page iterations',
    price: '$20',
    period: '/page',
    icon: IconRefresh,
    description: 'Additional revision rounds including new copy or assets.',
  },
];

const hostingAndSeo = [
  {
    name: 'Basic hosting',
    price: '$20',
    period: '/mo',
    icon: IconServer,
    description: 'Fast, monitored hosting on our infrastructure.',
    highlighted: false,
  },
  {
    name: 'SEO — Basic',
    price: '$100',
    period: '/mo',
    icon: IconSearch,
    description: 'Foundational keyword tracking and on-page tweaks.',
    highlighted: false,
  },
  {
    name: 'SEO — Premier',
    price: '$250',
    period: '/mo',
    icon: IconSearch,
    description: 'Content optimization plus monthly outreach.',
    highlighted: true,
  },
  {
    name: 'SEO — Pro',
    price: '$500',
    period: '/mo',
    icon: IconSearch,
    description: 'Full-stack SEO program with link building and reporting.',
    highlighted: false,
  },
];

export default function PricingPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const addOnsRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const addOnsInView = useInView(addOnsRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });

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
            background: 'linear-gradient(180deg, #0D1F4A 0%, #0A1A3F 100%)',
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
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.15) 0%, transparent 70%)',
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
                    fw={700}
                    style={{
                      background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      color: '#FFFFFF',
                      letterSpacing: '1px',
                      fontSize: '0.75rem',
                      padding: '12px 20px',
                    }}
                  >
                    Transparent & Flexible
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
                    Quality Work,{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Fair Pricing
                    </Text>
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    maw={650}
                    lh={1.8}
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    Every project is different. We scope and price based on your specific needs —
                    no cookie-cutter packages, no surprise invoices. Let&apos;s talk about what you need.
                  </Text>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/contact"
                      size="lg"
                      radius="xl"
                      rightSection={<IconArrowRight size={18} />}
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          border: 'none',
                          transition: 'all 0.2s ease',
                          paddingInline: 32,
                        },
                      }}
                    >
                      Get a Free Quote
                    </Button>
                  </motion.div>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Services Overview */}
        <Box
          component="section"
          py={80}
          style={{ background: '#0A1A3F' }}
          ref={servicesRef}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="xl" mb={60}>
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
                  What We Build
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
                  Services Tailored to Your Goals
                </Title>
                <Text
                  size="lg"
                  ta="center"
                  maw={600}
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  lh={1.8}
                >
                  We quote every project individually because no two businesses are alike.
                  Here&apos;s what we can build for you.
                </Text>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={24}>
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  style={{ height: '100%' }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#0D1F4A',
                      borderRadius: 24,
                      border: '1px solid rgba(77, 163, 255, 0.1)',
                      height: '100%',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <Stack gap="lg" h="100%">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ThemeIcon
                          size={56}
                          radius="xl"
                          style={{
                            background: service.gradient,
                            boxShadow: '0 8px 25px rgba(31, 79, 216, 0.3)',
                          }}
                        >
                          <service.icon size={26} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>

                      <Box>
                        <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.35rem' }}>
                          {service.name}
                        </Title>
                        <Text
                          size="sm"
                          fw={500}
                          mt={6}
                          style={{ color: '#4DA3FF' }}
                        >
                          {service.signal}
                        </Text>
                      </Box>

                      <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.65)' }} lh={1.7}>
                        {service.description}
                      </Text>

                      <List
                        spacing="xs"
                        size="sm"
                        icon={
                          <ThemeIcon
                            size={18}
                            radius="xl"
                            style={{ background: 'rgba(77, 163, 255, 0.2)' }}
                          >
                            <IconCheck size={10} color="#4DA3FF" />
                          </ThemeIcon>
                        }
                        style={{ flexGrow: 1 }}
                      >
                        {service.highlights.map((item) => (
                          <List.Item
                            key={item}
                            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                          >
                            {item}
                          </List.Item>
                        ))}
                      </List>

                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          component={Link}
                          href="/contact"
                          fullWidth
                          size="md"
                          radius="xl"
                          variant="outline"
                          rightSection={<IconArrowRight size={16} />}
                          onClick={() => trackEvent(EVENTS.PRICING_SELECT_PLAN, { plan: service.name })}
                          styles={{
                            root: {
                              borderColor: 'rgba(77, 163, 255, 0.3)',
                              color: '#4DA3FF',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                background: 'rgba(77, 163, 255, 0.1)',
                                borderColor: '#4DA3FF',
                              },
                            },
                          }}
                        >
                          Discuss Your Project
                        </Button>
                      </motion.div>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>

            <motion.div
              initial={{ opacity: 0 }}
              animate={servicesInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Text ta="center" size="sm" mt={40} style={{ color: '#8A9BB8' }}>
                Every quote includes a detailed scope, timeline, and breakdown — no guesswork.{' '}
                <Text component={Link} href="/contact" style={{ color: '#4DA3FF', textDecoration: 'underline' }}>
                  Request a free consultation →
                </Text>
              </Text>
            </motion.div>
          </Container>
        </Box>

        {/* Managed Hosting & Services Section */}
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
                  Managed Services
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
                  We Handle the Technical Stuff
                </Title>
                <Text
                  size="lg"
                  ta="center"
                  maw={600}
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  lh={1.8}
                >
                  Keep your site running fast and secure with our managed hosting,
                  plus add-on services to grow your business.
                </Text>
              </Stack>
            </motion.div>

            {/* Featured Managed Hosting Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Box
                p="xl"
                mb={30}
                style={{
                  background: 'linear-gradient(135deg, #0A1A3F 0%, #1A2F5F 100%)',
                  borderRadius: 24,
                  border: '2px solid rgba(77, 163, 255, 0.3)',
                  boxShadow: '0 25px 50px rgba(10, 26, 63, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: 300,
                    height: 300,
                    border: '1px solid rgba(77, 163, 255, 0.1)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40} style={{ alignItems: 'center', position: 'relative' }}>
                  <Stack gap="lg">
                    <Group gap="md">
                      <ThemeIcon
                        size={60}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          boxShadow: '0 8px 25px rgba(77, 163, 255, 0.4)',
                        }}
                      >
                        <IconServer size={28} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={500} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Core Service
                        </Text>
                        <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.5rem' }}>
                          Managed Hosting
                        </Title>
                      </Box>
                    </Group>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                      Reliable, fast, and fully managed hosting so you never have to worry about
                      uptime, security updates, or server maintenance. We handle everything.
                    </Text>
                    <List
                      spacing="sm"
                      size="sm"
                      icon={
                        <ThemeIcon
                          size={20}
                          radius="xl"
                          style={{ background: 'rgba(77, 163, 255, 0.3)' }}
                        >
                          <IconCheck size={12} color="#4DA3FF" />
                        </ThemeIcon>
                      }
                    >
                      <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>SSL certificate & security monitoring</List.Item>
                      <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Automatic backups & updates</List.Item>
                      <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>99.9% uptime guarantee</List.Item>
                      <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Performance optimization</List.Item>
                      <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Priority technical support</List.Item>
                    </List>
                  </Stack>
                  <Stack align="center" gap="md">
                    <Box ta="center">
                      <Text size="sm" fw={500} tt="uppercase" style={{ color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '1px' }}>
                        per month
                      </Text>
                      <Text
                        fw={700}
                        style={{
                          fontSize: '4rem',
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                        }}
                      >
                        $20
                      </Text>
                      <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Everything included. No hidden fees.
                      </Text>
                    </Box>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        component={Link}
                        href="/contact"
                        size="lg"
                        radius="xl"
                        rightSection={<IconArrowRight size={18} />}
                        styles={{
                          root: {
                            background: 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)',
                            border: 'none',
                            transition: 'all 0.2s ease',
                            paddingInline: 32,
                          },
                        }}
                      >
                        Get Started
                      </Button>
                    </motion.div>
                  </Stack>
                </SimpleGrid>
              </Box>
            </motion.div>

            {/* Add-on Services Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Group gap="sm" justify="center" mb={30}>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
                <Text fw={600} size="sm" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '2px' }}>
                  Managed Services — $10/mo each
                </Text>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
              </Group>
            </motion.div>

            {/* Add-on Cards */}
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={20}>
              {managedAddOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#0A1A3F',
                      borderRadius: 20,
                      border: '1px solid rgba(77, 163, 255, 0.1)',
                      height: '100%',
                    }}
                  >
                    <Stack gap="md" h="100%">
                      <Group gap="md">
                        <ThemeIcon
                          size={48}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.3) 0%, rgba(77, 163, 255, 0.15) 100%)',
                          }}
                        >
                          <addon.icon size={22} color="#4DA3FF" stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text fw={600} style={{ color: '#FFFFFF' }}>
                            {addon.name}
                          </Text>
                          <Group gap={4} align="baseline">
                            <Text
                              fw={700}
                              style={{
                                fontSize: '1.5rem',
                                color: '#0CCE6B',
                              }}
                            >
                              {addon.price}
                            </Text>
                            <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                              {addon.period}
                            </Text>
                          </Group>
                        </Box>
                      </Group>
                      <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {addon.description}
                      </Text>
                      <List
                        spacing="xs"
                        size="sm"
                        icon={
                          <ThemeIcon
                            size={18}
                            radius="xl"
                            style={{ background: 'rgba(12, 206, 107, 0.15)' }}
                          >
                            <IconCheck size={10} color="#0CCE6B" />
                          </ThemeIcon>
                        }
                        style={{ flexGrow: 1 }}
                      >
                        {addon.features.map((feature) => (
                          <List.Item
                            key={feature}
                            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                          >
                            {feature}
                          </List.Item>
                        ))}
                      </List>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>

            {/* Bundle all add-ons note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={addOnsInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <Box
                mt={30}
                p="lg"
                ta="center"
                style={{
                  background: 'rgba(12, 206, 107, 0.05)',
                  borderRadius: 16,
                  border: '1px solid rgba(12, 206, 107, 0.15)',
                }}
              >
                <Text fw={600} style={{ color: '#0CCE6B' }}>
                  Bundle all three add-ons with managed hosting for just $50/mo
                </Text>
                <Text size="sm" mt={4} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Hosting + Email + Analytics + CMS — everything you need, fully managed.
                </Text>
              </Box>
            </motion.div>

            {/* Build Add-Ons Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Group gap="sm" justify="center" mt={60} mb={30}>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
                <Text fw={600} size="sm" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '2px' }}>
                  Build Add-Ons — per page / one-time
                </Text>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
              </Group>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={20}>
              {buildAddOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#0A1A3F',
                      borderRadius: 20,
                      border: '1px solid rgba(77, 163, 255, 0.1)',
                      height: '100%',
                    }}
                  >
                    <Stack gap="sm" h="100%">
                      <ThemeIcon
                        size={48}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.3) 0%, rgba(77, 163, 255, 0.15) 100%)',
                        }}
                      >
                        <addon.icon size={22} color="#4DA3FF" stroke={1.5} />
                      </ThemeIcon>
                      <Text fw={600} style={{ color: '#FFFFFF' }}>
                        {addon.name}
                      </Text>
                      <Group gap={4} align="baseline">
                        <Text fw={700} style={{ fontSize: '1.5rem', color: '#0CCE6B' }}>
                          {addon.price}
                        </Text>
                        <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {addon.period}
                        </Text>
                      </Group>
                      <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
                        {addon.description}
                      </Text>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>

            {/* Hosting & SEO Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Group gap="sm" justify="center" mt={60} mb={30}>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
                <Text fw={600} size="sm" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '2px' }}>
                  Hosting & SEO Programs
                </Text>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', flex: 1, maxWidth: 100 }} />
              </Group>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={20}>
              {hostingAndSeo.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.08 }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: addon.highlighted
                        ? 'linear-gradient(135deg, rgba(31, 79, 216, 0.18) 0%, rgba(77, 163, 255, 0.08) 100%)'
                        : '#0A1A3F',
                      borderRadius: 20,
                      border: addon.highlighted
                        ? '1px solid rgba(77, 163, 255, 0.4)'
                        : '1px solid rgba(77, 163, 255, 0.1)',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    {addon.highlighted && (
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
                    <Stack gap="sm" h="100%">
                      <ThemeIcon
                        size={48}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.3) 0%, rgba(77, 163, 255, 0.15) 100%)',
                        }}
                      >
                        <addon.icon size={22} color="#4DA3FF" stroke={1.5} />
                      </ThemeIcon>
                      <Text fw={600} style={{ color: '#FFFFFF' }}>
                        {addon.name}
                      </Text>
                      <Group gap={4} align="baseline">
                        <Text fw={700} style={{ fontSize: '1.5rem', color: '#0CCE6B' }}>
                          {addon.price}
                        </Text>
                        <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {addon.period}
                        </Text>
                      </Group>
                      <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
                        {addon.description}
                      </Text>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
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
