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
} from '@mantine/core';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IconArrowRight,
  IconCode,
  IconDeviceMobile,
  IconShoppingCart,
  IconSearch,
  IconChartLine,
  IconTrendingUp,
  IconUsers,
  IconClock,
  IconStar,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';
import { trackEvent, EVENTS } from '@/lib/analytics';
import { urlFor } from '@/lib/sanity';
import type { SanityCaseStudy } from '@/lib/sanity';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const categories = [
  { value: 'all', label: 'All Projects', icon: IconStar },
  { value: 'web', label: 'Web Development', icon: IconCode },
  { value: 'mobile', label: 'Mobile Apps', icon: IconDeviceMobile },
  { value: 'ecommerce', label: 'E-Commerce', icon: IconShoppingCart },
  { value: 'seo', label: 'SEO & Marketing', icon: IconSearch },
];

const overallStats = [
  { value: '$12M+', label: 'Revenue Generated for Clients', icon: IconTrendingUp },
  { value: '340%', label: 'Average Traffic Increase', icon: IconUsers },
  { value: '98%', label: 'Client Satisfaction Rate', icon: IconStar },
  { value: '4.2x', label: 'Average ROI', icon: IconChartLine },
];

interface CaseStudyCardProps {
  study: SanityCaseStudy;
  index: number;
}

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get image URL from Sanity
  const imageUrl = study.image?.asset?._ref 
    ? urlFor(study.image).width(600).height(400).quality(85).url()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: '100%' }}
    >
      <Box
        style={{
          background: '#FFFFFF',
          borderRadius: 24,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(10, 26, 63, 0.06)',
          boxShadow: isHovered
            ? '0 25px 60px rgba(10, 26, 63, 0.15)'
            : '0 4px 20px rgba(10, 26, 63, 0.06)',
          transform: isHovered ? 'translateY(-12px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Image/Header */}
        <Box
          style={{
            background: study.gradient || 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
            height: imageUrl ? 'auto' : 200,
            minHeight: 200,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Featured Image */}
          {imageUrl && (
            <Box
              style={{
                position: 'relative',
                width: '100%',
                padding: 12,
              }}
            >
              <Box
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Image
                  src={imageUrl}
                  alt={study.image?.alt || study.title}
                  width={600}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                  }}
                />
              </Box>
            </Box>
          )}
          
          {/* Industry badge */}
          <Badge
            size="sm"
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'rgba(0, 0, 0, 0.4)',
              color: '#FFFFFF',
              backdropFilter: 'blur(10px)',
              zIndex: 10,
            }}
          >
            {study.clientIndustry || study.industry}
          </Badge>

          {study.featured && (
            <Badge
              size="md"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#1F4FD8',
                fontWeight: 600,
                zIndex: 10,
              }}
            >
              Featured
            </Badge>
          )}

          {/* Floating metrics preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              zIndex: 10,
            }}
          >
            <Group gap="xs">
              {study.metrics?.slice(0, 2).map((metric) => (
                <Badge
                  key={metric.label}
                  size="sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#0A1A3F',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {metric.value} {metric.label}
                </Badge>
              ))}
            </Group>
          </motion.div>
        </Box>

        {/* Content */}
        <Stack p="xl" gap="md" style={{ flexGrow: 1 }}>
          <Box>
            <Text size="sm" fw={500} style={{ color: '#8A9BB8' }} mb={4}>
              {study.client || study.title}
            </Text>
            <Title order={4} style={{ color: '#0A1A3F' }}>
              {study.title}
            </Title>
          </Box>

          <Text size="sm" lh={1.6} style={{ color: '#5A7099', flexGrow: 1 }}>
            {study.description}
          </Text>

          {/* Services */}
          <Group gap="xs">
            {study.services?.slice(0, 3).map((service) => (
              <Badge
                key={service}
                size="sm"
                variant="light"
                style={{
                  background: 'rgba(31, 79, 216, 0.06)',
                  color: '#1F4FD8',
                }}
              >
                {service}
              </Badge>
            ))}
          </Group>

          {/* CTA */}
          <Group justify="space-between" align="center" mt="auto">
            <Group gap="xs">
              <IconClock size={14} color="#8A9BB8" />
              <Text size="xs" style={{ color: '#8A9BB8' }}>{study.timeline}</Text>
            </Group>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              onClick={() => trackEvent(EVENTS.CASE_STUDY_VIEW, { study: study.title, industry: study.clientIndustry || study.industry || 'Unknown' })}
            >
              <Link
                href={`/case-studies/${study.slug?.current || study._id}`}
                style={{ textDecoration: 'none' }}
              >
                <Group gap={4} style={{ cursor: 'pointer' }}>
                  <Text size="sm" fw={600} style={{ color: '#1F4FD8' }}>
                    View Case Study
                  </Text>
                  <IconArrowRight size={16} color="#1F4FD8" />
                </Group>
              </Link>
            </motion.div>
          </Group>
        </Stack>
      </Box>
    </motion.div>
  );
}

