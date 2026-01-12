'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Box,
  ThemeIcon,
} from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconFileSearch } from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';

export default function CaseStudyNotFound() {
  return (
    <>
      <Navigation />
      <Box
        component="main"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #F8F9FB 0%, #FFFFFF 100%)',
        }}
      >
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack align="center" gap="xl" ta="center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ThemeIcon
                  size={120}
                  radius="xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.1) 0%, rgba(77, 163, 255, 0.1) 100%)',
                    border: '1px solid rgba(31, 79, 216, 0.15)',
                  }}
                >
                  <IconFileSearch size={60} color="#1F4FD8" stroke={1.5} />
                </ThemeIcon>
              </motion.div>

              <Stack gap="md">
                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#0A1A3F',
                  }}
                >
                  Case Study Not Found
                </Title>
                <Text size="lg" style={{ color: '#5A7099' }} maw={450}>
                  We couldn&apos;t find the case study you&apos;re looking for. 
                  It may have been moved or is no longer available.
                </Text>
              </Stack>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  component={Link}
                  href="/case-studies"
                  size="lg"
                  radius="xl"
                  leftSection={<IconArrowLeft size={18} />}
                  styles={{
                    root: {
                      background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                    },
                  }}
                >
                  Browse All Case Studies
                </Button>
              </motion.div>
            </Stack>
          </motion.div>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
