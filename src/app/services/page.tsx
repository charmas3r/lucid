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
  Paper,
  Accordion,
  Avatar,
  Tooltip,
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
  IconMapPin,
  IconMessageCircle,
  IconPalette,
  IconCheck,
  IconX,
  IconQuote,
  IconStar,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandVercel,
  IconBrandFigma,
  IconBrandTypescript,
  IconBrandTailwind,
  IconDatabase,
  IconCloud,
  IconBrandGoogle,
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

// Services with pricing teasers
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
    startingPrice: '4,500',
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
    startingPrice: '12,000',
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
    startingPrice: '6,000',
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
    startingPrice: '1,500',
    priceLabel: '/month',
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
    startingPrice: '2,500',
  },
];

const stats = [
  { icon: IconSparkles, value: '50+', label: 'Projects Delivered' },
  { icon: IconRocket, value: '98%', label: 'Client Satisfaction' },
  { icon: IconBolt, value: '<2s', label: 'Average Load Time' },
];

// How we work process steps
const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business, goals, and target audience. Through collaborative sessions, we map out exactly what success looks like for your project.',
    icon: IconMessageCircle,
    duration: '1-2 weeks',
    deliverables: ['Requirements document', 'Project roadmap', 'Technical spec'],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our designers craft pixel-perfect mockups that balance aesthetics with conversion psychology. You\'ll see and approve every screen before we write a line of code.',
    icon: IconPalette,
    duration: '2-3 weeks',
    deliverables: ['Wireframes', 'UI mockups', 'Interactive prototype'],
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Using modern frameworks and best practices, we build your solution with clean, maintainable code. Weekly demos keep you in the loop as features come to life.',
    icon: IconCode,
    duration: '4-8 weeks',
    deliverables: ['Staging environment', 'Weekly progress demos', 'Documentation'],
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'We handle deployment, performance optimization, and provide ongoing support. Your success is our success—we\'re here for the long haul.',
    icon: IconRocket,
    duration: 'Ongoing',
    deliverables: ['Production deployment', 'Performance audit', '30-day support'],
  },
];

// Tech stack
const techStack = [
  { name: 'Next.js', icon: IconBrandNextjs, category: 'Frontend' },
  { name: 'React', icon: IconBrandReact, category: 'Frontend' },
  { name: 'TypeScript', icon: IconBrandTypescript, category: 'Language' },
  { name: 'Tailwind', icon: IconBrandTailwind, category: 'Styling' },
  { name: 'Vercel', icon: IconBrandVercel, category: 'Hosting' },
  { name: 'Shopify', icon: IconShoppingCart, category: 'E-commerce' },
  { name: 'Figma', icon: IconBrandFigma, category: 'Design' },
  { name: 'PostgreSQL', icon: IconDatabase, category: 'Database' },
  { name: 'AWS/GCP', icon: IconCloud, category: 'Cloud' },
  { name: 'Google Analytics', icon: IconBrandGoogle, category: 'Analytics' },
];

// Comparison data
const comparisonFeatures = [
  { feature: 'Custom design tailored to your brand', diy: false, template: 'Limited', lucid: true },
  { feature: 'Mobile-responsive & fast loading', diy: 'Basic', template: 'Varies', lucid: true },
  { feature: 'SEO optimization built-in', diy: false, template: 'Basic', lucid: true },
  { feature: 'Custom functionality & integrations', diy: false, template: 'Limited', lucid: true },
  { feature: 'Professional code you own', diy: false, template: false, lucid: true },
  { feature: 'Ongoing support & maintenance', diy: false, template: 'Extra cost', lucid: true },
  { feature: 'Scalable architecture', diy: false, template: false, lucid: true },
  { feature: '100 Lighthouse scores', diy: 'Unlikely', template: 'Rarely', lucid: true },
  { feature: 'Time to launch', diy: '40+ hours DIY', template: '2-4 weeks', lucid: '4-8 weeks' },
  { feature: 'Typical investment', diy: '$20-50/mo', template: '$2-5K', lucid: '$4.5K+' },
];

