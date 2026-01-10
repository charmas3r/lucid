'use client';

import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Avatar,
  Button,
  Group,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Box
      component="section"
      id="testimonials"
      py={100}
      style={{ background: '#F8F9FB' }}
      ref={ref}
    >
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            p={{ base: 'xl', md: 60 }}
            style={{
              background: '#FFFFFF',
              borderRadius: 32,
              border: '1px solid rgba(10, 26, 63, 0.06)',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(10, 26, 63, 0.04)',
            }}
          >
            <Stack align="center" gap="xl">
              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Title
                  order={2}
                  ta="center"
                  lh={1.6}
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                    fontWeight: 400,
                    color: '#0A1A3F',
                  }}
                >
                  Working with this team was an absolute{' '}
                  <Text
                    component="span"
                    inherit
                    fw={600}
                    className="metallic-text"
                  >
                    game-changer for our business.
                  </Text>{' '}
                  Their flexible approach and attention to detail helped us
                  streamline our processes and{' '}
                  <Text component="span" inherit fw={700}>
                    deliver results faster
                  </Text>{' '}
                  than we anticipated.
                </Title>
              </motion.div>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Stack align="center" gap="xs" mt="md">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Avatar
                      size="lg"
                      radius="xl"
                      src={null}
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        border: '3px solid rgba(31, 79, 216, 0.2)',
                        boxShadow: '0 4px 20px rgba(31, 79, 216, 0.2)',
                      }}
                    >
                      EJ
                    </Avatar>
                  </motion.div>
                  <Text fw={600} style={{ color: '#0A1A3F' }}>
                    Emily Johnson
                  </Text>
                  <Text size="sm" style={{ color: '#8A9BB8' }}>
                    Lead Product Manager at NextGen Innovators
                  </Text>
                </Stack>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Group gap="md" mt="xl">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      radius="xl"
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          border: 'none',
                          boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                          transition: 'box-shadow 0.2s ease',
                          '&:hover': {
                            boxShadow: '0 6px 25px rgba(77, 163, 255, 0.4)',
                          },
                        },
                      }}
                    >
                      Book a call
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      radius="xl"
                      variant="outline"
                      styles={{
                        root: {
                          borderColor: '#C9D2E3',
                          color: '#1F4FD8',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'rgba(31, 79, 216, 0.05)',
                            borderColor: '#1F4FD8',
                          },
                        },
                      }}
                    >
                      View our work
                    </Button>
                  </motion.div>
                </Group>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
