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
  Divider,
  Progress,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  IconArrowRight,
  IconCheck,
  IconChartBar,
  IconTarget,
  IconUsers,
  IconClick,
  IconEye,
  IconBrain,
  IconPalette,
  IconAB,
  IconChartDots,
  IconArrowBounce,
  IconShoppingCart,
  IconMail,
  IconPhone,
  IconPlayerPlay,
  IconHeart,
  IconTrendingUp,
  IconAlertTriangle,
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

const conversionTypes = [
  { icon: IconShoppingCart, label: 'Purchase', desc: 'Completing a sale' },
  { icon: IconMail, label: 'Sign Up', desc: 'Email or account' },
  { icon: IconPhone, label: 'Contact', desc: 'Form submission' },
  { icon: IconPlayerPlay, label: 'Engagement', desc: 'Video plays, clicks' },
];

const bounceReasons = [
  { reason: 'Slow loading', impact: 85, color: '#FF6B6B' },
  { reason: 'Confusing layout', impact: 72, color: '#FF8C42' },
  { reason: 'No clear CTA', impact: 68, color: '#FFB347' },
  { reason: 'Poor mobile experience', impact: 61, color: '#FFD93D' },
];

const lucidDifference = [
  {
    icon: IconBrain,
    title: 'Psychology-Driven Design',
    description: 'We don\'t guess—we apply proven psychological principles. Color psychology, visual hierarchy, and decision architecture guide every design choice.',
    stat: '40%',
    statLabel: 'Higher engagement',
  },
  {
    icon: IconAB,
    title: 'Data-Backed Decisions',
    description: 'Every change is tested. We run A/B tests, analyze heatmaps, and track real user behavior to prove what works—not assume.',
    stat: '200+',
    statLabel: 'Tests per project',
  },
  {
    icon: IconChartDots,
    title: 'Full-Funnel Optimization',
    description: 'Most agencies optimize landing pages. We optimize the entire journey—from first click to final purchase and beyond.',
    stat: '3.2x',
    statLabel: 'Average ROI lift',
  },
  {
    icon: IconTarget,
    title: 'Goal-Specific Strategy',
    description: 'E-commerce needs different tactics than lead generation. We build custom conversion strategies for your specific business model.',
    stat: '94%',
    statLabel: 'Client retention',
  },
];

const services = [
  {
    icon: IconPalette,
    title: 'Conversion-Focused Design',
    description: 'Beautiful designs that sell. We create interfaces that guide visitors naturally toward action with strategic visual hierarchy, trust signals, and persuasive layouts.',
    features: ['Landing page design', 'UI/UX optimization', 'Mobile-first approach', 'Brand consistency'],
  },
  {
    icon: IconChartBar,
    title: 'Funnel Optimization',
    description: 'We map your entire customer journey and eliminate every friction point. From awareness to purchase, we ensure visitors flow smoothly toward conversion.',
    features: ['Journey mapping', 'Drop-off analysis', 'Checkout optimization', 'Multi-step forms'],
  },
  {
    icon: IconAB,
    title: 'A/B Testing & Experimentation',
    description: 'Stop guessing what works. We run rigorous split tests on headlines, layouts, CTAs, and more to find the highest-converting combinations.',
    features: ['Hypothesis testing', 'Statistical analysis', 'Multivariate tests', 'Continuous optimization'],
  },
  {
    icon: IconEye,
    title: 'User Behavior Analysis',
    description: 'We watch how real users interact with your site using heatmaps, session recordings, and analytics to uncover hidden conversion killers.',
    features: ['Heatmap analysis', 'Session recordings', 'Click tracking', 'Scroll depth analysis'],
  },
  {
    icon: IconBrain,
    title: 'Persuasion Psychology',
    description: 'We apply behavioral science principles—scarcity, social proof, reciprocity, and more—to ethically influence visitor decisions.',
    features: ['Trust signals', 'Social proof', 'Urgency tactics', 'Cognitive bias leverage'],
  },
  {
    icon: IconTrendingUp,
    title: 'Analytics & Reporting',
    description: 'Clear, actionable insights—not vanity metrics. We track what matters: conversion rates, revenue per visitor, and customer lifetime value.',
    features: ['Custom dashboards', 'Goal tracking', 'Attribution modeling', 'ROI measurement'],
  },
];

