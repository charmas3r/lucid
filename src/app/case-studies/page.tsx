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
  Tabs,
  Progress,
} from '@mantine/core';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCode,
  IconDeviceMobile,
  IconShoppingCart,
  IconSearch,
  IconChartLine,
  IconTrendingUp,
  IconUsers,
  IconClock,
  IconCheck,
  IconStar,
  IconExternalLink,
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

const categories = [
  { value: 'all', label: 'All Projects', icon: IconStar },
  { value: 'web', label: 'Web Development', icon: IconCode },
  { value: 'mobile', label: 'Mobile Apps', icon: IconDeviceMobile },
  { value: 'ecommerce', label: 'E-Commerce', icon: IconShoppingCart },
  { value: 'seo', label: 'SEO & Marketing', icon: IconSearch },
  { value: 'conversion', label: 'Conversion Optimization', icon: IconChartLine },
];

const caseStudies = [
  {
    id: 'coastal-dental',
    category: 'web',
    title: 'Coastal Dental Group',
    subtitle: 'Complete Digital Transformation',
    description: 'A full website redesign that increased patient bookings by 340% and established them as the premier dental practice in La Jolla.',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    industry: 'Healthcare',
    timeline: '8 weeks',
    metrics: [
      { label: 'Patient Bookings', before: '12/mo', after: '53/mo', increase: '+342%' },
      { label: 'Organic Traffic', before: '1.2k', after: '8.4k', increase: '+600%' },
      { label: 'Lighthouse Score', before: '42', after: '100', increase: '+138%' },
    ],
    services: ['Web Design', 'Development', 'SEO'],
    testimonial: {
      quote: 'Lucid transformed our online presence completely. The new website pays for itself every month with the new patients we get.',
      author: 'Dr. Sarah Chen',
      role: 'Practice Owner',
    },
    featured: true,
  },
  {
    id: 'harvest-table',
    category: 'ecommerce',
    title: 'Harvest Table',
    subtitle: 'Farm-to-Table E-Commerce Platform',
    description: 'Built a custom e-commerce solution connecting local farms directly to consumers, featuring subscription boxes and same-day delivery.',
    image: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    industry: 'Food & Beverage',
    timeline: '12 weeks',
    metrics: [
      { label: 'Monthly Revenue', before: '$8k', after: '$67k', increase: '+738%' },
      { label: 'Subscriber Base', before: '0', after: '2,400', increase: 'New' },
      { label: 'Cart Abandonment', before: '78%', after: '23%', increase: '-70%' },
    ],
    services: ['E-Commerce', 'Custom Development', 'UX Design'],
    testimonial: {
      quote: 'They didn\'t just build us a website—they built us a business. The subscription system alone generates $40k monthly.',
      author: 'Marcus Rivera',
      role: 'Founder',
    },
    featured: true,
  },
  {
    id: 'summit-fitness',
    category: 'mobile',
    title: 'Summit Fitness',
    subtitle: 'Cross-Platform Fitness App',
    description: 'A comprehensive fitness app with AI-powered workout recommendations, social features, and integration with wearable devices.',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    industry: 'Health & Fitness',
    timeline: '16 weeks',
    metrics: [
      { label: 'App Downloads', before: '0', after: '45k', increase: '45K+' },
      { label: 'Monthly Active Users', before: '0', after: '28k', increase: '28K+' },
      { label: 'App Store Rating', before: 'N/A', after: '4.8', increase: '⭐ 4.8' },
    ],
    services: ['Mobile Development', 'UI/UX Design', 'Backend'],
    testimonial: {
      quote: 'The app exceeded every expectation. Users love the AI recommendations—retention is through the roof.',
      author: 'Jake Morrison',
      role: 'CEO',
    },
    featured: true,
  },
  {
    id: 'pacific-law',
    category: 'seo',
    title: 'Pacific Law Partners',
    subtitle: 'SEO Domination Campaign',
    description: 'Comprehensive SEO strategy that took a boutique law firm from page 5 to position 1 for their key practice areas.',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    industry: 'Legal Services',
    timeline: '6 months',
    metrics: [
      { label: 'Organic Rankings', before: 'Page 5', after: '#1', increase: 'Top 3' },
      { label: 'Qualified Leads', before: '3/mo', after: '47/mo', increase: '+1,467%' },
      { label: 'Revenue Growth', before: '$180k', after: '$890k', increase: '+394%' },
    ],
    services: ['SEO', 'Content Strategy', 'Local SEO'],
    testimonial: {
      quote: 'We went from invisible to dominant. Lucid\'s SEO work doubled our firm\'s size in under a year.',
      author: 'Jennifer Walsh',
      role: 'Managing Partner',
    },
    featured: false,
  },
  {
    id: 'artisan-coffee',
    category: 'conversion',
    title: 'Artisan Coffee Roasters',
    subtitle: 'Conversion Rate Optimization',
    description: 'Data-driven CRO that increased online sales by 287% through strategic A/B testing and user experience improvements.',
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    industry: 'Food & Beverage',
    timeline: '4 months',
    metrics: [
      { label: 'Conversion Rate', before: '1.2%', after: '4.6%', increase: '+283%' },
      { label: 'Average Order Value', before: '$32', after: '$58', increase: '+81%' },
      { label: 'Revenue', before: '$24k/mo', after: '$94k/mo', increase: '+292%' },
    ],
    services: ['CRO', 'A/B Testing', 'Analytics'],
    testimonial: {
      quote: 'The ROI was immediate. Every change they made was backed by data, and the results speak for themselves.',
      author: 'David Park',
      role: 'Owner',
    },
    featured: false,
  },
  {
    id: 'verde-landscaping',
    category: 'web',
    title: 'Verde Landscaping',
    subtitle: 'Lead Generation Machine',
    description: 'A conversion-focused website that turned a local landscaper into the most booked contractor in North County.',
    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    industry: 'Home Services',
    timeline: '6 weeks',
    metrics: [
      { label: 'Monthly Leads', before: '8', after: '89', increase: '+1,013%' },
      { label: 'Quote Requests', before: '4', after: '67', increase: '+1,575%' },
      { label: 'Page Load Time', before: '8.2s', after: '1.1s', increase: '-87%' },
    ],
    services: ['Web Design', 'Lead Gen', 'Speed Optimization'],
    testimonial: {
      quote: 'I had to hire 3 more crews to handle all the new business. Best investment I ever made.',
      author: 'Carlos Mendez',
      role: 'Owner',
    },
    featured: false,
  },
  {
    id: 'mindful-therapy',
    category: 'mobile',
    title: 'Mindful Therapy',
    subtitle: 'Mental Health Platform',
    description: 'A HIPAA-compliant telehealth app connecting patients with licensed therapists, featuring secure video and messaging.',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    industry: 'Healthcare',
    timeline: '20 weeks',
    metrics: [
      { label: 'Active Patients', before: '0', after: '12k', increase: '12K+' },
      { label: 'Session Completion', before: 'N/A', after: '94%', increase: '94%' },
      { label: 'Provider Network', before: '0', after: '180', increase: '180+' },
    ],
    services: ['Mobile App', 'HIPAA Compliance', 'Backend'],
    testimonial: {
      quote: 'They understood healthcare compliance deeply. The app is beautiful, secure, and our patients love it.',
      author: 'Dr. Amanda Torres',
      role: 'Clinical Director',
    },
    featured: false,
  },
  {
    id: 'urban-threads',
    category: 'ecommerce',
    title: 'Urban Threads',
    subtitle: 'Fashion E-Commerce Redesign',
    description: 'Complete platform migration and redesign that tripled sales and established a cult following among young professionals.',
    image: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    industry: 'Fashion',
    timeline: '10 weeks',
    metrics: [
      { label: 'Monthly Sales', before: '$45k', after: '$156k', increase: '+247%' },
      { label: 'Return Rate', before: '34%', after: '8%', increase: '-76%' },
      { label: 'Mobile Conversion', before: '0.8%', after: '4.2%', increase: '+425%' },
    ],
    services: ['E-Commerce', 'UX Design', 'Shopify Plus'],
    testimonial: {
      quote: 'The new site feels premium. Our customers literally tell us how much they love shopping with us now.',
      author: 'Nina Chen',
      role: 'Founder',
    },
    featured: false,
  },
];