// Testimonials
const testimonials = [
  {
    quote: "Lucid transformed our outdated website into a modern, fast-loading experience. Our leads increased by 40% in the first month.",
    author: 'Sarah Mitchell',
    role: 'Owner, Coastal Wellness Spa',
    location: 'Carlsbad, CA',
    rating: 5,
  },
  {
    quote: "Finally, a developer who actually listens. They understood our vision and delivered exactly what we needed—on time and on budget.",
    author: 'Marcus Chen',
    role: 'Founder, TechStart Labs',
    location: 'San Marcos, CA',
    rating: 5,
  },
  {
    quote: "Our Shopify store went from a 3-second load time to under 1 second. Sales are up 25% and customers love the new experience.",
    author: 'Jennifer Rodriguez',
    role: 'E-commerce Manager, SoCal Outdoor Co.',
    location: 'Escondido, CA',
    rating: 5,
  },
];

// FAQ data
const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Most websites launch in 6-10 weeks from kickoff. Simple landing pages can be faster (3-4 weeks), while complex web apps or e-commerce sites may take 12-16 weeks. We\'ll give you a realistic timeline during our discovery call—and we stick to it.',
  },
  {
    question: 'What\'s included in the price?',
    answer: 'Our quotes include everything: design, development, testing, deployment, basic SEO setup, and 30 days of post-launch support. No hidden fees. We\'ll also set up analytics and provide documentation so you understand exactly how everything works.',
  },
  {
    question: 'Do you provide hosting?',
    answer: 'We deploy to Vercel (for Next.js sites) or your preferred host. Vercel\'s pricing starts free and scales with traffic—most small businesses pay $0-20/month. We handle the technical setup and can manage hosting for you if needed.',
  },
  {
    question: 'What if I need changes after launch?',
    answer: 'Minor tweaks in the first 30 days are included. After that, we offer retainer packages starting at $500/month for ongoing updates, or you can request changes on an hourly basis ($150/hr). Many clients also maintain their own content through the CMS we set up.',
  },
  {
    question: 'Can I update the website myself?',
    answer: 'Absolutely. We typically integrate a headless CMS (like Sanity or Contentful) that lets you edit text, images, and blog posts without touching code. We provide training and documentation so you\'re confident making updates.',
  },
  {
    question: 'Why not just use Wix or Squarespace?',
    answer: 'Those platforms are fine for basic sites, but they come with tradeoffs: slower performance, limited customization, ongoing subscription fees, and you don\'t own the code. If your business depends on your website converting visitors, the investment in custom development pays for itself.',
  },
  {
    question: 'Do you work with clients outside San Diego?',
    answer: 'Yes! While we love meeting local clients in person, we work with businesses across California and nationwide. Our process works great over video calls, and we\'ve successfully delivered projects for clients we\'ve never met face-to-face.',
  },
  {
    question: 'What makes Lucid different from other agencies?',
    answer: 'Three things: (1) You work directly with senior developers, not account managers. (2) We use modern tech that actually performs, not outdated WordPress templates. (3) We\'re a small team that treats your project like our own business depends on it—because our reputation does.',
  },
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const techRef = useRef(null);
  const comparisonRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const techInView = useInView(techRef, { once: true, margin: '-100px' });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const renderComparisonValue = (value: boolean | string) => {
    if (value === true) {
      return <IconCheck size={20} color="#10B981" stroke={2.5} />;
    }
    if (value === false) {
      return <IconX size={20} color="#EF4444" stroke={2.5} />;
    }
    return <Text size="sm" c="dimmed">{value}</Text>;
  };

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
            background: 'linear-gradient(180deg, #0A1A3F 0%, #081430 100%)',
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
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.1) 0%, transparent 70%)',
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
                      background: 'rgba(77, 163, 255, 0.15)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
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
                      color: '#FFFFFF',
                    }}
                  >
                    Digital Solutions That{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #4DA3FF 0%, #10B981 100%)',
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
                    style={{ color: '#A5B4CF' }}
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
                          <stat.icon size={24} color="#4DA3FF" stroke={1.5} />
                          <Text
                            fw={700}
                            style={{
                              fontSize: '2rem',
                              color: '#FFFFFF',
                            }}
                          >
                            {stat.value}
                          </Text>
                          <Text size="sm" style={{ color: '#A5B4CF' }}>
                            {stat.label}
                          </Text>
                        </Stack>
                      </motion.div>
                    ))}
                  </Group>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap="md" mt="lg">
                    <Button
                      component={Link}
                      href="/contact"
                      size="lg"
                      radius="xl"
                      rightSection={<IconArrowRight size={18} />}
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)',
                        },
                      }}
                    >
                      Get Free Quote
                    </Button>
                    <Button
                      component={Link}
                      href="/pricing"
                      size="lg"
                      radius="xl"
                      variant="outline"
                      styles={{
                        root: {
                          borderColor: 'rgba(77, 163, 255, 0.5)',
                          color: '#4DA3FF',
                          '&:hover': {
                            background: 'rgba(77, 163, 255, 0.1)',
                          },
                        },
                      }}
                    >
                      View Pricing
                    </Button>
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
          style={{ background: '#0A1A3F' }}
          ref={servicesRef}
        >
          <Container size="xl">
            <Stack align="center" gap="lg" mb={60}>
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
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Services Tailored to Your Goals
              </Title>
            </Stack>

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
                        background: '#081430',
                        borderRadius: 24,
                        border: '1px solid rgba(255, 255, 255, 0.08)',
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
                                boxShadow: '0 8px 25px rgba(77, 163, 255, 0.25)',
                              }}
                            >
                              <service.icon size={32} color="#FFFFFF" stroke={1.5} />
                            </ThemeIcon>
                          </motion.div>
                          <Box ta="right">
                            <Text size="xs" c="dimmed">Starting at</Text>
                            <Text fw={700} size="xl" c="white">
                              ${service.startingPrice}
                              {service.priceLabel && <Text component="span" size="sm" c="dimmed">{service.priceLabel}</Text>}
                            </Text>
                          </Box>
                        </Group>

                        <Box>
                          <Text
                            size="xs"
                            fw={600}
                            tt="uppercase"
                            mb={4}
                            style={{ color: '#4DA3FF', letterSpacing: '1px' }}
                          >
                            {service.tagline}
                          </Text>
                          <Title
                            order={3}
                            style={{
                              fontSize: '1.75rem',
                              color: '#FFFFFF',
                            }}
                          >
                            {service.title}
                          </Title>
                        </Box>

                        <Text size="md" lh={1.8} style={{ color: '#A5B4CF' }}>
                          {service.description}
                        </Text>

                        <Group justify="space-between" align="center" mt="auto">
                          <Group gap="sm">
                            {service.highlights.map((highlight) => (
                              <Badge
                                key={highlight}
                                size="sm"
                                radius="xl"
                                style={{
                                  background: 'rgba(77, 163, 255, 0.1)',
                                  color: '#4DA3FF',
                                  border: '1px solid rgba(77, 163, 255, 0.2)',
                                  fontWeight: 500,
                                }}
                              >
                                {highlight}
                              </Badge>
                            ))}
                          </Group>
                          <ThemeIcon
                            size={40}
                            radius="xl"
                            style={{ background: 'rgba(77, 163, 255, 0.1)' }}
                          >
                            <IconArrowRight size={20} color="#4DA3FF" />
                          </ThemeIcon>
                        </Group>
                      </Stack>
                    </Box>
                  </Link>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* How We Work Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#081430' }}
          ref={processRef}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={60}>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
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
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  How We Bring Your Vision to Life
                </Title>
                <Text size="lg" ta="center" maw={650} style={{ color: '#A5B4CF' }}>
                  A proven process that keeps you in control while we handle the heavy lifting.
                </Text>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Paper
                    p="xl"
                    radius="lg"
                    style={{
                      background: '#0A1A3F',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Step number background */}
                    <Text
                      style={{
                        position: 'absolute',
                        top: -20,
                        right: -10,
                        fontSize: '8rem',
                        fontWeight: 800,
                        color: 'rgba(77, 163, 255, 0.05)',
                        lineHeight: 1,
                        pointerEvents: 'none',
                      }}
                    >
                      {step.number}
                    </Text>

                    <Stack gap="md" style={{ position: 'relative' }}>
                      <ThemeIcon
                        size={56}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        }}
                      >
                        <step.icon size={28} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>

                      <Box>
                        <Text size="xs" c="#10B981" fw={600} mb={4}>
                          {step.duration}
                        </Text>
                        <Title order={4} c="white" mb="xs">
                          {step.title}
                        </Title>
                        <Text size="sm" c="dimmed" lh={1.7}>
                          {step.description}
                        </Text>
                      </Box>

                      <Stack gap={4} mt="auto">
                        {step.deliverables.map((item) => (
                          <Group key={item} gap="xs">
                            <IconCheck size={14} color="#10B981" />
                            <Text size="xs" c="dimmed">{item}</Text>
                          </Group>
                        ))}
                      </Stack>
                    </Stack>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Tech Stack Section */}
        <Box
          component="section"
          py={80}
          style={{ background: '#0A1A3F' }}
          ref={techRef}
        >
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={40}>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(168, 85, 247, 0.15)',
                    color: '#A855F7',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Our Tech Stack
                </Badge>
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Built With Modern, Battle-Tested Technology
                </Title>
              </Stack>

              <Group justify="center" gap="lg">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={techInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <Tooltip label={tech.category} position="bottom">
                      <Paper
                        p="md"
                        radius="lg"
                        style={{
                          background: '#081430',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                        }}
                      >
                        <Stack align="center" gap="xs">
                          <tech.icon size={32} color="#A5B4CF" stroke={1.5} />
                          <Text size="xs" c="dimmed" fw={500}>{tech.name}</Text>
                        </Stack>
                      </Paper>
                    </Tooltip>
                  </motion.div>
                ))}
              </Group>
            </motion.div>
          </Container>
        </Box>

        {/* Comparison Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#081430' }}
          ref={comparisonRef}
        >
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={60}>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#EF4444',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Why Professional Development?
                </Badge>
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  DIY vs. Templates vs. Custom Development
                </Title>
                <Text size="lg" ta="center" maw={650} style={{ color: '#A5B4CF' }}>
                  Understand the tradeoffs before you decide. Here&apos;s how the options compare.
                </Text>
              </Stack>

              <Paper
                radius="xl"
                style={{
                  background: '#0A1A3F',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                }}
              >
                {/* Header */}
                <SimpleGrid cols={4} p="lg" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(77, 163, 255, 0.05)' }}>
                  <Text fw={600} c="white">Feature</Text>
                  <Text fw={600} c="dimmed" ta="center">DIY (Wix/Squarespace)</Text>
                  <Text fw={600} c="dimmed" ta="center">Template Agencies</Text>
                  <Text fw={600} c="#4DA3FF" ta="center">Lucid Web Studios</Text>
                </SimpleGrid>

                {/* Rows */}
                {comparisonFeatures.map((row, index) => (
                  <SimpleGrid
                    key={row.feature}
                    cols={4}
                    p="md"
                    style={{
                      borderBottom: index < comparisonFeatures.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}
                  >
                    <Text size="sm" c="white">{row.feature}</Text>
                    <Box ta="center">{renderComparisonValue(row.diy)}</Box>
                    <Box ta="center">{renderComparisonValue(row.template)}</Box>
                    <Box ta="center">{renderComparisonValue(row.lucid)}</Box>
                  </SimpleGrid>
                ))}
              </Paper>
            </motion.div>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={testimonialsRef}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={60}>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(251, 191, 36, 0.15)',
                    color: '#FBBF24',
                    border: '1px solid rgba(251, 191, 36, 0.25)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Client Stories
                </Badge>
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  What Our Clients Say
                </Title>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.author}
                    initial={{ opacity: 0, y: 30 }}
                    animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <Paper
                      p="xl"
                      radius="lg"
                      style={{
                        background: '#081430',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        height: '100%',
                      }}
                    >
                      <Stack gap="lg" h="100%">
                        <IconQuote size={32} color="#4DA3FF" style={{ opacity: 0.5 }} />
                        
                        <Text size="md" lh={1.8} c="white" style={{ flex: 1 }}>
                          &ldquo;{testimonial.quote}&rdquo;
                        </Text>

                        <Group gap={4} mb="sm">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <IconStar key={i} size={16} color="#FBBF24" fill="#FBBF24" />
                          ))}
                        </Group>

                        <Group gap="md">
                          <Avatar
                            size={48}
                            radius="xl"
                            style={{
                              background: 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)',
                            }}
                          >
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box>
                            <Text fw={600} c="white" size="sm">
                              {testimonial.author}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {testimonial.role}
                            </Text>
                            <Text size="xs" c="#4DA3FF">
                              {testimonial.location}
                            </Text>
                          </Box>
                        </Group>
                      </Stack>
                    </Paper>
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          </Container>
        </Box>

        {/* FAQ Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#081430' }}
          ref={faqRef}
        >
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={60}>
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
                  FAQ
                </Badge>
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Frequently Asked Questions
                </Title>
                <Text size="lg" ta="center" maw={550} style={{ color: '#A5B4CF' }}>
                  Got questions? We&apos;ve got answers. If you don&apos;t see what you&apos;re looking for, 
                  just reach out.
                </Text>
              </Stack>

              <Accordion
                variant="separated"
                radius="lg"
                styles={{
                  item: {
                    background: '#0A1A3F',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    '&[data-active]': {
                      background: '#0A1A3F',
                      border: '1px solid rgba(77, 163, 255, 0.3)',
                    },
                  },
                  control: {
                    color: '#FFFFFF',
                    '&:hover': {
                      background: 'rgba(77, 163, 255, 0.05)',
                    },
                  },
                  label: {
                    color: '#FFFFFF',
                    fontWeight: 600,
                  },
                  panel: {
                    color: '#A5B4CF',
                  },
                  chevron: {
                    color: '#4DA3FF',
                  },
                }}
              >
                {faqs.map((faq, index) => (
                  <Accordion.Item key={index} value={`faq-${index}`}>
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>
                      <Text size="sm" lh={1.8}>
                        {faq.answer}
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </motion.div>
          </Container>
        </Box>

        {/* Local Service Areas Banner */}
        <Box
          component="section"
          py={60}
          style={{ background: '#0A1A3F' }}
        >
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box
                p={{ base: 'xl', md: 40 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
                  borderRadius: 24,
                  border: '1px solid rgba(77, 163, 255, 0.15)',
                }}
              >
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" style={{ alignItems: 'center' }}>
                  <Stack gap="md">
                    <Group gap="sm">
                      <ThemeIcon
                        size={48}
                        radius="xl"
                        style={{ background: 'linear-gradient(135deg, #4DA3FF 0%, #10B981 100%)' }}
                      >
                        <IconMapPin size={24} color="#FFFFFF" />
                      </ThemeIcon>
                      <Box>
                        <Text size="xs" fw={600} tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '0.5px' }}>
                          Proudly Local
                        </Text>
                        <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.5rem' }}>
                          Serving San Diego & Beyond
                        </Title>
                      </Box>
                    </Group>
                    <Text size="md" lh={1.8} style={{ color: '#A5B4CF' }}>
                      Based in Escondido, we provide web development services across San Diego County—from 
                      San Marcos and Carlsbad to La Jolla and Chula Vista. Local expertise, enterprise-quality results.
                    </Text>
                  </Stack>
                  <Box ta={{ base: 'left', md: 'right' }}>
                    <Button
                      component={Link}
                      href="/service-areas"
                      size="md"
                      radius="xl"
                      rightSection={<IconArrowRight size={16} />}
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #4DA3FF 0%, #1F4FD8 100%)',
                        },
                      }}
                    >
                      View Service Areas
                    </Button>
                  </Box>
                </SimpleGrid>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          component="section"
          py={100}
          style={{
            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
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
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
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

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.9)' }} lh={1.8}>
                  Whether you need a complete digital overhaul or a targeted solution,
                  we&apos;re here to bring clarity to your vision. Free consultation, no strings attached.
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
                          fontWeight: 600,
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
                      href="/pricing"
                      size="lg"
                      radius="xl"
                      variant="outline"
                      styles={{
                        root: {
                          borderColor: 'rgba(255, 255, 255, 0.4)',
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
              </Stack>
            </motion.div>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
