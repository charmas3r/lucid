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
  ThemeIcon,
  List,
  Divider,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  IconSearch,
  IconChartLine,
  IconFileText,
  IconLink,
  IconDeviceAnalytics,
  IconRocket,
  IconTargetArrow,
  IconCode,
  IconBrandGoogle,
  IconCheck,
  IconTrendingUp,
  IconUsers,
  IconBolt,
  IconRobot,
  IconMessageChatbot,
  IconBrain,
  IconSparkles,
  IconBulb,
} from '@tabler/icons-react';
import { Navigation, Footer, RequestReportButton } from '@/components';

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

const seoServices = [
  {
    icon: IconFileText,
    title: 'Content That Gets Found',
    description:
      'We create content that answers the questions your customers are actually asking. When someone searches for what you offer, your business shows up first.',
    features: ['Research what customers search for', 'Write content they want to read', 'Structure it so search engines love it', 'Keep it fresh and updated'],
  },
  {
    icon: IconCode,
    title: 'Fast, Clean Websites',
    description:
      'Google measures how fast your site loads. Slow sites get pushed down in results. We build sites that load in under 2 seconds—keeping both Google and your visitors happy.',
    features: ['Lightning-fast page loads', 'Mobile-friendly design', 'Clean, organized code', 'No broken links or errors'],
  },
  {
    icon: IconLink,
    title: 'Building Your Reputation Online',
    description:
      'When other respected websites link to yours, Google sees you as trustworthy. We help you earn those valuable endorsements through quality content and outreach.',
    features: ['Earn links from industry sites', 'Get featured in publications', 'Build partnerships', 'Monitor your online reputation'],
  },
  {
    icon: IconDeviceAnalytics,
    title: 'See What\'s Working',
    description:
      'No guesswork. We show you exactly how many people find your site, what they search to get there, and whether they become customers. Real numbers, real insights.',
    features: ['Track your search rankings', 'See your traffic grow', 'Measure leads & sales', 'Monthly progress reports'],
  },
];

const aiSeoFeatures = [
  {
    icon: IconMessageChatbot,
    title: 'ChatGPT & Gemini Optimization',
    description:
      'When customers ask AI assistants "What\'s the best [your service] near me?", we make sure your business gets recommended. AI pulls from the web—we ensure it pulls from you.',
  },
  {
    icon: IconBrain,
    title: 'Structured Data for AI',
    description:
      'AI models need clear, organized information to understand your business. We implement schema markup that tells both Google and AI exactly what you do, where you are, and why you\'re the best choice.',
  },
  {
    icon: IconSparkles,
    title: 'Entity Recognition',
    description:
      'We help establish your brand as a known "entity" that AI recognizes. This means when AI generates answers about your industry, your business name appears as a trusted authority.',
  },
  {
    icon: IconBulb,
    title: 'Future-Proof Strategy',
    description:
      'Search is evolving. Voice search, AI assistants, and conversational queries are growing 40% year over year. We position your business for how people will search tomorrow, not just today.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'We Learn Your Business',
    description: 'We dive deep into who your customers are, what they search for, and who you\'re competing against.',
    icon: IconSearch,
  },
  {
    number: '02',
    title: 'Create Your Game Plan',
    description: 'You get a clear roadmap: what we\'ll fix, what we\'ll create, and when you\'ll see results.',
    icon: IconTargetArrow,
  },
  {
    number: '03',
    title: 'Make It Happen',
    description: 'Our team executes—optimizing your site, creating content, and building your online authority.',
    icon: IconRocket,
  },
  {
    number: '04',
    title: 'Track & Improve',
    description: 'We monitor what\'s working, report your progress, and continuously improve your results.',
    icon: IconChartLine,
  },
];

const metrics = [
  { value: '312%', label: 'Average Traffic Increase', icon: IconTrendingUp },
  { value: '67%', label: 'More Leads Generated', icon: IconBolt },
  { value: '4.2x', label: 'Return on Investment', icon: IconChartLine },
  { value: '89%', label: 'Clients Stay With Us', icon: IconUsers },
];

