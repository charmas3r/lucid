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
  Divider,
  Avatar,
  Blockquote,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  IconArrowRight,
  IconBulb,
  IconHeart,
  IconTarget,
  IconUsers,
  IconRocket,
  IconSparkles,
  IconMessageCircle,
  IconCode,
  IconPalette,
  IconTrendingUp,
  IconQuote,
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

const coreValues = [
  {
    icon: IconBulb,
    title: 'Clarity First',
    description: 'We cut through the noise. Every solution we deliver is designed to be clear, intuitive, and purposeful.',
  },
  {
    icon: IconHeart,
    title: 'Genuine Partnership',
    description: 'Your success is our success. We invest in understanding your business as deeply as our own.',
  },
  {
    icon: IconTarget,
    title: 'Results-Driven',
    description: 'Beautiful design means nothing without performance. We measure success by the growth we generate.',
  },
  {
    icon: IconMessageCircle,
    title: 'Transparent Always',
    description: 'No hidden fees, no jargon, no surprises. We communicate openly and honestly at every step.',
  },
  {
    icon: IconSparkles,
    title: 'Craft & Quality',
    description: 'We sweat the details others miss. Every pixel, every line of code, every interaction matters.',
  },
  {
    icon: IconRocket,
    title: 'Forward Thinking',
    description: 'Technology evolves fast. We stay ahead so your digital presence never falls behind.',
  },
];

const journeyMilestones = [
  {
    year: '2015',
    title: 'The Beginning',
    description: 'Founded with a simple mission: bring enterprise-quality digital solutions to local businesses.',
  },
  {
    year: '2017',
    title: 'First Major Milestone',
    description: 'Helped 50+ San Diego businesses transform their digital presence and reach new customers.',
  },
  {
    year: '2020',
    title: 'Expanding Services',
    description: 'Added comprehensive SEO and digital marketing to provide complete growth solutions.',
  },
  {
    year: '2023',
    title: 'Recognition',
    description: 'Named top-rated web development agency in San Diego with consistent 5-star reviews.',
  },
  {
    year: 'Today',
    title: 'Looking Forward',
    description: 'Continuing to innovate and help businesses thrive in an increasingly digital world.',
  },
];

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '9', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5.0', label: 'Google Rating' },
];

