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
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  IconCode,
  IconDeviceMobile,
  IconShoppingCart,
  IconSearch,
  IconArrowRight,
  IconSparkles,
  IconRocket,
  IconBolt,
  IconChartBar,
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

const services = [
  {
    icon: IconCode,
    title: 'Web Development',
    tagline: 'Next-Generation Web Experiences',
    description:
      'We build blazing-fast, SEO-optimized websites using Next.js 14 and React Server Components. Deployed on Vercel with pay-as-you-go hosting—no expensive servers, just predictable costs that scale with your traffic.',
    href: '/services/web-development',
    highlights: ['Next.js & React', 'Vercel Hosting', 'Lightning Performance'],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
  {
    icon: IconDeviceMobile,
    title: 'Mobile Apps',
    tagline: 'One Codebase. Maximum Reach.',
    description:
      'From MVP prototypes for VC exposure to full-scale production apps. We build cross-platform solutions that integrate seamlessly with services like Mindbody, Square, and custom APIs.',
    href: '/services/mobile-apps',
    highlights: ['Kotlin Multiplatform', 'Flutter', 'iOS & Android'],
    gradient: 'linear-gradient(135deg, #4DA3FF 0%, #3A6EA5 100%)',
  },
  {
    icon: IconShoppingCart,
    title: 'E-Commerce',
    tagline: 'Sell Without Limits',
    description:
      'Whether you need Shopify with Hydrogen/Oxygen for speed and scalability, or a completely bespoke headless solution with Next.js—we build stores that convert visitors into customers.',
    href: '/services/ecommerce',
    highlights: ['Shopify Hydrogen', 'Headless Commerce', 'Payment Integrations'],
    gradient: 'linear-gradient(135deg, #3A6EA5 0%, #0A1A3F 100%)',
  },
  {
    icon: IconSearch,
    title: 'SEO Services',
    tagline: 'The Lighthouse Ninjas',
    description:
      'We don\'t just optimize—we transform. Our SEO specialists surgically improve your site to achieve perfect Google Lighthouse scores, skyrocketing your visibility and organic traffic.',
    href: '/services/seo-services',
    highlights: ['100 Lighthouse Score', 'Technical SEO', 'Content Strategy'],
    gradient: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
  },
  {
    icon: IconChartBar,
    title: 'Conversion Optimization',
    tagline: 'Turn Visitors Into Customers',
    description:
      'Getting traffic but not sales? We fix that. Through psychology-driven design, A/B testing, and funnel optimization, we transform your website into a conversion machine.',
    href: '/services/conversion-optimization',
    highlights: ['2-3x Conversion Lift', 'A/B Testing', 'Funnel Optimization'],
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #0CCE6B 100%)',
  },
];

const stats = [
  { icon: IconSparkles, value: '50+', label: 'Projects Delivered' },
  { icon: IconRocket, value: '98%', label: 'Client Satisfaction' },
  { icon: IconBolt, value: '<2s', label: 'Average Load Time' },
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
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
          {/* Animated background elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: '5%',
              right: '10%',
              width: 500,
              height: 500,
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
              bottom: '10%',
              left: '5%',
              width: 400,
              height: 400,
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
                    Our Services
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
                    Digital Solutions That{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Actually Deliver
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
                    From concept to launch, we bring clarity to every aspect of your digital
                    presence. Real technology expertise, transparent processes, and results
                    you can measure.
                  </Text>
                </motion.div>

                {/* Stats */}
                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap={60} mt="xl">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Stack align="center" gap="xs">
                          <stat.icon size={24} color="#1F4FD8" stroke={1.5} />
                          <Text
                            fw={700}
                            style={{
                              fontSize: '2rem',
                              color: '#0A1A3F',
                            }}
                          >
                            {stat.value}
                          </Text>
                          <Text size="sm" style={{ color: '#8A9BB8' }}>
                            {stat.label}
                          </Text>
                        </Stack>
                      </motion.div>
                    ))}
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Services Grid */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={servicesRef}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                  style={{ height: '100%' }}
                >
                  <Link href={service.href} style={{ textDecoration: 'none' }}>
                    <Box
                      p="xl"
                      style={{
                        background: '#F8F9FB',
                        borderRadius: 24,
                        border: '1px solid rgba(10, 26, 63, 0.06)',
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Decorative gradient accent */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: service.gradient,
                        }}
                      />

                      <Stack gap="lg">
                        <Group justify="space-between" align="flex-start">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <ThemeIcon
                              size={70}
                              radius="xl"
                              style={{
                                background: service.gradient,
                                boxShadow: '0 8px 25px rgba(31, 79, 216, 0.25)',
                              }}
                            >
                              <service.icon size={32} color="#FFFFFF" stroke={1.5} />
                            </ThemeIcon>
                          </motion.div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <ThemeIcon
                              size={40}
                              radius="xl"
                              style={{
                                background: 'rgba(31, 79, 216, 0.1)',
                              }}
                            >
                              <IconArrowRight size={20} color="#1F4FD8" />
                            </ThemeIcon>
                          </motion.div>
                        </Group>

                        <Box>
                          <Text
                            size="xs"
                            fw={600}
                            tt="uppercase"
                            mb={4}
                            style={{ color: '#1F4FD8', letterSpacing: '1px' }}
                          >
                            {service.tagline}
                          </Text>
                          <Title
                            order={3}
                            style={{
                              fontSize: '1.75rem',
                              color: '#0A1A3F',
                            }}
                          >
                            {service.title}
                          </Title>
                        </Box>

                        <Text size="md" lh={1.8} style={{ color: '#5A7099' }}>
                          {service.description}
                        </Text>

                        <Group gap="sm" mt="auto">
                          {service.highlights.map((highlight) => (
                            <Badge
                              key={highlight}
                              size="sm"
                              radius="xl"
                              style={{
                                background: 'rgba(31, 79, 216, 0.08)',
                                color: '#1F4FD8',
                                border: '1px solid rgba(31, 79, 216, 0.15)',
                                fontWeight: 500,
                              }}
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </Group>
                      </Stack>
                    </Box>
                  </Link>
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
                  Let&apos;s Build Together
                </Badge>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Ready to Transform Your Digital Presence?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  Whether you need a complete digital overhaul or a targeted solution,
                  we&apos;re here to bring clarity to your vision.
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
                      Start a Project
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/pricing#packages"
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
                      View Packages
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
