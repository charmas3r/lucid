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
  IconShoppingCart,
  IconArrowRight,
  IconCheck,
  IconBolt,
  IconRocket,
  IconCreditCard,
  IconTruck,
  IconPackage,
  IconChartLine,
  IconShield,
  IconWorld,
  IconDevices,
  IconBuildingStore,
  IconCode,
  IconDatabase,
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

const solutions = [
  {
    icon: IconBuildingStore,
    title: 'Shopify + Hydrogen/Oxygen',
    subtitle: 'For Speed & Scalability',
    description:
      'Shopify\'s headless commerce stack. Hydrogen for the storefront, Oxygen for hosting. Lightning-fast storefronts that handle any traffic spike with ease.',
    features: [
      'Sub-second page loads',
      'Built-in global CDN',
      'Shopify checkout & payments',
      'Easy product management',
      'Automatic inventory sync',
    ],
    bestFor: 'Growing businesses ready to scale',
    gradient: 'linear-gradient(135deg, #96BF48 0%, #5E8E3E 100%)',
  },
  {
    icon: IconCode,
    title: 'Bespoke Headless Commerce',
    subtitle: 'Complete Control',
    description:
      'A fully custom solution using Next.js with headless e-commerce backends like Saleor, Medusa, or custom APIs. Total control over every pixel and feature.',
    features: [
      'Unlimited customization',
      'Any payment provider',
      'Custom checkout flows',
      'Advanced personalization',
      'Multi-currency & language',
    ],
    bestFor: 'Brands with unique requirements',
    gradient: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  },
];

const whatHeadlessMeans = [
  {
    traditional: 'Slow, monolithic platforms',
    headless: 'Blazing-fast, decoupled architecture',
    icon: IconBolt,
  },
  {
    traditional: 'Limited design options',
    headless: 'Pixel-perfect custom designs',
    icon: IconDevices,
  },
  {
    traditional: 'Rigid checkout process',
    headless: 'Flexible, optimized conversion flows',
    icon: IconCreditCard,
  },
  {
    traditional: 'Single storefront',
    headless: 'Sell anywhere: web, mobile, kiosks, social',
    icon: IconWorld,
  },
];

const features = [
  {
    icon: IconCreditCard,
    title: 'Payment Processing',
    description: 'Stripe, PayPal, Apple Pay, Google Pay, Shop Pay—all the ways your customers want to pay.',
  },
  {
    icon: IconTruck,
    title: 'Shipping & Fulfillment',
    description: 'Real-time rates, label printing, tracking integration with carriers worldwide.',
  },
  {
    icon: IconPackage,
    title: 'Inventory Management',
    description: 'Sync stock across channels, set alerts, manage variants—never oversell again.',
  },
  {
    icon: IconChartLine,
    title: 'Analytics & Insights',
    description: 'Conversion tracking, customer behavior, revenue analytics—data to drive decisions.',
  },
  {
    icon: IconShield,
    title: 'Security & Compliance',
    description: 'PCI-DSS compliant, SSL secured, GDPR ready—your customers\' data is safe.',
  },
  {
    icon: IconDatabase,
    title: 'CMS Integration',
    description: 'Manage products, collections, and content with intuitive admin tools.',
  },
];

const benefits = [
  { value: '40%', label: 'Higher conversion rates with fast-loading stores' },
  { value: '65%', label: 'Reduction in cart abandonment' },
  { value: '3x', label: 'Faster page loads than traditional platforms' },
];

