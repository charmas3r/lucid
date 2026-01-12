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
  Button,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { getFeaturedCaseStudies, urlFor } from '@/lib/sanity';
import { trackEvent, EVENTS } from '@/lib/analytics';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

interface ProjectImage {
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  gradient: string;
  services: string[];
  isLarge?: boolean;
  slug: { current: string };
  image?: ProjectImage;
}

export function FeaturedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const sanityProjects = await getFeaturedCaseStudies();
        if (sanityProjects && sanityProjects.length > 0) {
          // Transform Sanity data to match our format
          const transformedProjects: Project[] = sanityProjects.map((p, index) => ({
            _id: p._id,
            title: p.title,
            description: p.description,
            gradient: p.gradient || 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
            services: p.services || [],
            isLarge: index < 2, // First 2 are large
            slug: p.slug,
            image: p.image,
          }));
          setProjects(transformedProjects);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);
  
  // Don't render the section if there are no case studies
  if (!isLoading && projects.length === 0) {
    return null;
  }

  const largeProjects = projects.filter(p => p.isLarge);
  const smallProjects = projects.filter(p => !p.isLarge);

  // Helper to get image URL
  const getImageUrl = (image: ProjectImage | undefined, width: number, height: number) => {
    if (!image?.asset?._ref) return null;
    return urlFor(image).width(width).height(height).quality(90).url();
  };

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
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  component={Link}
                  href="/case-studies"
                  size="lg"
                  radius="xl"
                  rightSection={<IconArrowRight size={18} />}
                  styles={{
                    root: {
                      background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      border: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(31, 79, 216, 0.3)',
                      },
                    },
                  }}
                  onClick={() => trackEvent(EVENTS.CASE_STUDY_VIEW, { source: 'featured_work_cta' })}
                >
                  View All Case Studies
                </Button>
              </motion.div>
            </motion.div>
          </Stack>
        </motion.div>

        <Stack gap="xl">
          {largeProjects.map((project, index) => {
            const imageUrl = getImageUrl(project.image, 800, 500);
            
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => trackEvent(EVENTS.CASE_STUDY_VIEW, { study: project.title, source: 'featured_work' })}
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
                      {imageUrl ? (
                        <Box
                          style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            boxShadow: '0 10px 40px rgba(10, 26, 63, 0.12)',
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                          >
                            <Image
                              src={imageUrl}
                              alt={project.image?.alt || project.title}
                              width={800}
                              height={500}
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          </motion.div>
                        </Box>
                      ) : (
                        <Box
                          style={{
                            background: project.gradient,
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
                      )}
                    </motion.div>

                    {/* Project Info */}
                    <Stack
                      gap="md"
                      justify="center"
                      style={{ order: index % 2 === 1 ? 1 : 2 }}
                    >
                      <Text size="sm" fw={600} style={{ color: '#8A9BB8' }}>
                        {project.title}
                      </Text>

                      <Title order={3} style={{ color: '#0A1A3F' }}>
                        {project.title}
                      </Title>

                      <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
                        {project.description}
                      </Text>

                      <Group gap={4} mt="md">
                        {project.services.map((tech, i) => (
                          <Group key={tech} gap={4}>
                            <Text
                              size="xs"
                              fw={500}
                              style={{ color: '#8A9BB8', letterSpacing: '0.3px' }}
                            >
                              {tech}
                            </Text>
                            {i < project.services.length - 1 && (
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
            );
          })}

          {/* Smaller projects grid */}
          {smallProjects.length > 0 && (
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {smallProjects.map((project, index) => {
                const imageUrl = getImageUrl(project.image, 600, 400);
                
                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => trackEvent(EVENTS.CASE_STUDY_VIEW, { study: project.title, source: 'featured_work' })}
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
                          {imageUrl ? (
                            <Box
                              style={{
                                borderRadius: 12,
                                overflow: 'hidden',
                                boxShadow: '0 8px 30px rgba(10, 26, 63, 0.1)',
                              }}
                            >
                              <Image
                                src={imageUrl}
                                alt={project.image?.alt || project.title}
                                width={600}
                                height={400}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                  objectFit: 'cover',
                                  display: 'block',
                                }}
                              />
                            </Box>
                          ) : (
                            <Box
                              style={{
                                background: project.gradient,
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
                          )}
                        </motion.div>

                        <Title order={4} style={{ color: '#0A1A3F' }}>
                          {project.title}
                        </Title>

                        <Text size="sm" lh={1.6} style={{ color: '#5A7099' }}>
                          {project.description}
                        </Text>

                        <Group gap={4}>
                          {project.services.map((tech, i) => (
                            <Group key={tech} gap={4}>
                              <Text size="xs" fw={500} style={{ color: '#8A9BB8' }}>
                                {tech}
                              </Text>
                              {i < project.services.length - 1 && (
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
                );
              })}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
