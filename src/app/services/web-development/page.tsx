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
  Divider,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  IconCode,
  IconArrowRight,
  IconCheck,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconServer,
  IconRocket,
  IconBolt,
  IconShield,
  IconDeviceAnalytics,
  IconBrandVercel,
  IconCloud,
  IconGauge,
  IconX,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';

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

const technologies = [
  {
    icon: IconBrandNextjs,
    name: 'Next.js 14+',
    description: 'React Server Components, App Router, and Edge Runtime for blazing speed',
  },
  {
    icon: IconBrandReact,
    name: 'React 18',
    description: 'Concurrent rendering, Suspense, and streaming for optimal UX',
  },
  {
    icon: IconBrandTypescript,
    name: 'TypeScript',
    description: 'Type-safe code that catches bugs before they reach production',
  },
  {
    icon: IconBrandVercel,
    name: 'Edge Computing',
    description: 'Deploy globally with sub-50ms response times anywhere in the world',
  },
  {
    icon: IconServer,
    name: 'Headless CMS',
    description: 'Sanity, Contentful, or custom solutions for easy content management',
  },
  {
    icon: IconCloud,
    name: 'Cloud Native',
    description: 'AWS, Vercel, or Cloudflare—architected for infinite scale',
  },
];

const templateComparison = {
  templates: [
    'Limited customization options',
    'Bloated code affects load time',
    'Generic design everyone uses',
    'Plugin conflicts & security risks',
    'Expensive ongoing subscription fees',
    'Difficult to scale or modify',
  ],
  custom: [
    'Built exactly to your specifications',
    'Optimized code, sub-second loads',
    'Unique design that stands out',
    'Enterprise-grade security built-in',
    'One-time investment, you own it',
    'Scales effortlessly as you grow',
  ],
};

const benefits = [
  {
    icon: IconGauge,
    title: 'Performance That Converts',
    description:
      'Every 100ms of load time improvement can boost conversion rates by 7%. Our sites consistently score 95+ on Google Lighthouse.',
  },
  {
    icon: IconShield,
    title: 'Enterprise Security',
    description:
      'No vulnerable plugins, no outdated dependencies. Just clean, audited code with modern security practices baked in.',
  },
  {
    icon: IconDeviceAnalytics,
    title: 'SEO by Default',
    description:
      'Server-side rendering, semantic HTML, optimized metadata, and structured data—your site is ready to rank from day one.',
  },
  {
    icon: IconRocket,
    title: 'Future-Proof Architecture',
    description:
      'Built on industry-standard technologies used by Netflix, TikTok, and Notion. Your investment stays relevant for years.',
  },
  {
    icon: IconBrandVercel,
    title: 'Managed Pay-As-You-Go Hosting',
    description:
      'We deploy on Vercel—the platform built by the creators of Next.js. Pay only for what you use, scale automatically, and never worry about server management.',
  },
];

const hostingFeatures = [
  'Pay only for actual usage—no fixed monthly fees',
  'Automatic scaling during traffic spikes',
  'Global CDN with 100+ edge locations',
  'Zero-downtime deployments',
  'Built-in analytics and performance monitoring',
  'Free SSL certificates and DDoS protection',
];

