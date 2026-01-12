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
  Breadcrumbs,
  Anchor,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IconArrowRight,
  IconArrowLeft,
  IconTarget,
  IconBulb,
  IconRocket,
  IconCheck,
  IconQuote,
  IconMapPin,
  IconBriefcase,
  IconCode,
  IconChartLine,
  IconClock,
  IconTool,
  IconExternalLink,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';
import { trackEvent, EVENTS } from '@/lib/analytics';
import { urlFor, SanityCaseStudy } from '@/lib/sanity';

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

const processIcons = [IconBulb, IconCode, IconRocket, IconChartLine];

function MetricCard({ metric, index }: { metric: { value: string; label: string }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        p="xl"
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid rgba(10, 26, 63, 0.06)',
          boxShadow: '0 4px 20px rgba(10, 26, 63, 0.06)',
          textAlign: 'center',
          height: '100%',
        }}
      >
        <Text
          fw={700}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
          }}
        >
          {metric.value}
        </Text>
        <Text size="sm" fw={500} style={{ color: '#5A7099' }}>
          {metric.label}
        </Text>
      </Box>
    </motion.div>
  );
}

function ProcessPhase({ 
  phase, 
  index, 
  total 
}: { 
  phase: { phaseName: string; description?: string }; 
  index: number; 
  total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = processIcons[index % processIcons.length];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Group align="flex-start" gap="lg" wrap="nowrap">
        <Stack align="center" gap={0}>
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
              <Icon size={28} color="#FFFFFF" stroke={1.5} />
            </ThemeIcon>
          </motion.div>
          {index < total - 1 && (
            <Box
              style={{
                width: 2,
                height: 60,
                background: 'linear-gradient(180deg, #1F4FD8 0%, rgba(31, 79, 216, 0.1) 100%)',
                marginTop: 12,
              }}
            />
          )}
        </Stack>
        <Box style={{ flex: 1 }}>
          <Badge
            size="sm"
            mb="xs"
            style={{
              background: 'rgba(31, 79, 216, 0.08)',
              color: '#1F4FD8',
            }}
          >
            Phase {index + 1}
          </Badge>
          <Title order={4} mb="xs" style={{ color: '#0A1A3F' }}>
            {phase.phaseName}
          </Title>
          {phase.description && (
            <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
              {phase.description}
            </Text>
          )}
        </Box>
      </Group>
    </motion.div>
  );
}