const overallStats = [
  { value: '$12M+', label: 'Revenue Generated for Clients', icon: IconTrendingUp },
  { value: '340%', label: 'Average Traffic Increase', icon: IconUsers },
  { value: '98%', label: 'Client Satisfaction Rate', icon: IconStar },
  { value: '4.2x', label: 'Average ROI', icon: IconChartLine },
];

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

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
            background: study.image,
            height: 200,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated overlay pattern */}
          <motion.div
            animate={{
              backgroundPosition: isHovered ? '100% 100%' : '0% 0%',
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px',
            }}
          />

          {/* Featured badge */}
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
              }}
            >
              Featured
            </Badge>
          )}

          {/* Industry badge */}
          <Badge
            size="sm"
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#FFFFFF',
              backdropFilter: 'blur(10px)',
            }}
          >
            {study.industry}
          </Badge>

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
            }}
          >
            <Group gap="xs">
              {study.metrics.slice(0, 2).map((metric) => (
                <Badge
                  key={metric.label}
                  size="lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#0CCE6B',
                    fontWeight: 700,
                  }}
                >
                  {metric.increase}
                </Badge>
              ))}
            </Group>
          </motion.div>
        </Box>

        {/* Content */}
        <Stack gap="md" p="xl" style={{ flex: 1 }}>
          <Box>
            <Text size="xs" fw={600} tt="uppercase" style={{ color: '#1F4FD8', letterSpacing: '1px', marginBottom: 4 }}>
              {study.subtitle}
            </Text>
            <Title order={3} style={{ color: '#0A1A3F', fontSize: '1.35rem' }}>
              {study.title}
            </Title>
          </Box>

          <Text size="sm" lh={1.7} style={{ color: '#5A7099', flex: 1 }}>
            {study.description}
          </Text>

          {/* Key metric highlight */}
          <Box
            p="md"
            style={{
              background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.05) 0%, rgba(77, 163, 255, 0.08) 100%)',
              borderRadius: 12,
              border: '1px solid rgba(31, 79, 216, 0.1)',
            }}
          >
            <Group justify="space-between" align="center">
              <Box>
                <Text size="xs" style={{ color: '#8A9BB8' }}>{study.metrics[0].label}</Text>
                <Group gap="xs" align="baseline">
                  <Text size="xs" style={{ color: '#8A9BB8', textDecoration: 'line-through' }}>
                    {study.metrics[0].before}
                  </Text>
                  <Text fw={700} size="lg" style={{ color: '#0A1A3F' }}>
                    {study.metrics[0].after}
                  </Text>
                </Group>
              </Box>
              <Badge
                size="lg"
                style={{
                  background: 'linear-gradient(135deg, #0CCE6B 0%, #0A1A3F 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                }}
              >
                {study.metrics[0].increase}
              </Badge>
            </Group>
          </Box>

          {/* Services tags */}
          <Group gap="xs">
            {study.services.map((service) => (
              <Badge
                key={service}
                size="sm"
                variant="light"
                style={{
                  background: 'rgba(10, 26, 63, 0.04)',
                  color: '#5A7099',
                  border: '1px solid rgba(10, 26, 63, 0.06)',
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
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Group gap={4} style={{ cursor: 'pointer' }}>
                <Text size="sm" fw={600} style={{ color: '#1F4FD8' }}>
                  View Case Study
                </Text>
                <IconArrowRight size={16} color="#1F4FD8" />
              </Group>
            </motion.div>
          </Group>
        </Stack>
      </Box>
    </motion.div>
  );
}

function FeaturedCaseStudy({ study }: { study: typeof caseStudies[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Box
        style={{
          background: '#FFFFFF',
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(10, 26, 63, 0.12)',
          border: '1px solid rgba(10, 26, 63, 0.06)',
        }}
      >
        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={0}>
          {/* Left - Visual */}
          <Box
            style={{
              background: study.image,
              minHeight: 500,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Animated background pattern */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '150%',
                height: '150%',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Central content */}
            <Stack align="center" gap="xl" style={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Box
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 24,
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <Text fw={800} style={{ fontSize: '2.5rem', color: '#FFFFFF' }}>
                    {study.title.charAt(0)}
                  </Text>
                </Box>
              </motion.div>

              {/* Floating stats */}
              <Group gap="md">
                {study.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ y: 30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <Box
                      p="md"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: 16,
                        textAlign: 'center',
                        minWidth: 100,
                      }}
                    >
                      <Text fw={800} size="xl" style={{ color: '#0CCE6B' }}>
                        {metric.increase}
                      </Text>
                      <Text size="xs" style={{ color: '#5A7099' }}>
                        {metric.label}
                      </Text>
                    </Box>
                  </motion.div>
                ))}
              </Group>
            </Stack>
          </Box>

          {/* Right - Content */}
          <Box p={{ base: 'xl', md: 50 }}>
            <Stack gap="xl" h="100%" justify="center">
              <Group gap="sm">
                <Badge
                  size="lg"
                  style={{
                    background: 'rgba(31, 79, 216, 0.08)',
                    color: '#1F4FD8',
                  }}
                >
                  {study.industry}
                </Badge>
                <Badge
                  size="lg"
                  style={{
                    background: 'rgba(12, 206, 107, 0.1)',
                    color: '#0CCE6B',
                  }}
                >
                  Featured Project
                </Badge>
              </Group>

              <Box>
                <Text size="sm" fw={600} tt="uppercase" style={{ color: '#8A9BB8', letterSpacing: '1px', marginBottom: 8 }}>
                  {study.subtitle}
                </Text>
                <Title order={2} style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#0A1A3F' }}>
                  {study.title}
                </Title>
              </Box>

              <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                {study.description}
              </Text>

              {/* Detailed metrics */}
              <Stack gap="md">
                {study.metrics.map((metric) => (
                  <Box key={metric.label}>
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" style={{ color: '#5A7099' }}>{metric.label}</Text>
                      <Group gap="xs">
                        <Text size="sm" style={{ color: '#8A9BB8', textDecoration: 'line-through' }}>
                          {metric.before}
                        </Text>
                        <IconArrowRight size={14} color="#0CCE6B" />
                        <Text size="sm" fw={700} style={{ color: '#0A1A3F' }}>
                          {metric.after}
                        </Text>
                      </Group>
                    </Group>
                    <Progress
                      value={100}
                      size="sm"
                      radius="xl"
                      styles={{
                        root: { background: 'rgba(10, 26, 63, 0.06)' },
                        section: { background: 'linear-gradient(90deg, #1F4FD8 0%, #0CCE6B 100%)' },
                      }}
                    />
                  </Box>
                ))}
              </Stack>

              {/* Testimonial */}
              <Box
                p="lg"
                style={{
                  background: '#F8F9FB',
                  borderRadius: 16,
                  borderLeft: '4px solid #1F4FD8',
                }}
              >
                <Text size="sm" lh={1.7} mb="sm" style={{ color: '#5A7099', fontStyle: 'italic' }}>
                  &ldquo;{study.testimonial.quote}&rdquo;
                </Text>
                <Group gap="xs">
                  <Text size="sm" fw={600} style={{ color: '#0A1A3F' }}>
                    {study.testimonial.author}
                  </Text>
                  <Text size="sm" style={{ color: '#8A9BB8' }}>
                    — {study.testimonial.role}
                  </Text>
                </Group>
              </Box>

              <Group gap="md">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    radius="xl"
                    rightSection={<IconArrowRight size={18} />}
                    styles={{
                      root: {
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        border: 'none',
                      },
                    }}
                  >
                    View Full Case Study
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    radius="xl"
                    variant="outline"
                    rightSection={<IconExternalLink size={18} />}
                    styles={{
                      root: {
                        borderColor: '#C9D2E3',
                        color: '#1F4FD8',
                      },
                    }}
                  >
                    Visit Website
                  </Button>
                </motion.div>
              </Group>
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>
    </motion.div>
  );
}

export default function CaseStudiesPage() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStudies = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter((study) => study.category === activeCategory);

  const featuredStudy = caseStudies.find((s) => s.featured);

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
              width: 500,
              height: 500,
              background: 'radial-gradient(circle, rgba(31, 79, 216, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: 60,
              height: 60,
              background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
              borderRadius: 16,
              opacity: 0.1,
              transform: 'rotate(45deg)',
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
                    Our Work Speaks for Itself
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
                    Real Results for{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Real Businesses
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
                    Don&apos;t take our word for it. Explore the transformations we&apos;ve delivered—from 
                    startups to established brands, across every industry and service we offer.
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
                        Start Your Success Story
                      </Button>
                    </motion.div>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box
          component="section"
          py={60}
          style={{ background: '#0A1A3F' }}
          ref={statsRef}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
              {overallStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Stack align="center" gap="xs">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={statsInView ? { scale: 1 } : {}}
                      transition={{ type: 'spring', stiffness: 300, delay: index * 0.1 + 0.2 }}
                    >
                      <stat.icon size={28} color="#4DA3FF" stroke={1.5} />
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
                      {stat.value}
                    </Text>
                    <Text size="sm" ta="center" style={{ color: '#8A9BB8' }}>
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
          <Box component="section" py={100} style={{ background: '#F8F9FB' }}>
            <Container size="xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Stack align="center" gap="lg" mb={60}>
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
                    ⭐ Featured Success Story
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
                    Transformative Results
                  </Title>
                </Stack>
              </motion.div>

              <FeaturedCaseStudy study={featuredStudy} />
            </Container>
          </Box>
        )}

        {/* All Case Studies Grid */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={gridRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={gridInView ? 'animate' : 'initial'}
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
                    All Case Studies
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
                    Explore Our Portfolio
                  </Title>
                </motion.div>
              </Stack>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Group justify="center" gap="sm" mb={50} wrap="wrap">
                {categories.map((category) => (
                  <motion.div
                    key={category.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={activeCategory === category.value ? 'filled' : 'light'}
                      radius="xl"
                      leftSection={<category.icon size={16} />}
                      onClick={() => setActiveCategory(category.value)}
                      styles={{
                        root: {
                          background: activeCategory === category.value
                            ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)'
                            : 'rgba(31, 79, 216, 0.06)',
                          color: activeCategory === category.value ? '#FFFFFF' : '#1F4FD8',
                          border: 'none',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    >
                      {category.label}
                    </Button>
                  </motion.div>
                ))}
              </Group>
            </motion.div>

            {/* Case Studies Grid */}
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
                    <CaseStudyCard key={study.id} study={study} index={index} />
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
                  Your Story Starts Here
                </Badge>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Ready to Be Our Next Success Story?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  Join the businesses that have transformed their digital presence with Lucid. 
                  Let&apos;s discuss how we can achieve similar results for you.
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
                      Start Your Project
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/pricing"
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
                      View Pricing
                    </Button>
                  </motion.div>
                </Group>

                <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }} mt="lg">
                  Free consultation • No commitment required
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
