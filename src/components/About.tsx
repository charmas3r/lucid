'use client';

import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Badge,
  SimpleGrid,
  Avatar,
  Group,
  Anchor,
  Button,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconBrandLinkedin, IconArrowRight } from '@tabler/icons-react';

const team = [
  {
    name: 'Evan Smith',
    role: 'FOUNDER & LEAD DEVELOPER',
    bio: '10+ years building Android, iOS, and web applications at enterprise companies. Former engineering manager now bringing that expertise to help local businesses compete digitally.',
    avatar: 'https://res.cloudinary.com/dssgz3ocp/image/upload/v1768193686/profile_eoxqvp.jpg',
  },
  {
    name: 'Samantha Smith',
    role: 'CREATIVE DIRECTOR',
    bio: 'Design strategist with an eye for creating memorable brand experiences. Combining user psychology with modern aesthetics to craft interfaces that delight users and drive conversions.',
    avatar: 'https://res.cloudinary.com/dssgz3ocp/image/upload/v1768193658/1000016402_fse8ij.jpg',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Box component="section" id="about" py={40} style={{ background: '#0A1A3F' }} ref={ref}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            py={80}
            px={{ base: 'xl', md: 60 }}
            style={{
              background: 'linear-gradient(180deg, #081430 0%, #0D1F4A 100%)',
              borderRadius: 32,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle background text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Text
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 'clamp(100px, 20vw, 300px)',
                  fontWeight: 800,
                  color: 'rgba(31, 79, 216, 0.03)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                lucid
              </Text>
            </motion.div>

            {/* Background accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                height: 400,
                background: 'radial-gradient(ellipse, rgba(31, 79, 216, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

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
              <Stack align="center" gap="lg" mb={60} style={{ position: 'relative' }}>
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
                    About Us
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
                    Who&apos;s behind Lucid
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={600} style={{ color: '#A5B4CF' }}>
                    A team of experienced professionals dedicated to building smart, flexible,
                    and reliable software solutions - tailored to your business needs.
                  </Text>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/about"
                      variant="outline"
                      radius="xl"
                      rightSection={<IconArrowRight size={16} />}
                      styles={{
                        root: {
                          borderColor: 'rgba(77, 163, 255, 0.5)',
                          color: '#4DA3FF',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'rgba(77, 163, 255, 0.1)',
                            borderColor: '#4DA3FF',
                          },
                        },
                      }}
                    >
                      Learn more about us
                    </Button>
                  </motion.div>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid
              cols={{ base: 1, md: 2 }}
              spacing="xl"
              maw={900}
              mx="auto"
              style={{ position: 'relative' }}
            >
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#0D1F4A',
                      borderRadius: 20,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
                      height: '100%',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  >
                    <Group gap="lg" align="flex-start">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          size={80}
                          radius="xl"
                          style={{
                            border: '2px solid rgba(77, 163, 255, 0.3)',
                            boxShadow: '0 4px 15px rgba(77, 163, 255, 0.3)',
                          }}
                        />
                      </motion.div>

                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Box>
                          <Title order={3} size="h4" mb={4} style={{ color: '#FFFFFF' }}>
                            {member.name}
                          </Title>
                          <Text
                            size="xs"
                            fw={600}
                            tt="uppercase"
                            style={{ color: '#4DA3FF', letterSpacing: '0.5px' }}
                          >
                            {member.role}
                          </Text>
                        </Box>

                        <Text size="sm" lh={1.7} style={{ color: '#A5B4CF' }}>
                          {member.bio}
                        </Text>

                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Anchor
                            href="#"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              color: '#7A94BA',
                              fontSize: '0.75rem',
                              textDecoration: 'none',
                              marginTop: 8,
                              transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#4DA3FF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#7A94BA';
                            }}
                          >
                            <IconBrandLinkedin size={16} />
                            LINKEDIN
                          </Anchor>
                        </motion.div>
                      </Stack>
                    </Group>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