interface CaseStudyContentProps {
  caseStudy: SanityCaseStudy;
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const heroRef = useRef(null);
  const challengeRef = useRef(null);
  const solutionRef = useRef(null);
  const resultsRef = useRef(null);
  const processRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const challengeInView = useInView(challengeRef, { once: true, margin: '-100px' });
  const solutionInView = useInView(solutionRef, { once: true, margin: '-100px' });
  const resultsInView = useInView(resultsRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const testimonialInView = useInView(testimonialRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  useEffect(() => {
    trackEvent(EVENTS.CASE_STUDY_VIEW, { 
      study: caseStudy.title, 
      industry: caseStudy.clientIndustry || caseStudy.industry || 'Unknown',
      source: 'detail_page'
    });
  }, [caseStudy.title, caseStudy.clientIndustry, caseStudy.industry]);

  const imageUrl = caseStudy.image?.asset?._ref 
    ? urlFor(caseStudy.image).width(1200).height(600).quality(90).url()
    : null;

  const oldWebsiteScreenshotUrl = caseStudy.oldWebsiteScreenshot?.asset?._ref 
    ? urlFor(caseStudy.oldWebsiteScreenshot).width(960).height(600).quality(85).url()
    : null;

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Case Studies', href: '/case-studies' },
    { title: caseStudy.client, href: null },
  ];

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <Box
          component="section"
          pt={140}
          pb={80}
          style={{
            background: caseStudy.gradient || 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={heroRef}
        >
          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: 600,
              height: 600,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-15%',
              width: 500,
              height: 500,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <Container size="xl" style={{ position: 'relative' }}>
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <Breadcrumbs
                mb="xl"
                styles={{
                  breadcrumb: { color: 'rgba(255, 255, 255, 0.7)' },
                  separator: { color: 'rgba(255, 255, 255, 0.5)' },
                }}
              >
                {breadcrumbItems.map((item, index) => (
                  item.href ? (
                    <Anchor
                      key={index}
                      component={Link}
                      href={item.href}
                      style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {item.title}
                    </Anchor>
                  ) : (
                    <Text key={index} style={{ color: '#FFFFFF' }}>
                      {item.title}
                    </Text>
                  )
                ))}
              </Breadcrumbs>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60} style={{ alignItems: 'center' }}>
              {/* Left - Content */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate={heroInView ? 'animate' : 'initial'}
              >
                <Stack gap="lg">
                  <motion.div variants={fadeInUp}>
                    <Group gap="sm" mb="md">
                      {caseStudy.featured && (
                        <Badge
                          size="md"
                          style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: '#FFFFFF',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                          }}
                        >
                          Featured Project
                        </Badge>
                      )}
                      <Badge
                        size="md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          color: '#FFFFFF',
                        }}
                      >
                        {caseStudy.clientIndustry || caseStudy.industry}
                      </Badge>
                    </Group>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Title
                      order={1}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        lineHeight: 1.15,
                      }}
                    >
                      {caseStudy.title}
                    </Title>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Text size="xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {caseStudy.client}
                    </Text>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Text size="lg" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {caseStudy.description}
                    </Text>
                  </motion.div>

                  {/* Meta info */}
                  <motion.div variants={fadeInUp}>
                    <Group gap="xl" mt="md">
                      {caseStudy.clientLocation && (
                        <Group gap="xs">
                          <IconMapPin size={18} color="rgba(255, 255, 255, 0.7)" />
                          <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {caseStudy.clientLocation}
                          </Text>
                        </Group>
                      )}
                      {caseStudy.timeline && (
                        <Group gap="xs">
                          <IconClock size={18} color="rgba(255, 255, 255, 0.7)" />
                          <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {caseStudy.timeline}
                          </Text>
                        </Group>
                      )}
                    </Group>
                  </motion.div>

                  {/* Services */}
                  {caseStudy.services && caseStudy.services.length > 0 && (
                    <motion.div variants={fadeInUp}>
                      <Group gap="xs" mt="md">
                        {caseStudy.services.map((service) => (
                          <Badge
                            key={service}
                            size="md"
                            style={{
                              background: 'rgba(255, 255, 255, 0.1)',
                              color: '#FFFFFF',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                          >
                            {service}
                          </Badge>
                        ))}
                      </Group>
                    </motion.div>
                  )}

                  {/* Visit Site Button */}
                  {caseStudy.newSiteUrl && (
                    <motion.div variants={fadeInUp}>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          component="a"
                          href={caseStudy.newSiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="lg"
                          radius="xl"
                          mt="md"
                          rightSection={<IconExternalLink size={18} />}
                          onClick={() => trackEvent(EVENTS.CASE_STUDY_EXTERNAL_LINK, {
                            study: caseStudy.title,
                            url: caseStudy.newSiteUrl || '',
                          })}
                          styles={{
                            root: {
                              background: 'rgba(255, 255, 255, 0.15)',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              color: '#FFFFFF',
                              backdropFilter: 'blur(10px)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.25)',
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                            },
                          }}
                        >
                          Visit Live Site
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </Stack>
              </motion.div>

              {/* Right - Image */}
              {imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box
                    style={{
                      borderRadius: 24,
                      overflow: 'hidden',
                      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={caseStudy.image?.alt || caseStudy.title}
                      width={1200}
                      height={600}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      priority
                    />
                  </Box>
                </motion.div>
              )}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Results / Metrics Section */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <Box
            component="section"
            py={80}
            style={{ background: '#F8F9FB' }}
            ref={resultsRef}
          >
            <Container size="xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Stack align="center" gap="lg" mb={50}>
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
                    Results
                  </Badge>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                    }}
                  >
                    The Impact We Made
                  </Title>
                  {caseStudy.resultsSummary && (
                    <Text size="lg" ta="center" maw={700} style={{ color: '#5A7099' }}>
                      {caseStudy.resultsSummary}
                    </Text>
                  )}
                </Stack>
              </motion.div>

              <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
                {caseStudy.metrics.map((metric, index) => (
                  <MetricCard key={metric.label} metric={metric} index={index} />
                ))}
              </SimpleGrid>
            </Container>
          </Box>
        )}

        {/* Project Goals Section */}
        {caseStudy.projectGoals && caseStudy.projectGoals.length > 0 && (
          <Box
            component="section"
            py={80}
            style={{ background: '#FFFFFF' }}
          >
            <Container size="lg">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Stack align="center" gap="lg" mb={50}>
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
                    <IconTarget size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                    Project Goals
                  </Badge>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                    }}
                  >
                    What We Set Out to Achieve
                  </Title>
                </Stack>
              </motion.div>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                {caseStudy.projectGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Group align="flex-start" gap="md" wrap="nowrap">
                      <ThemeIcon
                        size={32}
                        radius="xl"
                        style={{
                          background: goal.isPrimary 
                            ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)'
                            : 'rgba(31, 79, 216, 0.08)',
                          color: goal.isPrimary ? '#FFFFFF' : '#1F4FD8',
                          flexShrink: 0,
                        }}
                      >
                        <IconCheck size={18} stroke={2} />
                      </ThemeIcon>
                      <Box>
                        {goal.isPrimary && (
                          <Badge size="xs" mb={4} style={{ background: '#1F4FD8', color: '#FFFFFF' }}>
                            Primary Goal
                          </Badge>
                        )}
                        <Text size="md" lh={1.6} style={{ color: '#0A1A3F' }}>
                          {goal.goal}
                        </Text>
                      </Box>
                    </Group>
                  </motion.div>
                ))}
              </SimpleGrid>
            </Container>
          </Box>
        )}

        {/* Challenge Section */}
        {caseStudy.challenge && (
          <Box
            component="section"
            py={80}
            style={{ background: '#F8F9FB' }}
            ref={challengeRef}
          >
            <Container size="lg">
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={challengeInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Badge
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    fw={600}
                    mb="lg"
                    style={{
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    <IconBriefcase size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                    The Challenge
                  </Badge>
                  <Title
                    order={2}
                    mb="xl"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                      lineHeight: 1.2,
                    }}
                  >
                    Understanding the Problem
                  </Title>
                  <Text size="lg" lh={1.9} style={{ color: '#5A7099' }}>
                    {caseStudy.challenge}
                  </Text>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={challengeInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {oldWebsiteScreenshotUrl ? (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 480,
                      }}
                    >
                      <Text
                        size="xs"
                        fw={600}
                        tt="uppercase"
                        mb="sm"
                        ta="center"
                        style={{ color: '#5A7099', letterSpacing: '1px' }}
                      >
                        Old Website
                      </Text>
                      <Box
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          boxShadow: '0 10px 40px rgba(10, 26, 63, 0.15)',
                          border: '1px solid rgba(10, 26, 63, 0.1)',
                        }}
                      >
                        <Image
                          src={oldWebsiteScreenshotUrl}
                          alt={caseStudy.oldWebsiteScreenshot?.alt || `${caseStudy.client} old website`}
                          width={960}
                          height={600}
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 400,
                        aspectRatio: '1',
                        background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.05) 0%, rgba(77, 163, 255, 0.1) 100%)',
                        borderRadius: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ThemeIcon
                          size={120}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            boxShadow: '0 20px 40px rgba(31, 79, 216, 0.3)',
                          }}
                        >
                          <IconBriefcase size={60} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                    </Box>
                  )}
                </motion.div>
              </SimpleGrid>
            </Container>
          </Box>
        )}

        {/* Solution Section */}
        {caseStudy.solution && (
          <Box
            component="section"
            py={80}
            style={{ background: '#FFFFFF' }}
            ref={solutionRef}
          >
            <Container size="lg">
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    order: 2,
                  }}
                  className="solution-icon-mobile"
                >
                  <Box
                    style={{
                      width: '100%',
                      maxWidth: 400,
                      aspectRatio: '1',
                      background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.05) 0%, rgba(77, 163, 255, 0.1) 100%)',
                      borderRadius: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ThemeIcon
                        size={120}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          boxShadow: '0 20px 40px rgba(31, 79, 216, 0.3)',
                        }}
                      >
                        <IconBulb size={60} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                    </motion.div>
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  style={{ order: 1 }}
                >
                  <Badge
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    fw={600}
                    mb="lg"
                    style={{
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    <IconBulb size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                    Our Solution
                  </Badge>
                  <Title
                    order={2}
                    mb="xl"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                      lineHeight: 1.2,
                    }}
                  >
                    How We Solved It
                  </Title>
                  <Text size="lg" lh={1.9} style={{ color: '#5A7099' }}>
                    {caseStudy.solution}
                  </Text>
                </motion.div>
              </SimpleGrid>
            </Container>
          </Box>
        )}

        {/* Process / Approach Section */}
        {caseStudy.processApproach && caseStudy.processApproach.length > 0 && (
          <Box
            component="section"
            py={80}
            style={{ background: '#F8F9FB' }}
            ref={processRef}
          >
            <Container size="lg">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Stack align="center" gap="lg" mb={50}>
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
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                    }}
                  >
                    How We Got There
                  </Title>
                </Stack>
              </motion.div>

              <Box maw={600} mx="auto">
                <Stack gap="xl">
                  {caseStudy.processApproach.map((phase, index) => (
                    <ProcessPhase
                      key={index}
                      phase={phase}
                      index={index}
                      total={caseStudy.processApproach!.length}
                    />
                  ))}
                </Stack>
              </Box>
            </Container>
          </Box>
        )}

        {/* Tech Stack Section */}
        {caseStudy.techStack && caseStudy.techStack.length > 0 && (
          <Box
            component="section"
            py={80}
            style={{ background: '#FFFFFF' }}
          >
            <Container size="lg">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
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
                    <IconTool size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                    Technology Stack
                  </Badge>
                  <Title
                    order={2}
                    ta="center"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#0A1A3F',
                    }}
                  >
                    Built With Modern Tools
                  </Title>
                </Stack>
              </motion.div>

              <Group justify="center" gap="md">
                {caseStudy.techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      size="xl"
                      radius="md"
                      style={{
                        background: '#F8F9FB',
                        color: '#0A1A3F',
                        border: '1px solid rgba(10, 26, 63, 0.1)',
                        padding: '12px 20px',
                        fontSize: '0.9rem',
                      }}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </Group>
            </Container>
          </Box>
        )}

        {/* Testimonial Section */}
        {caseStudy.testimonial && (
          <Box
            component="section"
            py={100}
            style={{
              background: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
            ref={testimonialRef}
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
                initial={{ opacity: 0, y: 40 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Stack align="center" gap="xl" ta="center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={testimonialInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                  >
                    <ThemeIcon
                      size={80}
                      radius="xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <IconQuote size={40} color="#FFFFFF" />
                    </ThemeIcon>
                  </motion.div>

                  <Text
                    size="xl"
                    fw={500}
                    lh={1.7}
                    style={{ color: '#FFFFFF' }}
                    maw={700}
                  >
                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                  </Text>

                  <Box>
                    <Text fw={700} size="lg" style={{ color: '#FFFFFF' }}>
                      {caseStudy.testimonial.author}
                    </Text>
                    <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {caseStudy.testimonial.role}
                    </Text>
                  </Box>
                </Stack>
              </motion.div>
            </Container>
          </Box>
        )}

        {/* CTA Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={ctaRef}
        >
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
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
                    background: 'rgba(31, 79, 216, 0.08)',
                    color: '#1F4FD8',
                    border: '1px solid rgba(31, 79, 216, 0.15)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Ready to Start?
                </Badge>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#0A1A3F',
                  }}
                >
                  {caseStudy.callToAction?.text || 'Want Similar Results for Your Business?'}
                </Title>

                <Text size="lg" maw={600} style={{ color: '#5A7099' }} lh={1.8}>
                  Let&apos;s discuss how we can help you achieve transformative growth. 
                  Book a free consultation and get a personalized strategy.
                </Text>

                <Group gap="md" mt="md">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href={caseStudy.callToAction?.linkUrl || '/contact'}
                      size="xl"
                      radius="xl"
                      rightSection={<IconArrowRight size={20} />}
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          border: 'none',
                          boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            boxShadow: '0 6px 25px rgba(77, 163, 255, 0.4)',
                          },
                        },
                      }}
                    >
                      {caseStudy.callToAction?.linkText || 'Start Your Project'}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/case-studies"
                      size="xl"
                      radius="xl"
                      variant="outline"
                      leftSection={<IconArrowLeft size={20} />}
                      styles={{
                        root: {
                          borderColor: 'rgba(31, 79, 216, 0.3)',
                          color: '#1F4FD8',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'rgba(31, 79, 216, 0.05)',
                            borderColor: '#1F4FD8',
                          },
                        },
                      }}
                    >
                      View More Case Studies
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
