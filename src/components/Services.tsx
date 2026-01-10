'use client';

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Box,
  Stack,
  Badge,
  Group,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconWorld,
  IconMail,
  IconSettings,
} from '@tabler/icons-react';

const services = [
  {
    icon: IconDeviceDesktop,
    title: 'Web Apps',
    subtitle: 'DEV & SUPPORT',
    description:
      'From complex applications to bespoke platforms, we deliver high-performance systems that align with your goals and fuel business growth.',
    techs: ['REACT', 'NEXTJS', 'NESTJS', 'TYPESCRIPT'],
  },
  {
    icon: IconDeviceMobile,
    title: 'Mobile Apps',
    subtitle: 'DEV & SUPPORT',
    description:
      'We create mobile applications with a modern design that enhance the user experience.',
    techs: ['IOS', 'ANDROID', 'REACT NATIVE'],
  },
  {
    icon: IconWorld,
    title: 'Business Websites',
    subtitle: 'DEV & SUPPORT',
    description:
      'We create personalized websites that reflect the unique identity of your brand.',
    techs: ['WORDPRESS', 'STRAPI', 'WEBFLOW'],
  },
  {
    icon: IconMail,
    title: 'Product & Marketing Landing Pages',
    subtitle: 'DEV & SUPPORT',
    description:
      'We create effective landing pages that engage your audience, showcase the value of your products, and ensure they receive the attention they deserve.',
    techs: ['A/B TESTING', 'SEO', 'FRAMER'],
  },
  {
    icon: IconSettings,
    title: 'Technical team as a service',
    subtitle: 'BUILDING & MANAGING',
    description:
      'Whether you need ongoing technical support or assistance on demand, we can provide a flexible and professional extension to your team.',
    techs: ['PROJECT MANAGEMENT', 'PROGRAMMING', 'UX/UI DESIGN'],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Box
      component="section"
      id="services"
      py={100}
      style={{ background: '#F8F9FB' }}
      ref={ref}
    >
      <Container size="xl">
        <motion.div
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
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
                Services
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
                What we can do for you
              </Title>
            </motion.div>
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Text size="lg" ta="center" maw={600} style={{ color: '#5A7099' }}>
                From new digital projects to process optimization and support,
                we partner with businesses to deliver impactful results.
              </Text>
            </motion.div>
          </Stack>
        </motion.div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Box
                p="xl"
                style={{
                  background: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid rgba(10, 26, 63, 0.06)',
                  boxShadow: '0 1px 3px rgba(10, 26, 63, 0.04)',
                  height: '100%',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                }}
              >
                <Stack gap="md">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Box
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.1) 0%, rgba(77, 163, 255, 0.08) 100%)',
                        border: '1px solid rgba(31, 79, 216, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <service.icon size={26} color="#1F4FD8" stroke={1.5} />
                    </Box>
                  </motion.div>

                  <Box>
                    <Title order={3} size="h4" mb={4} style={{ color: '#0A1A3F' }}>
                      {service.title}
                    </Title>
                    <Text
                      size="xs"
                      tt="uppercase"
                      fw={600}
                      style={{ color: '#8A9BB8', letterSpacing: '0.5px' }}
                    >
                      {service.subtitle}
                    </Text>
                  </Box>

                  <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                    {service.description}
                  </Text>

                  <Group gap={4} mt="xs">
                    {service.techs.map((tech, i) => (
                      <Group key={tech} gap={4}>
                        <Text
                          size="xs"
                          fw={500}
                          style={{ color: '#8A9BB8', letterSpacing: '0.3px' }}
                        >
                          {tech}
                        </Text>
                        {i < service.techs.length - 1 && (
                          <Box
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              background: '#1F4FD8',
                            }}
                          />
                        )}
                      </Group>
                    ))}
                  </Group>
                </Stack>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