export default function SEOPage() {
  const heroRef = useRef(null);
  const educationRef = useRef(null);
  const servicesRef = useRef(null);
  const aiSeoRef = useRef(null);
  const processRef = useRef(null);
  const metricsRef = useRef(null);
  const authorityRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const educationInView = useInView(educationRef, { once: true, margin: '-100px' });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const aiSeoInView = useInView(aiSeoRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const metricsInView = useInView(metricsRef, { once: true, margin: '-100px' });
  const authorityInView = useInView(authorityRef, { once: true, margin: '-100px' });
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
          {/* Animated background elements */}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.06) 0%, transparent 70%)',
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
                    SEO That Actually Makes Sense
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
                    Get Found by{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Google & AI
                    </Text>
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    maw={700}
                    lh={1.8}
                    style={{ color: '#5A7099' }}
                  >
                    When potential customers search for what you offer—on Google, ChatGPT, or Gemini—your 
                    business should appear first. We make that happen with SEO strategies that work for 
                    both traditional search engines and AI assistants.
                  </Text>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap="md" mt="md">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <RequestReportButton reportType="seo" size="lg">
                        Get Free SEO Report
                      </RequestReportButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        component={Link}
                        href="#how-seo-works"
                        size="lg"
                        radius="xl"
                        variant="outline"
                        styles={{
                          root: {
                            borderColor: '#C9D2E3',
                            color: '#1F4FD8',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: 'rgba(31, 79, 216, 0.05)',
                              borderColor: '#1F4FD8',
                            },
                          },
                        }}
                      >
                        How Does SEO Work?
                      </Button>
                    </motion.div>
                  </Group>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Group gap="xl" mt="xl">
                    <Group gap="sm">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{
                          background: '#FFFFFF',
                          boxShadow: '0 4px 20px rgba(10, 26, 63, 0.1)',
                        }}
                      >
                        <IconBrandGoogle size={26} color="#1F4FD8" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={600} style={{ color: '#0A1A3F' }}>
                          Google Search
                        </Text>
                        <Text size="xs" style={{ color: '#8A9BB8' }}>
                          Top rankings
                        </Text>
                      </Box>
                    </Group>
                    <Group gap="sm">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{
                          background: '#FFFFFF',
                          boxShadow: '0 4px 20px rgba(10, 26, 63, 0.1)',
                        }}
                      >
                        <IconRobot size={26} color="#1F4FD8" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={600} style={{ color: '#0A1A3F' }}>
                          AI Assistants
                        </Text>
                        <Text size="xs" style={{ color: '#8A9BB8' }}>
                          ChatGPT & Gemini
                        </Text>
                      </Box>
                    </Group>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Metrics Section */}
        <Box
          component="section"
          py={60}
          style={{ background: '#0A1A3F' }}
          ref={metricsRef}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Stack align="center" gap="xs">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={metricsInView ? { scale: 1 } : {}}
                      transition={{ type: 'spring', stiffness: 300, delay: index * 0.1 + 0.2 }}
                    >
                      <metric.icon size={28} color="#4DA3FF" stroke={1.5} />
                    </motion.div>
                    <Text
                      fw={700}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        background: 'linear-gradient(135deg, #4DA3FF 0%, #FFFFFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {metric.value}
                    </Text>
                    <Text size="sm" ta="center" style={{ color: '#8A9BB8' }}>
                      {metric.label}
                    </Text>
                  </Stack>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Education Section - What is SEO? */}
        <Box
          component="section"
          id="how-seo-works"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={educationRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={educationInView ? 'animate' : 'initial'}
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
                    SEO Explained Simply
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
                    What is SEO & Why Does It Matter?
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={800} style={{ color: '#5A7099' }} lh={1.8}>
                    <strong>SEO (Search Engine Optimization)</strong> is how you get your website to appear when 
                    people search for your products or services. Think of it like this: if Google is a 
                    massive library, SEO is how you get your book placed at the front desk where everyone sees it.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {[
                {
                  icon: IconSearch,
                  title: '93% of Online Experiences',
                  subtitle: 'Start with a Search Engine',
                  description: 'Almost everyone uses Google to find businesses. If you\'re not on page one, you\'re invisible to most potential customers.',
                },
                {
                  icon: IconUsers,
                  title: '75% of Users',
                  subtitle: 'Never Scroll Past Page One',
                  description: 'Being on page two of Google is like having a store on a street nobody walks down. We get you to page one.',
                },
                {
                  icon: IconTrendingUp,
                  title: '14.6% Close Rate',
                  subtitle: 'For SEO Leads vs 1.7% Outbound',
                  description: 'People searching for you are ready to buy. SEO brings in customers who are actively looking for what you offer.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={educationInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#F8F9FB',
                      borderRadius: 20,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Stack gap="md" align="center">
                      <ThemeIcon
                        size={60}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        }}
                      >
                        <item.icon size={28} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text fw={700} size="xl" style={{ color: '#1F4FD8' }}>
                          {item.title}
                        </Text>
                        <Text fw={600} size="sm" style={{ color: '#0A1A3F' }}>
                          {item.subtitle}
                        </Text>
                      </Box>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        {item.description}
                      </Text>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* AI SEO Section - NEW */}
        <Box
          component="section"
          py={100}
          style={{
            background: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={aiSeoRef}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: 500,
              height: 500,
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <Container size="xl" style={{ position: 'relative' }}>
            <motion.div
              initial="initial"
              animate={aiSeoInView ? 'animate' : 'initial'}
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
                    The Future is Here
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
                    SEO for the AI Era
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={750} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                    Search is changing. More people are asking ChatGPT, Gemini, and other AI assistants for 
                    recommendations. <strong style={{ color: '#FFFFFF' }}>"What&apos;s the best web developer in Austin?"</strong> or 
                    <strong style={{ color: '#FFFFFF' }}> "Find me a reliable SEO agency."</strong> We make sure AI recommends YOUR business.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {aiSeoFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={aiSeoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 20,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      height: '100%',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Group gap="lg" align="flex-start">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <feature.icon size={24} color="#4DA3FF" stroke={1.5} />
                      </ThemeIcon>
                      <Box style={{ flex: 1 }}>
                        <Title order={3} size="h4" mb="xs" style={{ color: '#FFFFFF' }}>
                          {feature.title}
                        </Title>
                        <Text size="sm" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {feature.description}
                        </Text>
                      </Box>
                    </Group>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Services Section */}
        <Box
          component="section"
          id="services"
          py={100}
          style={{ background: '#FFFFFF' }}
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
                    What We Do For You
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
                    Complete SEO Services
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={650} style={{ color: '#5A7099' }}>
                    We handle everything—from making your site faster to creating content that ranks.
                    No jargon, just results you can see.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {seoServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#F8F9FB',
                      borderRadius: 20,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <Stack gap="lg">
                      <Group gap="md">
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
                            <service.icon size={28} color="#FFFFFF" stroke={1.5} />
                          </ThemeIcon>
                        </motion.div>
                        <Title order={3} size="h4" style={{ color: '#0A1A3F' }}>
                          {service.title}
                        </Title>
                      </Group>

                      <Text size="md" lh={1.7} style={{ color: '#5A7099' }}>
                        {service.description}
                      </Text>

                      <List
                        spacing="xs"
                        icon={
                          <ThemeIcon size={20} radius="xl" style={{ background: 'rgba(31, 79, 216, 0.1)' }}>
                            <IconCheck size={12} color="#1F4FD8" stroke={3} />
                          </ThemeIcon>
                        }
                      >
                        {service.features.map((feature) => (
                          <List.Item key={feature}>
                            <Text size="sm" style={{ color: '#5A7099' }}>
                              {feature}
                            </Text>
                          </List.Item>
                        ))}
                      </List>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Why Lucid - Authority Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={authorityRef}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={60}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={authorityInView ? { opacity: 1, x: 0 } : {}}
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
                      Why We&apos;re Different
                    </Badge>
                    <Title
                      order={2}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                        fontWeight: 700,
                        color: '#0A1A3F',
                      }}
                    >
                      Software Engineers Who Understand Search
                    </Title>
                  </Box>

                  <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                    Most SEO agencies are marketers who hire developers. We&apos;re the opposite: 
                    <strong> software engineers who mastered SEO.</strong> This means we can fix problems 
                    other agencies can&apos;t even identify.
                  </Text>

                  <Stack gap="md">
                    {[
                      'We build SEO into websites from day one—not bolt it on after',
                      'We understand the technical side other agencies miss',
                      'We optimize for AI assistants, not just Google',
                      'We measure everything—you see exactly what\'s working',
                      'We explain things in plain English, no confusing jargon',
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={authorityInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Group gap="sm">
                          <Box
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <IconCheck size={14} color="#FFFFFF" stroke={3} />
                          </Box>
                          <Text size="md" style={{ color: '#0A1A3F' }}>
                            {item}
                          </Text>
                        </Group>
                      </motion.div>
                    ))}
                  </Stack>
                </Stack>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={authorityInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    boxShadow: '0 20px 60px rgba(10, 26, 63, 0.08)',
                    border: '1px solid rgba(10, 26, 63, 0.06)',
                  }}
                >
                  <Stack gap="lg">
                    <Group justify="space-between">
                      <Text size="sm" fw={600} tt="uppercase" style={{ color: '#8A9BB8', letterSpacing: '1px' }}>
                        Our Expertise
                      </Text>
                      <IconCode size={20} color="#1F4FD8" />
                    </Group>
                    <Divider color="rgba(10, 26, 63, 0.06)" />
                    
                    <Box>
                      <Text fw={600} mb="xs" style={{ color: '#0A1A3F' }}>
                        Traditional SEO
                      </Text>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        Google rankings, technical optimization, content strategy, link building—we&apos;ve been 
                        doing this for years with proven results.
                      </Text>
                    </Box>

                    <Divider color="rgba(10, 26, 63, 0.06)" />

                    <Box>
                      <Group gap="xs" mb="xs">
                        <Text fw={600} style={{ color: '#0A1A3F' }}>
                          AI-Era SEO
                        </Text>
                        <Badge size="xs" color="blue" variant="light">New</Badge>
                      </Group>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        We&apos;re pioneers in optimizing for ChatGPT, Gemini, and AI assistants. As AI 
                        becomes how people search, you need to be ready. We&apos;ll get you there.
                      </Text>
                    </Box>

                    <Divider color="rgba(10, 26, 63, 0.06)" />

                    <Box>
                      <Text fw={600} mb="xs" style={{ color: '#0A1A3F' }}>
                        Technical Excellence
                      </Text>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        Perfect Lighthouse scores, blazing-fast sites, clean code. We fix issues other 
                        agencies don&apos;t even know exist.
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              </motion.div>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Process Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
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
                    Simple Process
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
                    How We Get You Results
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={600} style={{ color: '#5A7099' }}>
                    No mystery, no confusion. Here&apos;s exactly how we work together to grow your business.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: index === 0 ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)' : '#F8F9FB',
                      borderRadius: 20,
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Text
                      fw={800}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 15,
                        fontSize: '4rem',
                        opacity: index === 0 ? 0.15 : 0.08,
                        color: index === 0 ? '#FFFFFF' : '#1F4FD8',
                        lineHeight: 1,
                      }}
                    >
                      {step.number}
                    </Text>
                    <Stack gap="md" style={{ position: 'relative' }}>
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ThemeIcon
                          size={50}
                          radius="xl"
                          style={{
                            background: index === 0 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(31, 79, 216, 0.1)',
                          }}
                        >
                          <step.icon size={24} color={index === 0 ? '#FFFFFF' : '#1F4FD8'} stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                      <Title
                        order={3}
                        size="h4"
                        style={{ color: index === 0 ? '#FFFFFF' : '#0A1A3F' }}
                      >
                        {step.title}
                      </Title>
                      <Text
                        size="sm"
                        lh={1.7}
                        style={{ color: index === 0 ? 'rgba(255, 255, 255, 0.85)' : '#5A7099' }}
                      >
                        {step.description}
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
          id="contact"
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
                  Free SEO Report
                </Badge>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Find Out Why You&apos;re Not Ranking
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  Get a free analysis showing exactly where your website stands in search results, 
                  what&apos;s holding you back, and the specific steps to start ranking higher.
                </Text>

                <Group gap="md" mt="md">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <RequestReportButton reportType="seo" size="lg" variant="white">
                      Request Free SEO Report
                    </RequestReportButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/"
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
                      Back to Home
                    </Button>
                  </motion.div>
                </Group>

                <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }} mt="lg">
                  Takes 2 minutes • No credit card needed • Results within 48 hours
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