function FeaturedCaseStudy({ study }: { study: SanityCaseStudy }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Get image URL from Sanity
  const imageUrl = study.image?.asset?._ref 
    ? urlFor(study.image).width(800).height(500).quality(90).url()
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        p={{ base: 'xl', md: 60 }}
        style={{
          background: study.gradient || 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
          borderRadius: 32,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
          {/* Left - Info */}
          <Stack gap="xl">
            <Box>
              <Badge
                size="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                mb="md"
              >
                Featured Project
              </Badge>
              <Title
                order={2}
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                }}
              >
                {study.title}
              </Title>
              <Text size="lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }} mt="xs">
                {study.clientIndustry || study.industry}
              </Text>
            </Box>

            <Text size="lg" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {study.description}
            </Text>

            {/* Metrics */}
            <SimpleGrid cols={3} spacing="md">
              {study.metrics?.slice(0, 3).map((metric) => (
                <Box key={metric.label}>
                  <Text
                    fw={700}
                    style={{ color: '#FFFFFF', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                  >
                    {metric.value}
                  </Text>
                  <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {metric.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            {/* Services */}
            <Group gap="xs">
              {study.services?.map((service) => (
                <Badge
                  key={service}
                  size="md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {service}
                </Badge>
              ))}
            </Group>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                component={Link}
                href={`/case-studies/${study.slug?.current || study._id}`}
                size="lg"
                radius="xl"
                rightSection={<IconArrowRight size={18} />}
                onClick={() => trackEvent(EVENTS.CASE_STUDY_VIEW, { study: study.title, source: 'featured' })}
                styles={{
                  root: {
                    background: '#FFFFFF',
                    color: '#1F4FD8',
                    border: 'none',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.9)',
                    },
                  },
                }}
              >
                View Full Case Study
              </Button>
            </motion.div>
          </Stack>

          {/* Right - Image or Testimonial */}
          <Stack justify="center" gap="xl">
            {/* Featured Image */}
            {imageUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={study.image?.alt || study.title}
                    width={800}
                    height={500}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
              </motion.div>
            )}
            
            {/* Testimonial */}
            {study.testimonial && (
              <Box
                p="xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 24,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Text
                  size="lg"
                  fw={500}
                  lh={1.6}
                  style={{ color: '#FFFFFF' }}
                  mb="lg"
                >
                  &ldquo;{study.testimonial.quote}&rdquo;
                </Text>
                <Group>
                  <Box
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text fw={600} style={{ color: '#FFFFFF' }}>
                      {study.testimonial.author.charAt(0)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} style={{ color: '#FFFFFF' }}>
                      {study.testimonial.author}
                    </Text>
                    <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {study.testimonial.role}
                    </Text>
                  </Box>
                </Group>
              </Box>
            )}
          </Stack>
        </SimpleGrid>
      </Box>
    </motion.div>
  );
}

interface CaseStudiesContentProps {
  caseStudies: SanityCaseStudy[];
}

export function CaseStudiesContent({ caseStudies }: CaseStudiesContentProps) {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStudies = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter((study) => study.category === activeCategory);

  const featuredStudy = caseStudies.find((s) => s.featured);
  
  const hasCaseStudies = caseStudies.length > 0;

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <Box
        component="section"
        pt={160}
        pb={80}
        ref={heroRef}
        style={{
          background: 'linear-gradient(180deg, #F8F9FB 0%, #FFFFFF 100%)',
        }}
      >
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <Stack align="center" gap="lg" mb={hasCaseStudies ? 60 : 0}>
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
                Case Studies
              </Badge>
              <Title
                order={1}
                ta="center"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: '#0A1A3F',
                }}
              >
                Real Results for{' '}
                <Text component="span" inherit className="metallic-text">
                  Real Businesses
                </Text>
              </Title>
              <Text
                size="xl"
                ta="center"
                maw={700}
                style={{ color: '#5A7099' }}
              >
                {hasCaseStudies 
                  ? "Discover how we've helped businesses transform their digital presence and achieve measurable growth through strategic design and development."
                  : "We're currently working with amazing clients on exciting projects. Check back soon to see our success stories!"
                }
              </Text>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Only show stats, featured, and grid sections if we have case studies */}
      {hasCaseStudies && (
        <>
          {/* Stats Section */}
          <Box component="section" py={60} style={{ background: '#FFFFFF' }}>
            <Container size="xl">
              <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
                {overallStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Stack align="center" gap="xs">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{
                          background: 'rgba(31, 79, 216, 0.08)',
                          color: '#1F4FD8',
                        }}
                      >
                        <stat.icon size={24} />
                      </ThemeIcon>
                      <Text
                        fw={700}
                        style={{
                          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                          color: '#0A1A3F',
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
            </Container>
          </Box>

          {/* Featured Case Study */}
          {featuredStudy && (
            <Box component="section" py={60} style={{ background: '#FFFFFF' }}>
              <Container size="xl">
                <FeaturedCaseStudy study={featuredStudy} />
              </Container>
            </Box>
          )}

          {/* Case Studies Grid */}
          <Box
            component="section"
            py={80}
            style={{ background: '#F8F9FB' }}
          >
            <Container size="xl">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Group justify="center" gap="sm" mb={50} wrap="wrap">
                  {categories.map((category) => (
                    <motion.div
                      key={category.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        component="button"
                        onClick={() => {
                          setActiveCategory(category.value);
                          trackEvent(EVENTS.CASE_STUDY_FILTER, { category: category.value });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 20px',
                          borderRadius: 50,
                          background: activeCategory === category.value
                            ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)'
                            : 'rgba(31, 79, 216, 0.06)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <category.icon
                          size={18}
                          color={activeCategory === category.value ? '#FFFFFF' : '#1F4FD8'}
                        />
                        <Text
                          size="sm"
                          fw={500}
                          style={{
                            color: activeCategory === category.value ? '#FFFFFF' : '#1F4FD8',
                          }}
                        >
                          {category.label}
                        </Text>
                      </Box>
                    </motion.div>
                  ))}
                </Group>
              </motion.div>

              {/* Cards Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                    {filteredStudies.map((study, index) => (
                      <CaseStudyCard key={study._id} study={study} index={index} />
                    ))}
                  </SimpleGrid>
                </motion.div>
              </AnimatePresence>

              {filteredStudies.length === 0 && (
                <Box ta="center" py={60}>
                  <Text size="lg" style={{ color: '#8A9BB8' }}>
                    No case studies found in this category yet.
                  </Text>
                </Box>
              )}
            </Container>
          </Box>
        </>
      )}

      {/* CTA Section */}
      <Box
        component="section"
        py={100}
        ref={ctaRef}
        style={{ background: '#FFFFFF' }}
      >
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <Stack align="center" gap="xl">
              <Title
                order={2}
                ta="center"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: '#0A1A3F',
                }}
              >
                Ready to be our next success story?
              </Title>
              <Text
                size="lg"
                ta="center"
                maw={600}
                style={{ color: '#5A7099' }}
              >
                Let&apos;s discuss how we can help you achieve similar results.
                Book a free consultation and get a personalized strategy for your business.
              </Text>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  component={Link}
                  href="/contact"
                  size="xl"
                  radius="xl"
                  rightSection={<IconArrowRight size={20} />}
                  styles={{
                    root: {
                      background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 25px rgba(77, 163, 255, 0.4)',
                      },
                    },
                  }}
                >
                  Start Your Project
                </Button>
              </motion.div>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
