'use client';

import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Badge,
  Group,
  SimpleGrid,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';

const projects = [
  {
    title: 'Nova Memorial',
    description:
      'From complex applications to bespoke platforms, we deliver high-performance systems that align with your goals and fuel business growth.',
    image: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
    techs: ['UI/UX DESIGN', 'WEB DEVELOPMENT', 'SEO'],
    isLarge: true,
  },
  {
    title: 'Your Delivery',
    description:
      'A comprehensive delivery management platform with real-time tracking and analytics dashboard.',
    image: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
    techs: ['MOBILE APP', 'WEB APP', 'API'],
    isLarge: true,
  },
  {
    title: 'Coastal Eats',
    description:
      'Online ordering system with real-time menu management for a local restaurant chain.',
    image: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)',
    techs: ['E-COMMERCE', 'WEB DESIGN'],
    isLarge: false,
  },
  {
    title: 'TechFlow SaaS',
    description:
      'Dashboard and analytics platform for B2B workflow automation.',
    image: 'linear-gradient(135deg, #1F4FD8 0%, #3A6EA5 100%)',
    techs: ['WEB APP', 'UI/UX'],
    isLarge: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export function FeaturedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Box
      component="section"
      id="work"
      py={100}
      style={{ background: '#FFFFFF' }}
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
                Case Studies
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
                What we have delivered
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

        <Stack gap="xl">
          {projects.filter(p => p.isLarge).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              whileHover={{ scale: 1.01 }}
            >
              <Box
                p={{ base: 'lg', md: 'xl' }}
                style={{
                  background: '#F8F9FB',
                  borderRadius: 24,
                  border: '1px solid rgba(10, 26, 63, 0.06)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <SimpleGrid
                  cols={{ base: 1, md: 2 }}
                  spacing="xl"
                  style={{
                    flexDirection: index % 2 === 1 ? 'row-reverse' : 'row',
                  }}
                >
                  {/* Project Screenshot */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    style={{ order: index % 2 === 1 ? 2 : 1 }}
                  >
                    <Box
                      style={{
                        background: project.image,
                        borderRadius: 16,
                        minHeight: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 24,
                        boxShadow: '0 10px 40px rgba(31, 79, 216, 0.15)',
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                        style={{
                          width: '90%',
                          height: '85%',
                          background: 'rgba(255, 255, 255, 0.95)',
                          borderRadius: 12,
                          boxShadow: '0 20px 40px rgba(10, 26, 63, 0.15)',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          minHeight: 200,
                        }}
                      />
                    </Box>
                  </motion.div>

                  {/* Project Info */}
                  <Stack
                    gap="md"
                    justify="center"
                    style={{ order: index % 2 === 1 ? 1 : 2 }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Text size="sm" fw={600} style={{ color: '#8A9BB8' }}>
                        {project.title}
                      </Text>
                      <motion.div
                        whileHover={{ x: 3, y: -3 }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Group gap={6}>
                          <Text size="xs" fw={600} tt="uppercase" style={{ color: '#8A9BB8' }}>
                            View Project
                          </Text>
                          <IconArrowUpRight size={16} color="#8A9BB8" />
                        </Group>
                      </motion.div>
                    </Group>

                    <Title order={3} style={{ color: '#0A1A3F' }}>
                      {project.title}
                    </Title>

                    <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                      {project.description}
                    </Text>

                    <Group gap={4} mt="md">
                      {project.techs.map((tech, i) => (
                        <Group key={tech} gap={4}>
                          <Text
                            size="xs"
                            fw={500}
                            style={{ color: '#8A9BB8', letterSpacing: '0.3px' }}
                          >
                            {tech}
                          </Text>
                          {i < project.techs.length - 1 && (
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
                </SimpleGrid>
              </Box>
            </motion.div>
          ))}

          {/* Smaller projects grid */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {projects.filter(p => !p.isLarge).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: '#F8F9FB',
                    borderRadius: 24,
                    border: '1px solid rgba(10, 26, 63, 0.06)',
                    height: '100%',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <Stack gap="md">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <Box
                        style={{
                          background: project.image,
                          borderRadius: 12,
                          height: 180,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 30px rgba(31, 79, 216, 0.12)',
                        }}
                      >
                        <Box
                          style={{
                            width: '80%',
                            height: '70%',
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: 8,
                            boxShadow: '0 10px 30px rgba(10, 26, 63, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                          }}
                        />
                      </Box>
                    </motion.div>

                    <Title order={4} style={{ color: '#0A1A3F' }}>
                      {project.title}
                    </Title>

                    <Text size="sm" lh={1.6} style={{ color: '#5A7099' }}>
                      {project.description}
                    </Text>

                    <Group gap={4}>
                      {project.techs.map((tech, i) => (
                        <Group key={tech} gap={4}>
                          <Text size="xs" fw={500} style={{ color: '#8A9BB8' }}>
                            {tech}
                          </Text>
                          {i < project.techs.length - 1 && (
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
        </Stack>
      </Container>
    </Box>
  );
}