export default function EcommercePage() {
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const headlessRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const solutionsInView = useInView(solutionsRef, { once: true, margin: '-100px' });
  const headlessInView = useInView(headlessRef, { once: true, margin: '-100px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
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
              background: 'radial-gradient(circle, rgba(58, 110, 165, 0.08) 0%, transparent 70%)',
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
                    E-Commerce Solutions
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
                    Stores That{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #3A6EA5 0%, #0A1A3F 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Actually Convert
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
                    Whether you&apos;re launching with Shopify&apos;s Hydrogen stack or building a
                    completely bespoke headless solution—we create e-commerce experiences that
                    turn browsers into buyers.
                  </Text>
                </motion.div>

                {/* Benefits stats */}
                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap={50} mt="xl">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Stack align="center" gap={4}>
                          <Text
                            fw={700}
                            style={{
                              fontSize: '2.5rem',
                              background: 'linear-gradient(135deg, #3A6EA5 0%, #0A1A3F 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {benefit.value}
                          </Text>
                          <Text size="sm" ta="center" maw={180} style={{ color: '#8A9BB8' }}>
                            {benefit.label}
                          </Text>
                        </Stack>
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
                            background: 'linear-gradient(135deg, #3A6EA5 0%, #0A1A3F 100%)',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(58, 110, 165, 0.3)',
                          },
                        }}
                      >
                        Launch Your Store
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

        {/* Solutions Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={solutionsRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={solutionsInView ? 'animate' : 'initial'}
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
                    Choose Your Path
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
                    Two Powerful Approaches
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: '#5A7099' }}>
                    We recommend the right solution based on your business needs, growth plans,
                    and budget—not because it&apos;s easier for us.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={40}>
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  style={{ height: '100%' }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#F8F9FB',
                      borderRadius: 24,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 5,
                        background: solution.gradient,
                      }}
                    />

                    <Stack gap="xl">
                      <Group gap="lg">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <ThemeIcon
                            size={70}
                            radius="xl"
                            style={{
                              background: solution.gradient,
                              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                            }}
                          >
                            <solution.icon size={32} color="#FFFFFF" stroke={1.5} />
                          </ThemeIcon>
                        </motion.div>
                        <Box>
                          <Text size="xs" fw={600} tt="uppercase" style={{ color: '#8A9BB8', letterSpacing: '1px' }}>
                            {solution.subtitle}
                          </Text>
                          <Title order={3} style={{ color: '#0A1A3F' }}>
                            {solution.title}
                          </Title>
                        </Box>
                      </Group>

                      <Text size="md" lh={1.8} style={{ color: '#5A7099' }}>
                        {solution.description}
                      </Text>

                      <Divider color="rgba(10, 26, 63, 0.08)" />

                      <Box>
                        <Text size="sm" fw={600} mb="sm" style={{ color: '#0A1A3F' }}>
                          Key Features:
                        </Text>
                        <List
                          spacing="sm"
                          icon={
                            <ThemeIcon size={22} radius="xl" style={{ background: 'rgba(31, 79, 216, 0.1)' }}>
                              <IconCheck size={12} color="#1F4FD8" stroke={3} />
                            </ThemeIcon>
                          }
                        >
                          {solution.features.map((feature) => (
                            <List.Item key={feature}>
                              <Text size="sm" style={{ color: '#5A7099' }}>{feature}</Text>
                            </List.Item>
                          ))}
                        </List>
                      </Box>

                      <Badge
                        size="lg"
                        radius="md"
                        style={{
                          background: 'rgba(31, 79, 216, 0.08)',
                          color: '#1F4FD8',
                          border: '1px solid rgba(31, 79, 216, 0.15)',
                          alignSelf: 'flex-start',
                        }}
                      >
                        Best for: {solution.bestFor}
                      </Badge>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* What Headless Means Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={headlessRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={headlessInView ? 'animate' : 'initial'}
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
                    Headless Commerce Explained
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
                    What &quot;Headless&quot; Means for You
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    &quot;Headless&quot; sounds technical, but here&apos;s what it actually delivers for
                    your business compared to traditional platforms like Wix or basic Shopify themes.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {whatHeadlessMeans.map((item, index) => (
                <motion.div
                  key={item.headless}
                  initial={{ opacity: 0, y: 30 }}
                  animate={headlessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 20,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Group gap="lg" align="flex-start">
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
                          flexShrink: 0,
                        }}
                      >
                        <item.icon size={24} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                      <Stack gap="sm">
                        <Group gap="xs">
                          <ThemeIcon size={20} radius="xl" style={{ background: 'rgba(220, 53, 69, 0.2)' }}>
                            <IconX size={10} color="#FF6B6B" stroke={3} />
                          </ThemeIcon>
                          <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'line-through' }}>
                            {item.traditional}
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <ThemeIcon size={20} radius="xl" style={{ background: 'rgba(77, 163, 255, 0.2)' }}>
                            <IconCheck size={10} color="#4DA3FF" stroke={3} />
                          </ThemeIcon>
                          <Text size="sm" fw={500} style={{ color: '#FFFFFF' }}>
                            {item.headless}
                          </Text>
                        </Group>
                      </Stack>
                    </Group>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={featuresRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={featuresInView ? 'animate' : 'initial'}
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
                    Everything You Need
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
                    Full E-Commerce Capabilities
                  </Title>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
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
                      boxShadow: '0 2px 12px rgba(10, 26, 63, 0.04)',
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
                            background: 'linear-gradient(135deg, #3A6EA5 0%, #0A1A3F 100%)',
                          }}
                        >
                          <feature.icon size={24} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                      <Title order={4} style={{ color: '#0A1A3F' }}>
                        {feature.title}
                      </Title>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        {feature.description}
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
            background: 'linear-gradient(135deg, #0A1A3F 0%, #3A6EA5 100%)',
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
                  Ready to Sell Smarter?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.85)' }} lh={1.8}>
                  Let&apos;s discuss your product catalog, target market, and growth goals.
                  We&apos;ll recommend the perfect e-commerce solution for your business.
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
                      Get a Free Store Consultation
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