export default function WebDevelopmentPage() {
  const heroRef = useRef(null);
  const techRef = useRef(null);
  const comparisonRef = useRef(null);
  const benefitsRef = useRef(null);
  const hostingRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const techInView = useInView(techRef, { once: true, margin: '-100px' });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: '-100px' });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });
  const hostingInView = useInView(hostingRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <Box
          component="section"
          pt={160}
          pb={100}
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={heroRef}
        >
          {/* Background elements */}
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
                    Web Development
                  </Badge>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Title
                    order={1}
                    ta="center"
                    maw={900}
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: '#0A1A3F',
                    }}
                  >
                    Built for Speed.{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Designed for Growth.
                    </Text>
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    maw={750}
                    lh={1.8}
                    style={{ color: '#5A7099' }}
                  >
                    We don&apos;t use templates. We craft custom web experiences using the same
                    technologies that power Netflix, Airbnb, and TikTok—optimized for your
                    business, your customers, and your goals.
                  </Text>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
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
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                          },
                        }}
                      >
                        Start Your Project
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
                            borderColor: '#C9D2E3',
                            color: '#1F4FD8',
                          },
                        }}
                      >
                        All Services
                      </Button>
                    </motion.div>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Technologies Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={techRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={techInView ? 'animate' : 'initial'}
              variants={staggerContainer}
            >
              <Stack align="center" gap="lg" mb={60}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
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
                    Our Tech Stack
                  </Badge>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    Cutting-Edge Technologies
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={650} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    The latest and greatest—not because it&apos;s trendy, but because it delivers
                    real performance benefits for your business.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={techInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 20,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      height: '100%',
                    }}
                  >
                    <Stack gap="md">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ThemeIcon
                          size={50}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          }}
                        >
                          <tech.icon size={24} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                      <Title order={4} style={{ color: '#FFFFFF' }}>
                        {tech.name}
                      </Title>
                      <Text size="sm" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {tech.description}
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
          style={{ background: '#FFFFFF' }}
          ref={comparisonRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={comparisonInView ? 'animate' : 'initial'}
              variants={staggerContainer}
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
                    The Difference
                  </Badge>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                    }}
                  >
                    Templates vs. Custom Development
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: '#5A7099' }}>
                    Many agencies sell you pre-made templates with a fresh coat of paint.
                    Here&apos;s what that really means for your business—and why we do things differently.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
              {/* Template Side */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={comparisonInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: '#F8F9FB',
                    borderRadius: 24,
                    border: '1px solid rgba(10, 26, 63, 0.06)',
                    height: '100%',
                  }}
                >
                  <Stack gap="lg">
                    <Group gap="md">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{ background: 'rgba(220, 53, 69, 0.1)' }}
                      >
                        <IconCode size={24} color="#DC3545" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text size="xs" fw={600} tt="uppercase" style={{ color: '#DC3545', letterSpacing: '1px' }}>
                          Template-Based
                        </Text>
                        <Title order={4} style={{ color: '#0A1A3F' }}>
                          The &quot;Quick Fix&quot;
                        </Title>
                      </Box>
                    </Group>
                    <Divider color="rgba(10, 26, 63, 0.08)" />
                    <List
                      spacing="md"
                      icon={
                        <ThemeIcon size={24} radius="xl" style={{ background: 'rgba(220, 53, 69, 0.1)' }}>
                          <IconX size={14} color="#DC3545" stroke={3} />
                        </ThemeIcon>
                      }
                    >
                      {templateComparison.templates.map((item) => (
                        <List.Item key={item}>
                          <Text size="sm" style={{ color: '#5A7099' }}>{item}</Text>
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                </Box>
              </motion.div>

              {/* Custom Side */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={comparisonInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                    borderRadius: 24,
                    height: '100%',
                    boxShadow: '0 20px 60px rgba(31, 79, 216, 0.25)',
                  }}
                >
                  <Stack gap="lg">
                    <Group gap="md">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <IconBolt size={24} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text size="xs" fw={600} tt="uppercase" style={{ color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '1px' }}>
                          Custom Built
                        </Text>
                        <Title order={4} style={{ color: '#FFFFFF' }}>
                          The Lucid Way
                        </Title>
                      </Box>
                    </Group>
                    <Divider color="rgba(255, 255, 255, 0.2)" />
                    <List
                      spacing="md"
                      icon={
                        <ThemeIcon size={24} radius="xl" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                          <IconCheck size={14} color="#FFFFFF" stroke={3} />
                        </ThemeIcon>
                      }
                    >
                      {templateComparison.custom.map((item) => (
                        <List.Item key={item}>
                          <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{item}</Text>
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                </Box>
              </motion.div>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Benefits Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={benefitsRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={benefitsInView ? 'animate' : 'initial'}
              variants={staggerContainer}
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
                    What You Get
                  </Badge>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                    }}
                  >
                    Real Benefits, Measurable Results
                  </Title>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 20,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                      boxShadow: '0 2px 12px rgba(10, 26, 63, 0.04)',
                    }}
                  >
                    <Group gap="lg" align="flex-start">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ThemeIcon
                          size={60}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            boxShadow: '0 4px 15px rgba(31, 79, 216, 0.25)',
                          }}
                        >
                          <benefit.icon size={28} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                      <Box style={{ flex: 1 }}>
                        <Title order={4} mb="xs" style={{ color: '#0A1A3F' }}>
                          {benefit.title}
                        </Title>
                        <Text size="md" lh={1.7} style={{ color: '#5A7099' }}>
                          {benefit.description}
                        </Text>
                      </Box>
                    </Group>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Hosting Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={hostingRef}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={60} style={{ alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={hostingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Stack gap="xl">
                  <Box>
                    <Badge
                      size="lg"
                      radius="xl"
                      tt="uppercase"
                      fw={600}
                      mb="md"
                      style={{
                        background: 'rgba(31, 79, 216, 0.08)',
                        color: '#1F4FD8',
                        border: '1px solid rgba(31, 79, 216, 0.15)',
                        letterSpacing: '1px',
                        fontSize: '0.7rem',
                        padding: '10px 16px',
                      }}
                    >
                      Managed Hosting
                    </Badge>
                    <Title
                      order={2}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                        fontWeight: 700,
                        color: '#0A1A3F',
                      }}
                    >
                      Pay-As-You-Go Hosting on Vercel
                    </Title>
                  </Box>

                  <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                    Forget expensive dedicated servers and complex DevOps. We deploy your site on
                    Vercel—the platform built by the creators of Next.js—so you only pay for what
                    you actually use.
                  </Text>

                  <Text size="md" lh={1.8} style={{ color: '#5A7099' }}>
                    Start small and scale infinitely. Whether you&apos;re getting 100 visitors a month
                    or handling viral traffic spikes, your site stays fast and your costs stay
                    predictable.
                  </Text>
                </Stack>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={hostingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: '#F8F9FB',
                    borderRadius: 24,
                    border: '1px solid rgba(10, 26, 63, 0.06)',
                  }}
                >
                  <Group gap="lg" mb="xl">
                    <ThemeIcon
                      size={60}
                      radius="xl"
                      style={{
                        background: '#000000',
                      }}
                    >
                      <IconBrandVercel size={30} color="#FFFFFF" stroke={1.5} />
                    </ThemeIcon>
                    <Box>
                      <Text size="xs" fw={600} tt="uppercase" style={{ color: '#8A9BB8', letterSpacing: '1px' }}>
                        Powered by
                      </Text>
                      <Text fw={700} size="xl" style={{ color: '#0A1A3F' }}>
                        Vercel
                      </Text>
                    </Box>
                  </Group>

                  <List
                    spacing="md"
                    icon={
                      <ThemeIcon size={24} radius="xl" style={{ background: 'rgba(31, 79, 216, 0.1)' }}>
                        <IconCheck size={14} color="#1F4FD8" stroke={3} />
                      </ThemeIcon>
                    }
                  >
                    {hostingFeatures.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={hostingInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                      >
                        <List.Item>
                          <Text size="sm" style={{ color: '#5A7099' }}>{feature}</Text>
                        </List.Item>
                      </motion.div>
                    ))}
                  </List>
                </Box>
              </motion.div>
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
          ref={ctaRef}
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
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="xl" ta="center">
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Ready for a Website That Actually Works?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  Let&apos;s discuss your project and show you exactly what modern web
                  development can do for your business.
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
                        },
                      }}
                    >
                      Get a Free Consultation
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
