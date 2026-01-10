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
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  IconArrowRight,
  IconCheck,
  IconBolt,
  IconRocket,
  IconGauge,
  IconDeviceMobile,
  IconPhoto,
  IconAccessible,
  IconCode,
  IconBrandGoogle,
  IconRobot,
  IconMessageChatbot,
  IconBrain,
  IconSparkles,
} from '@tabler/icons-react';
import { Navigation, Footer, AIQueryDemo } from '@/components';

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

const lighthouseCategories = [
  {
    name: 'Performance',
    score: 100,
    color: '#0CCE6B',
    description: 'How fast your site loads for visitors',
    improvements: [
      'Faster page loads',
      'Optimized images',
      'Efficient code',
      'Quick interactions',
    ],
  },
  {
    name: 'Accessibility',
    score: 100,
    color: '#0CCE6B',
    description: 'Everyone can use your site, including those with disabilities',
    improvements: [
      'Screen reader friendly',
      'Keyboard navigation',
      'Readable text',
      'Clear buttons',
    ],
  },
  {
    name: 'Best Practices',
    score: 100,
    color: '#0CCE6B',
    description: 'Modern, secure, and reliable website standards',
    improvements: [
      'Secure connection',
      'Modern technology',
      'No errors',
      'Works everywhere',
    ],
  },
  {
    name: 'SEO',
    score: 100,
    color: '#0CCE6B',
    description: 'How easily Google can find and understand your site',
    improvements: [
      'Clear page titles',
      'Proper descriptions',
      'Organized content',
      'Mobile friendly',
    ],
  },
];

const services = [
  {
    icon: IconGauge,
    title: 'Speed Optimization',
    description:
      'Google prioritizes fast websites. If your site takes more than 3 seconds to load, half your visitors leave before seeing anything. We make sites load in under 2 seconds.',
  },
  {
    icon: IconCode,
    title: 'Technical Health Check',
    description:
      'We scan your entire website for problems: broken links, missing pages, duplicate content, and errors that confuse search engines. Then we fix them all.',
  },
  {
    icon: IconPhoto,
    title: 'Image Optimization',
    description:
      'Large images slow down your site dramatically. We compress and optimize every image so they look great but load instantly on any device.',
  },
  {
    icon: IconDeviceMobile,
    title: 'Mobile Optimization',
    description:
      'Over 60% of searches happen on phones. Google actually uses the mobile version of your site for rankings. We ensure yours works perfectly on every screen size.',
  },
  {
    icon: IconAccessible,
    title: 'Accessibility',
    description:
      'Making your site accessible isn\'t just good ethics—it\'s good SEO. Google rewards sites that everyone can use, including people using screen readers.',
  },
  {
    icon: IconRobot,
    title: 'AI-Ready Optimization',
    description:
      'ChatGPT, Gemini, and AI assistants are the new search. We structure your content so AI can understand and recommend your business to users.',
  },
];

const process = [
  {
    step: '01',
    title: 'Free Website Audit',
    description: 'We analyze your current site and show you exactly what\'s working and what\'s not. No technical jargon—just clear recommendations.',
  },
  {
    step: '02',
    title: 'Priority Roadmap',
    description: 'We create a clear plan starting with quick wins that make the biggest impact first. You\'ll see results fast.',
  },
  {
    step: '03',
    title: 'We Fix Everything',
    description: 'Our team handles all the technical work. You don\'t need to understand code—we take care of it all.',
  },
  {
    step: '04',
    title: 'Monitor & Improve',
    description: 'We track your progress, send you simple reports, and keep optimizing to ensure you stay ahead.',
  },
];

const results = [
  { metric: 'Average Score Improvement', value: '+45 points' },
  { metric: 'Typical Speed Boost', value: '3-5x faster' },
  { metric: 'Time to Complete', value: '2-4 weeks' },
];

