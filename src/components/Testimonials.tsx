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
      id="promise"
      py={100}
      style={{ background: '#081430' }}
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
              background: '#0D1F4A',
              borderRadius: 32,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Stack align="center" gap="xl">
              {/* Promise Statement */}
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
                    color: '#FFFFFF',
                  }}
                >
                  A new agency, but{' '}
                  <Text
                    component="span"
                    inherit
                    fw={600}
                    className="metallic-text"
                  >
                    not new to the craft.
                  </Text>{' '}
                  With over a decade of enterprise experience in Android, iOS, and web development,{' '}
                  <Text component="span" inherit fw={700}>
                    your project gets proven expertise
                  </Text>{' '}
                  from day one.
                </Title>
              </motion.div>

              {/* Founder Info */}
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
                      ES
                    </Avatar>
                  </motion.div>
                  <Text fw={600} style={{ color: '#FFFFFF' }}>
                    Evan Smith
                  </Text>
                  <Text size="sm" style={{ color: '#7A94BA' }}>
                    Founder & Lead Developer • 10+ Years Experience
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
                      component="a"
                      href="/contact"
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
                      component="a"
                      href="/about"
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
                      Learn about Evan
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