const process = [
  {
    step: '01',
    title: 'Conversion Audit',
    description: 'We analyze your current site, identify leaks in your funnel, and benchmark against industry standards. You\'ll know exactly where you\'re losing customers.',
  },
  {
    step: '02',
    title: 'Strategy & Prioritization',
    description: 'Based on data, we create a prioritized roadmap. We tackle high-impact, quick-win opportunities first so you see results fast.',
  },
  {
    step: '03',
    title: 'Design & Implement',
    description: 'Our team designs and builds conversion-optimized pages. Every element is intentional—from button colors to form field order.',
  },
  {
    step: '04',
    title: 'Test & Iterate',
    description: 'We launch, test, measure, and improve. Conversion optimization is never "done"—we continuously find ways to increase your results.',
  },
];

const industryBenchmarks = [
  { industry: 'Average Website', rate: '2.35%', lucidRate: '5.8%', improvement: '+147%' },
  { industry: 'E-commerce', rate: '1.84%', lucidRate: '4.2%', improvement: '+128%' },
  { industry: 'SaaS/B2B', rate: '3.04%', lucidRate: '7.1%', improvement: '+134%' },
  { industry: 'Lead Generation', rate: '2.6%', lucidRate: '6.4%', improvement: '+146%' },
];

export default function ConversionOptimizationPage() {
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const bounceRef = useRef(null);
  const differenceRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const resultsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whatIsInView = useInView(whatIsRef, { once: true, margin: '-100px' });
  const bounceInView = useInView(bounceRef, { once: true, margin: '-100px' });
  const differenceInView = useInView(differenceRef, { once: true, margin: '-100px' });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const resultsInView = useInView(resultsRef, { once: true, margin: '-100px' });
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
                      background: 'rgba(31, 79, 216, 0.1)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.2)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    Conversion Optimization
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
                    Turn More Visitors Into{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Paying Customers
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
                    You&apos;re getting traffic, but visitors leave without buying. We fix that.
                    Through psychology-driven design and data-backed optimization, we transform
                    browsers into buyers.
                  </Text>
                </motion.div>

                {/* Key stats */}
                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.6 }}
                >
                  <Group gap="xl" mt="md">
                    {[
                      { value: '2.5x', label: 'Average conversion lift' },
                      { value: '35%', label: 'Bounce rate reduction' },
                      { value: '89%', label: 'Client satisfaction' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <Box ta="center">
                          <Text
                            fw={700}
                            style={{
                              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                              color: '#1F4FD8',
                            }}
                          >
                            {stat.value}
                          </Text>
                          <Text size="xs" style={{ color: '#8A9BB8' }}>
                            {stat.label}
                          </Text>
                        </Box>
                      </motion.div>
                    ))}
                  </Group>
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
                        Get Free Conversion Audit
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        component={Link}
                        href="#what-is-conversion"
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
                        What is Conversion?
                      </Button>
                    </motion.div>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* What is Conversion - Educational Section */}
        <Box
          component="section"
          id="what-is-conversion"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={whatIsRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={whatIsInView ? 'animate' : 'initial'}
              variants={staggerContainer}
            >
              <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={60}>
                <Stack gap="xl">
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Badge
                      size="lg"
                      radius="xl"
                      tt="uppercase"
                      fw={600}
                      style={{
                        background: 'rgba(31, 79, 216, 0.1)',
                        color: '#1F4FD8',
                        border: '1px solid rgba(31, 79, 216, 0.2)',
                        letterSpacing: '1px',
                        fontSize: '0.7rem',
                        padding: '10px 16px',
                      }}
                    >
                      The Basics
                    </Badge>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Title
                      order={2}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                        fontWeight: 700,
                        color: '#0A1A3F',
                      }}
                    >
                      What is a &quot;Conversion&quot;?
                    </Title>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                      A <strong style={{ color: '#0A1A3F' }}>conversion</strong> happens when a visitor 
                      takes the action you want them to take. It&apos;s the moment someone goes from 
                      &quot;just looking&quot; to &quot;taking action.&quot;
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Text size="md" lh={1.8} style={{ color: '#5A7099' }}>
                      Your <strong style={{ color: '#0A1A3F' }}>conversion rate</strong> is the percentage 
                      of visitors who convert. If 100 people visit your site and 3 make a purchase, 
                      your conversion rate is 3%.
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Box
                      p="lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.05) 0%, rgba(77, 163, 255, 0.05) 100%)',
                        borderRadius: 16,
                        border: '1px solid rgba(31, 79, 216, 0.1)',
                      }}
                    >
                      <Group gap="sm" mb="sm">
                        <IconTarget size={20} color="#1F4FD8" />
                        <Text fw={600} style={{ color: '#0A1A3F' }}>The Math That Matters</Text>
                      </Group>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        Doubling your conversion rate = doubling your revenue without spending more on ads. 
                        If you get 10,000 visitors/month at 2% conversion, that&apos;s 200 customers. 
                        At 4%? That&apos;s 400 customers—<strong style={{ color: '#1F4FD8' }}>same traffic, double the money.</strong>
                      </Text>
                    </Box>
                  </motion.div>
                </Stack>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#F8F9FB',
                      borderRadius: 24,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
                    }}
                  >
                    <Text size="sm" fw={600} tt="uppercase" mb="lg" style={{ color: '#8A9BB8', letterSpacing: '1px' }}>
                      Types of Conversions
                    </Text>
                    <SimpleGrid cols={2} spacing="md">
                      {conversionTypes.map((type, index) => (
                        <motion.div
                          key={type.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={whatIsInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <Box
                            p="md"
                            style={{
                              background: '#FFFFFF',
                              borderRadius: 12,
                              border: '1px solid rgba(10, 26, 63, 0.06)',
                            }}
                          >
                            <ThemeIcon
                              size={40}
                              radius="xl"
                              mb="sm"
                              style={{
                                background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                              }}
                            >
                              <type.icon size={20} color="#FFFFFF" />
                            </ThemeIcon>
                            <Text fw={600} size="sm" style={{ color: '#0A1A3F' }}>
                              {type.label}
                            </Text>
                            <Text size="xs" style={{ color: '#8A9BB8' }}>
                              {type.desc}
                            </Text>
                          </Box>
                        </motion.div>
                      ))}
                    </SimpleGrid>
                  </Box>
                </motion.div>
              </SimpleGrid>
            </motion.div>
          </Container>
        </Box>

        {/* What is Bounce Rate Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={bounceRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={bounceInView ? 'animate' : 'initial'}
              variants={staggerContainer}
            >
              <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={60}>
                <Stack gap="xl">
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Group gap="sm">
                      <IconArrowBounce size={28} color="#FF6B6B" />
                      <Badge
                        size="lg"
                        radius="xl"
                        tt="uppercase"
                        fw={600}
                        style={{
                          background: 'rgba(255, 107, 107, 0.15)',
                          color: '#FF6B6B',
                          border: '1px solid rgba(255, 107, 107, 0.3)',
                          letterSpacing: '1px',
                          fontSize: '0.7rem',
                          padding: '10px 16px',
                        }}
                      >
                        The Conversion Killer
                      </Badge>
                    </Group>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Title
                      order={2}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}
                    >
                      What is &quot;Bounce Rate&quot;?
                    </Title>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Text size="lg" lh={1.8} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <strong style={{ color: '#FFFFFF' }}>Bounce rate</strong> is the percentage of visitors 
                      who land on your site and leave without doing anything—no clicks, no scrolling, 
                      no engagement. They &quot;bounce&quot; away like a ball off a wall.
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Box
                      p="lg"
                      style={{
                        background: 'rgba(255, 107, 107, 0.1)',
                        borderRadius: 16,
                        border: '1px solid rgba(255, 107, 107, 0.2)',
                      }}
                    >
                      <Group gap="sm" mb="sm">
                        <IconAlertTriangle size={20} color="#FF6B6B" />
                        <Text fw={600} style={{ color: '#FFFFFF' }}>The Hidden Cost</Text>
                      </Group>
                      <Text size="sm" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        A 60% bounce rate means 6 out of every 10 visitors leave immediately. 
                        If you&apos;re paying $2 per click for ads, you&apos;re burning $12 out of every $20 
                        on people who never even consider your offer.
                      </Text>
                    </Box>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Group gap="xl">
                      <Box>
                        <Text fw={700} style={{ fontSize: '2rem', color: '#FF6B6B' }}>
                          47%
                        </Text>
                        <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Average bounce rate
                        </Text>
                      </Box>
                      <Box>
                        <Text fw={700} style={{ fontSize: '2rem', color: '#0CCE6B' }}>
                          25%
                        </Text>
                        <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Lucid client average
                        </Text>
                      </Box>
                    </Group>
                  </motion.div>
                </Stack>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={bounceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 24,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Text size="sm" fw={600} tt="uppercase" mb="xl" style={{ color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '1px' }}>
                      Why Visitors Bounce
                    </Text>
                    <Stack gap="lg">
                      {bounceReasons.map((item, index) => (
                        <motion.div
                          key={item.reason}
                          initial={{ opacity: 0, x: 20 }}
                          animate={bounceInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <Group justify="space-between" mb={6}>
                            <Text size="sm" fw={500} style={{ color: '#FFFFFF' }}>
                              {item.reason}
                            </Text>
                            <Text size="xs" fw={600} style={{ color: item.color }}>
                              {item.impact}% impact
                            </Text>
                          </Group>
                          <Progress
                            value={item.impact}
                            size="sm"
                            radius="xl"
                            styles={{
                              root: { background: 'rgba(255, 255, 255, 0.1)' },
                              section: { background: item.color },
                            }}
                          />
                        </motion.div>
                      ))}
                    </Stack>
                    <Divider my="xl" color="rgba(255, 255, 255, 0.1)" />
                    <Text size="sm" ta="center" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      We fix all of these—and more.
                    </Text>
                  </Box>
                </motion.div>
              </SimpleGrid>
            </motion.div>
          </Container>
        </Box>

        {/* What Makes Lucid Different */}
        <Box
          component="section"
          py={100}
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 100%)',
          }}
          ref={differenceRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={differenceInView ? 'animate' : 'initial'}
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
                    Our Approach
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
                    What Makes Lucid Different
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: '#5A7099' }} lh={1.8}>
                    Most agencies make pretty websites. We make websites that <em>perform</em>. 
                    Here&apos;s how we consistently achieve conversion rates 2-3x industry average.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {lucidDifference.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={differenceInView ? { opacity: 1, y: 0 } : {}}
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
                      boxShadow: '0 4px 20px rgba(10, 26, 63, 0.04)',
                    }}
                  >
                    <Group justify="space-between" align="flex-start" mb="lg">
                      <ThemeIcon
                        size={56}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        }}
                      >
                        <item.icon size={28} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                      <Box ta="right">
                        <Text fw={700} style={{ fontSize: '1.75rem', color: '#1F4FD8', lineHeight: 1 }}>
                          {item.stat}
                        </Text>
                        <Text size="xs" style={{ color: '#8A9BB8' }}>
                          {item.statLabel}
                        </Text>
                      </Box>
                    </Group>
                    <Title order={3} size="h4" mb="sm" style={{ color: '#0A1A3F' }}>
                      {item.title}
                    </Title>
                    <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                      {item.description}
                    </Text>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Services Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={servicesRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={servicesInView ? 'animate' : 'initial'}
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
                    Our Services
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
                    How We Increase Your Conversions
                  </Title>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 20,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
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
                          <service.icon size={24} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                      <Title order={3} size="h4" style={{ color: '#0A1A3F' }}>
                        {service.title}
                      </Title>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        {service.description}
                      </Text>
                      <Divider color="rgba(10, 26, 63, 0.06)" />
                      <Group gap={6} wrap="wrap">
                        {service.features.map((feature) => (
                          <Badge
                            key={feature}
                            size="sm"
                            radius="sm"
                            style={{
                              background: 'rgba(31, 79, 216, 0.06)',
                              color: '#1F4FD8',
                              border: 'none',
                              fontWeight: 500,
                            }}
                          >
                            {feature}
                          </Badge>
                        ))}
                      </Group>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Results Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={resultsRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={resultsInView ? 'animate' : 'initial'}
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
                      background: 'rgba(12, 206, 107, 0.1)',
                      color: '#0CCE6B',
                      border: '1px solid rgba(12, 206, 107, 0.2)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    Proven Results
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
                    We Beat Industry Benchmarks
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: '#5A7099' }}>
                    Don&apos;t just take our word for it. Here&apos;s how our clients compare to industry averages.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <Box
              p={{ base: 'lg', md: 'xl' }}
              style={{
                background: '#F8F9FB',
                borderRadius: 24,
                border: '1px solid rgba(10, 26, 63, 0.06)',
              }}
            >
              {/* Header */}
              <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" mb="xl">
                <Text size="xs" fw={600} tt="uppercase" style={{ color: '#8A9BB8' }}>Industry</Text>
                <Text size="xs" fw={600} tt="uppercase" ta={{ base: 'left', md: 'center' }} style={{ color: '#8A9BB8' }}>Avg. Rate</Text>
                <Text size="xs" fw={600} tt="uppercase" ta={{ base: 'left', md: 'center' }} style={{ color: '#8A9BB8' }} display={{ base: 'none', md: 'block' }}>Lucid Rate</Text>
                <Text size="xs" fw={600} tt="uppercase" ta={{ base: 'left', md: 'center' }} style={{ color: '#8A9BB8' }} display={{ base: 'none', md: 'block' }}>Improvement</Text>
              </SimpleGrid>
              
              <Stack gap="md">
                {industryBenchmarks.map((benchmark, index) => (
                  <motion.div
                    key={benchmark.industry}
                    initial={{ opacity: 0, x: -20 }}
                    animate={resultsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Box
                      p="md"
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 12,
                        border: '1px solid rgba(10, 26, 63, 0.06)',
                      }}
                    >
                      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" style={{ alignItems: 'center' }}>
                        <Text fw={600} style={{ color: '#0A1A3F' }}>{benchmark.industry}</Text>
                        <Text ta={{ base: 'left', md: 'center' }} style={{ color: '#8A9BB8' }}>{benchmark.rate}</Text>
                        <Text fw={600} ta={{ base: 'left', md: 'center' }} style={{ color: '#1F4FD8' }} display={{ base: 'none', md: 'block' }}>{benchmark.lucidRate}</Text>
                        <Group justify="center" display={{ base: 'none', md: 'flex' }}>
                          <Badge
                            size="lg"
                            radius="sm"
                            style={{
                              background: 'rgba(12, 206, 107, 0.1)',
                              color: '#0CCE6B',
                              border: '1px solid rgba(12, 206, 107, 0.2)',
                            }}
                          >
                            {benchmark.improvement}
                          </Badge>
                        </Group>
                        {/* Mobile-only additional info */}
                        <Box display={{ base: 'block', md: 'none' }} style={{ gridColumn: 'span 2' }}>
                          <Group gap="md">
                            <Box>
                              <Text size="xs" style={{ color: '#8A9BB8' }}>Lucid Rate</Text>
                              <Text fw={600} style={{ color: '#1F4FD8' }}>{benchmark.lucidRate}</Text>
                            </Box>
                            <Badge
                              size="md"
                              radius="sm"
                              style={{
                                background: 'rgba(12, 206, 107, 0.1)',
                                color: '#0CCE6B',
                                border: '1px solid rgba(12, 206, 107, 0.2)',
                              }}
                            >
                              {benchmark.improvement}
                            </Badge>
                          </Group>
                        </Box>
                      </SimpleGrid>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </Container>
        </Box>

        {/* Process Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={processRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={processInView ? 'animate' : 'initial'}
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
                    Our Process
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
                    From Analysis to Results
                  </Title>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: index === 0 ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)' : '#FFFFFF',
                      borderRadius: 20,
                      border: index === 0 ? 'none' : '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                      position: 'relative',
                      boxShadow: index === 0 ? '0 10px 30px rgba(31, 79, 216, 0.25)' : undefined,
                    }}
                  >
                    <Text
                      fw={800}
                      style={{
                        position: 'absolute',
                        top: 15,
                        right: 20,
                        fontSize: '3rem',
                        opacity: index === 0 ? 0.2 : 0.08,
                        color: index === 0 ? '#FFFFFF' : '#1F4FD8',
                        lineHeight: 1,
                      }}
                    >
                      {item.step}
                    </Text>
                    <Stack gap="md" style={{ position: 'relative' }}>
                      <Title
                        order={3}
                        size="h4"
                        style={{ color: index === 0 ? '#FFFFFF' : '#0A1A3F' }}
                      >
                        {item.title}
                      </Title>
                      <Text
                        size="sm"
                        lh={1.7}
                        style={{ color: index === 0 ? 'rgba(255, 255, 255, 0.85)' : '#5A7099' }}
                      >
                        {item.description}
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
            background: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 150%)',
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
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ThemeIcon
                    size={80}
                    radius="xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <IconHeart size={40} color="#FFFFFF" stroke={1.5} />
                  </ThemeIcon>
                </motion.div>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Ready to Convert More Visitors?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.85)' }} lh={1.8}>
                  Get a free conversion audit. We&apos;ll analyze your current site, identify your biggest 
                  conversion killers, and show you exactly how to fix them.
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
                          color: '#0A1A3F',
                        },
                      }}
                    >
                      Get Free Conversion Audit
                    </Button>
                  </motion.div>
                </Group>

                <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  No commitment • Detailed report • Actionable insights
                </Text>
              </Stack>
            </motion.div>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