export default function SEOServicesPage() {
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const lighthouseRef = useRef(null);
  const aiSeoRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whatIsInView = useInView(whatIsRef, { once: true, margin: '-100px' });
  const lighthouseInView = useInView(lighthouseRef, { once: true, margin: '-100px' });
  const aiSeoInView = useInView(aiSeoRef, { once: true, margin: '-100px' });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
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
              background: 'radial-gradient(circle, rgba(12, 206, 107, 0.08) 0%, transparent 70%)',
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
                      background: 'rgba(12, 206, 107, 0.1)',
                      color: '#0CCE6B',
                      border: '1px solid rgba(12, 206, 107, 0.2)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    Technical SEO Services
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
                    Make Your Website{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #0CCE6B 0%, #0A1A3F 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Fast, Findable & Future-Ready
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
                    A slow website loses customers. A website Google can&apos;t understand loses rankings.
                    We fix both—making your site lightning-fast and easy for search engines (and AI) to find.
                  </Text>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.6 }}
                >
                  <Group gap="xl" mt="md">
                    <Group gap="sm">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{
                          background: '#FFFFFF',
                          boxShadow: '0 4px 20px rgba(10, 26, 63, 0.1)',
                        }}
                      >
                        <IconBrandGoogle size={26} color="#0CCE6B" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={600} style={{ color: '#0A1A3F' }}>
                          Google Rankings
                        </Text>
                        <Text size="xs" style={{ color: '#8A9BB8' }}>
                          Get found first
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
                        <IconRobot size={26} color="#0CCE6B" stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={600} style={{ color: '#0A1A3F' }}>
                          AI Assistants
                        </Text>
                        <Text size="xs" style={{ color: '#8A9BB8' }}>
                          ChatGPT & Gemini ready
                        </Text>
                      </Box>
                    </Group>
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
                            background: 'linear-gradient(135deg, #0CCE6B 0%, #0A1A3F 100%)',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(12, 206, 107, 0.3)',
                          },
                        }}
                      >
                        Get Free Website Analysis
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        component={Link}
                        href="#what-is-lighthouse"
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
                        What Does This Mean?
                      </Button>
                    </motion.div>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* What is Lighthouse - Educational Section */}
        <Box
          component="section"
          id="what-is-lighthouse"
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
                        background: 'rgba(12, 206, 107, 0.1)',
                        color: '#0CCE6B',
                        border: '1px solid rgba(12, 206, 107, 0.2)',
                        letterSpacing: '1px',
                        fontSize: '0.7rem',
                        padding: '10px 16px',
                      }}
                    >
                      Let Us Explain
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
                      What is a &quot;Lighthouse Score&quot;?
                    </Title>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                      <strong>Google Lighthouse</strong> is like a report card for your website. Google created it 
                      to measure how good a website really is. It scores your site from 0-100 in four areas:
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                    <Stack gap="md">
                      {[
                        { label: 'Performance', desc: 'How fast does your site load?' },
                        { label: 'Accessibility', desc: 'Can everyone use it easily?' },
                        { label: 'Best Practices', desc: 'Is it secure and modern?' },
                        { label: 'SEO', desc: 'Can Google find and understand it?' },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        >
                          <Group gap="sm">
                            <Box
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #0CCE6B 0%, #0A1A3F 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <IconCheck size={14} color="#FFFFFF" stroke={3} />
                            </Box>
                            <Box>
                              <Text size="md" fw={600} style={{ color: '#0A1A3F' }}>
                                {item.label}
                              </Text>
                              <Text size="sm" style={{ color: '#5A7099' }}>
                                {item.desc}
                              </Text>
                            </Box>
                          </Group>
                        </motion.div>
                      ))}
                    </Stack>
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
                    <Stack gap="lg">
                      <Group justify="space-between">
                        <Text size="sm" fw={600} tt="uppercase" style={{ color: '#8A9BB8', letterSpacing: '1px' }}>
                          Why It Matters
                        </Text>
                        <IconBolt size={20} color="#0CCE6B" />
                      </Group>
                      <Divider color="rgba(10, 26, 63, 0.06)" />
                      
                      <Box>
                        <Text fw={600} mb="xs" style={{ color: '#0A1A3F' }}>
                          Google Uses These Scores to Rank You
                        </Text>
                        <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                          Higher scores = higher rankings = more customers finding you. Sites with perfect 
                          scores consistently outrank competitors.
                        </Text>
                      </Box>

                      <Divider color="rgba(10, 26, 63, 0.06)" />

                      <Box>
                        <Text fw={600} mb="xs" style={{ color: '#0A1A3F' }}>
                          Most Sites Score 50-70
                        </Text>
                        <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                          The average website has lots of room for improvement. We take sites from 
                          mediocre to perfect—and you&apos;ll see the difference in traffic and leads.
                        </Text>
                      </Box>

                      <Divider color="rgba(10, 26, 63, 0.06)" />

                      <Box>
                        <Text fw={600} mb="xs" style={{ color: '#0A1A3F' }}>
                          We Get Perfect 100s
                        </Text>
                        <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                          Our websites consistently score 100 across all categories. That&apos;s not 
                          marketing talk—you can test it yourself with Google&apos;s free tool.
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                </motion.div>
              </SimpleGrid>
            </motion.div>
          </Container>
        </Box>

        {/* Lighthouse Scores Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={lighthouseRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={lighthouseInView ? 'animate' : 'initial'}
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
                    Our Standard
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
                    Perfect Scores. Every Time.
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    We don&apos;t settle for &quot;good enough.&quot; Here&apos;s what we achieve for every client:
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
              {lighthouseCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={lighthouseInView ? { opacity: 1, y: 0 } : {}}
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
                    <Stack gap="lg">
                      {/* Score circle */}
                      <Box style={{ position: 'relative', width: 100, height: 100, margin: '0 auto' }}>
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="8"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={category.color}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={283}
                            initial={{ strokeDashoffset: 283 }}
                            animate={lighthouseInView ? { strokeDashoffset: 0 } : {}}
                            transition={{ duration: 1.5, delay: 0.3 + index * 0.2, ease: 'easeOut' }}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                          />
                        </svg>
                        <Box
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <Text fw={700} style={{ fontSize: '1.75rem', color: category.color }}>
                            {category.score}
                          </Text>
                        </Box>
                      </Box>

                      <Box ta="center">
                        <Title order={3} size="h4" mb={4} style={{ color: '#FFFFFF' }}>
                          {category.name}
                        </Title>
                        <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {category.description}
                        </Text>
                      </Box>

                      <Divider color="rgba(255, 255, 255, 0.1)" />

                      <Stack gap="xs">
                        {category.improvements.map((improvement) => (
                          <Group key={improvement} gap="xs">
                            <IconCheck size={14} color={category.color} stroke={3} />
                            <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {improvement}
                            </Text>
                          </Group>
                        ))}
                      </Stack>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>

            {/* Results stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={lighthouseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Box
                mt={60}
                p="xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                  {results.map((result, index) => (
                    <Box
                      key={result.metric}
                      ta="center"
                      py="md"
                      style={{
                        borderRight: index < results.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : undefined,
                      }}
                    >
                      <Text
                        fw={700}
                        style={{
                          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                          color: '#0CCE6B',
                          lineHeight: 1.2,
                          marginBottom: 8,
                        }}
                      >
                        {result.value}
                      </Text>
                      <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {result.metric}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* AI SEO Section */}
        <Box
          component="section"
          py={100}
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 100%)',
          }}
          ref={aiSeoRef}
        >
          <Container size="xl">
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
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    The Future of Search
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
                    Optimized for AI Assistants
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={750} style={{ color: '#5A7099' }} lh={1.8}>
                    More people are asking AI for recommendations. &quot;ChatGPT, find me a good web developer.&quot; 
                    &quot;Gemini, what&apos;s the best SEO agency?&quot; We ensure your business gets recommended.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            {/* AI Query Demo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={aiSeoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginBottom: 60 }}
            >
              <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl" style={{ alignItems: 'center' }}>
                <Box>
                  <AIQueryDemo isInView={aiSeoInView} />
                </Box>
                <Stack gap="lg" pl={{ base: 0, lg: 'xl' }}>
                  <Text size="sm" fw={600} tt="uppercase" style={{ color: '#1F4FD8', letterSpacing: '1px' }}>
                    Real AI Recommendations
                  </Text>
                  <Title order={3} style={{ color: '#0A1A3F', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    This is how AI recommends businesses
                  </Title>
                  <Text size="md" lh={1.8} style={{ color: '#5A7099' }}>
                    When someone asks ChatGPT, Gemini, or other AI assistants for recommendations, 
                    the AI pulls from its knowledge of structured data, reviews, and website content. 
                    <strong style={{ color: '#0A1A3F' }}> We optimize your site so AI understands exactly what you do 
                    and why customers should choose you.</strong>
                  </Text>
                  <Group gap="md" mt="sm">
                    {[
                      { label: 'Schema Markup', desc: 'Machine-readable data' },
                      { label: 'Clear Content', desc: 'AI-friendly structure' },
                      { label: 'Trust Signals', desc: 'Reviews & credentials' },
                    ].map((item) => (
                      <Box
                        key={item.label}
                        p="sm"
                        style={{
                          background: 'rgba(31, 79, 216, 0.05)',
                          borderRadius: 12,
                          border: '1px solid rgba(31, 79, 216, 0.1)',
                        }}
                      >
                        <Text size="xs" fw={600} style={{ color: '#1F4FD8' }}>{item.label}</Text>
                        <Text size="xs" style={{ color: '#8A9BB8' }}>{item.desc}</Text>
                      </Box>
                    ))}
                  </Group>
                </Stack>
              </SimpleGrid>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {[
                {
                  icon: IconMessageChatbot,
                  title: 'ChatGPT & Gemini Ready',
                  description: 'AI assistants pull information from the web to answer questions. We structure your site so AI understands and recommends your business.',
                },
                {
                  icon: IconBrain,
                  title: 'Structured Data',
                  description: 'We add special code that tells AI exactly what your business does, where you\'re located, and why customers love you.',
                },
                {
                  icon: IconSparkles,
                  title: 'Future-Proof',
                  description: 'As AI search grows (it\'s up 40% this year), businesses optimized for AI will dominate. We get you ready today.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={aiSeoInView ? { opacity: 1, y: 0 } : {}}
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
                    <Stack gap="md" align="center" ta="center">
                      <ThemeIcon
                        size={60}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        }}
                      >
                        <item.icon size={28} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                      <Title order={3} size="h4" style={{ color: '#0A1A3F' }}>
                        {item.title}
                      </Title>
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
                    What We Fix
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
                    Everything That&apos;s Holding You Back
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
                            background: 'linear-gradient(135deg, #0CCE6B 0%, #0A1A3F 100%)',
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
                    </Stack>
                  </Box>
                </motion.div>
              ))}
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
                    How It Works
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
                    From Slow to Perfect in 4 Steps
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
                      background: index === 0 ? 'linear-gradient(135deg, #0CCE6B 0%, #0A1A3F 100%)' : '#F8F9FB',
                      borderRadius: 20,
                      border: index === 0 ? 'none' : '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                      position: 'relative',
                      boxShadow: index === 0 ? '0 10px 30px rgba(12, 206, 107, 0.25)' : undefined,
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
                        color: index === 0 ? '#FFFFFF' : '#0CCE6B',
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
            background: 'linear-gradient(135deg, #0A1A3F 0%, #0CCE6B 150%)',
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
                  Find Out How Your Site Really Scores
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.85)' }} lh={1.8}>
                  Get a free, no-obligation analysis of your website. We&apos;ll show you your current scores, 
                  what&apos;s slowing you down, and exactly how to fix it.
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
                      Get My Free Analysis
                    </Button>
                  </motion.div>
                </Group>

                <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Takes 2 minutes • No credit card • Results in 24 hours
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