const team = [
  {
    name: 'Evan Smith',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer with a passion for crafting clean, performant web experiences. Specializing in React, Next.js, and modern web technologies.',
    avatar: 'ES',
    icon: IconCode,
  },
  {
    name: 'Samantha Smith',
    role: 'Creative Director',
    bio: 'Design strategist with an eye for creating memorable brand experiences. Combining user psychology with modern aesthetics to drive conversions.',
    avatar: 'SS',
    icon: IconPalette,
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const founderRef = useRef(null);
  const teamRef = useRef(null);
  const journeyRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const founderInView = useInView(founderRef, { once: true, margin: '-100px' });
  const journeyInView = useInView(journeyRef, { once: true, margin: '-100px' });
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
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(31, 79, 216, 0.06) 0%, transparent 70%)',
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
              right: '10%',
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.05) 0%, transparent 70%)',
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
              <Stack align="center" gap="xl" maw={800} mx="auto">
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
                    About Lucid Web Studios
                  </Badge>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Title
                    order={1}
                    ta="center"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color: '#0A1A3F',
                    }}
                  >
                    Bringing{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Clarity
                    </Text>{' '}
                    to the Digital World
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    lh={1.8}
                    style={{ color: '#5A7099' }}
                  >
                    We&apos;re a San Diego-based digital agency on a mission to help local 
                    businesses cut through the digital noise and connect with their customers 
                    in meaningful ways.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl" mt={80}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <Stack align="center" gap={4}>
                      <Text
                        fw={700}
                        style={{
                          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                          color: '#1F4FD8',
                        }}
                      >
                        {stat.value}
                      </Text>
                      <Text size="sm" style={{ color: '#5A7099' }}>
                        {stat.label}
                      </Text>
                    </Stack>
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          </Container>
        </Box>

        {/* Mission Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={missionRef}
        >
          <Container size="lg">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
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
                  Our Mission
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
                  Empowering local businesses to thrive in the digital age
                </Title>
                <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                  Too many talented local businesses struggle online—not because they lack quality, 
                  but because they lack the tools and expertise to communicate their value digitally.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Stack gap="lg">
                  <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                    We exist to change that. Our mission is to be the bridge between exceptional 
                    local services and the customers who need them—creating digital experiences 
                    that are as clear, professional, and trustworthy as the businesses they represent.
                  </Text>
                  <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                    Every website we build, every SEO strategy we implement, every piece of content 
                    we craft is designed with one goal: to help real businesses connect with real 
                    customers and grow sustainably.
                  </Text>
                  <Group gap="md" mt="md">
                    <ThemeIcon
                      size={48}
                      radius="xl"
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      }}
                    >
                      <IconCode size={24} color="#FFFFFF" stroke={1.5} />
                    </ThemeIcon>
                    <ThemeIcon
                      size={48}
                      radius="xl"
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      }}
                    >
                      <IconPalette size={24} color="#FFFFFF" stroke={1.5} />
                    </ThemeIcon>
                    <ThemeIcon
                      size={48}
                      radius="xl"
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      }}
                    >
                      <IconTrendingUp size={24} color="#FFFFFF" stroke={1.5} />
                    </ThemeIcon>
                  </Group>
                </Stack>
              </motion.div>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Values Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={valuesRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={valuesInView ? 'animate' : 'initial'}
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
                    Our Values
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
                    The Principles That Guide Us
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={600} style={{ color: '#5A7099' }}>
                    These aren&apos;t just words on a wall—they&apos;re the standards we hold 
                    ourselves to on every project.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
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
                      transition: 'box-shadow 0.3s ease',
                    }}
                  >
                    <Stack gap="md">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ThemeIcon
                          size={56}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            boxShadow: '0 4px 15px rgba(31, 79, 216, 0.25)',
                          }}
                        >
                          <value.icon size={26} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                      <Title order={4} style={{ color: '#0A1A3F' }}>
                        {value.title}
                      </Title>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        {value.description}
                      </Text>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Founder's Corner */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={founderRef}
        >
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={founderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="lg" mb={60}>
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
                  Founder&apos;s Corner
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
                  A Note From Our Founder
                </Title>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={founderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                p={{ base: 'xl', md: 60 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.03) 0%, rgba(77, 163, 255, 0.05) 100%)',
                  borderRadius: 24,
                  border: '1px solid rgba(31, 79, 216, 0.08)',
                }}
              >
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40}>
                  <Stack align="center" justify="center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Avatar
                        size={180}
                        radius="xl"
                        style={{
                          border: '4px solid #FFFFFF',
                          boxShadow: '0 10px 40px rgba(31, 79, 216, 0.2)',
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        }}
                      >
                        <IconUsers size={80} color="#FFFFFF" stroke={1} />
                      </Avatar>
                    </motion.div>
                    <Box ta="center">
                      <Text fw={700} size="lg" style={{ color: '#0A1A3F' }}>
                        Evan Smith
                      </Text>
                      <Text size="sm" style={{ color: '#5A7099' }}>
                        Founder & Lead Developer
                      </Text>
                    </Box>
                  </Stack>

                  <Box style={{ gridColumn: 'span 2' }}>
                    <IconQuote size={40} color="#1F4FD8" style={{ opacity: 0.3, marginBottom: 16 }} />
                    <Stack gap="lg">
                      <Text size="lg" lh={1.9} style={{ color: '#0A1A3F' }}>
                        I started Lucid Web Studios because I saw too many amazing local businesses 
                        struggling with outdated websites and confusing digital strategies. They 
                        deserved better.
                      </Text>
                      <Text size="lg" lh={1.9} style={{ color: '#5A7099' }}>
                        Having worked with enterprise companies, I knew the power of great digital 
                        experiences. I wanted to bring that same level of expertise to the businesses 
                        that form the backbone of our community—the family-owned restaurants, the 
                        independent contractors, the local professionals who take pride in their work.
                      </Text>
                      <Text size="lg" lh={1.9} style={{ color: '#5A7099' }}>
                        Every project we take on is personal. When your phone rings because someone 
                        found you online, when your revenue grows because customers trust what they 
                        see—that&apos;s why we do what we do. That&apos;s the clarity we bring.
                      </Text>
                      <Divider my="md" color="rgba(31, 79, 216, 0.1)" />
                      <Text size="md" fw={600} style={{ color: '#1F4FD8' }}>
                        — Evan Smith
                      </Text>
                    </Stack>
                  </Box>
                </SimpleGrid>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Team Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={teamRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={teamInView ? 'animate' : 'initial'}
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
                    Meet the Team
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
                    The People Behind Lucid
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={600} style={{ color: '#5A7099' }}>
                    A small, dedicated team focused on delivering exceptional results for every client.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" maw={900} mx="auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  whileHover={{ y: -8 }}
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
                    <Stack gap="lg" align="center" ta="center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Avatar
                          size={100}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            border: '3px solid #FFFFFF',
                            boxShadow: '0 8px 30px rgba(31, 79, 216, 0.2)',
                            fontSize: '1.5rem',
                            fontWeight: 600,
                          }}
                        >
                          {member.avatar}
                        </Avatar>
                      </motion.div>
                      <Box>
                        <Text fw={700} size="xl" mb={4} style={{ color: '#0A1A3F' }}>
                          {member.name}
                        </Text>
                        <Group gap="xs" justify="center">
                          <member.icon size={16} color="#1F4FD8" stroke={2} />
                          <Text size="sm" fw={600} style={{ color: '#1F4FD8' }}>
                            {member.role}
                          </Text>
                        </Group>
                      </Box>
                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        {member.bio}
                      </Text>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Journey Timeline */}
        <Box
          component="section"
          py={100}
          style={{ background: '#F8F9FB' }}
          ref={journeyRef}
        >
          <Container size="lg">
            <motion.div
              initial="initial"
              animate={journeyInView ? 'animate' : 'initial'}
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
                    Our Journey
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
                    Growing Together Since 2015
                  </Title>
                </motion.div>
              </Stack>
            </motion.div>

            <Stack gap={0}>
              {journeyMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={journeyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                >
                  <Group
                    align="flex-start"
                    gap="xl"
                    py="xl"
                    style={{
                      borderBottom: index < journeyMilestones.length - 1 
                        ? '1px solid rgba(10, 26, 63, 0.08)' 
                        : 'none',
                    }}
                  >
                    <Box
                      style={{
                        minWidth: 100,
                        textAlign: 'right',
                      }}
                    >
                      <Text
                        fw={700}
                        size="xl"
                        style={{
                          color: milestone.year === 'Today' ? '#1F4FD8' : '#0A1A3F',
                        }}
                      >
                        {milestone.year}
                      </Text>
                    </Box>
                    <Box
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: milestone.year === 'Today' 
                          ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)' 
                          : '#C9D2E3',
                        flexShrink: 0,
                        marginTop: 6,
                        boxShadow: milestone.year === 'Today' 
                          ? '0 0 0 4px rgba(31, 79, 216, 0.2)' 
                          : 'none',
                      }}
                    />
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="lg" mb={4} style={{ color: '#0A1A3F' }}>
                        {milestone.title}
                      </Text>
                      <Text size="md" style={{ color: '#5A7099' }}>
                        {milestone.description}
                      </Text>
                    </Box>
                  </Group>
                </motion.div>
              ))}
            </Stack>
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
                  Let&apos;s Work Together
                </Badge>

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Ready to Bring Clarity to Your Business?
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.8)' }} lh={1.8}>
                  We&apos;d love to hear about your goals and explore how we can help you 
                  achieve them. No pressure, just a friendly conversation.
                </Text>

                <Group gap="md" mt="md">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
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
                      Schedule a Call
                    </Button>
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
                      View Our Work
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
