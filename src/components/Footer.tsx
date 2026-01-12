'use client';

import {
  Container,
  Group,
  Text,
  Box,
  Divider,
  Anchor,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandX,
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent, EVENTS } from '@/lib/analytics';

const socialLinks = [
  { icon: IconBrandFacebook, href: '#', label: 'Facebook' },
  { icon: IconBrandLinkedin, href: '#', label: 'LinkedIn' },
  { icon: IconBrandInstagram, href: '#', label: 'Instagram' },
  { icon: IconBrandX, href: '#', label: 'X' },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <Box
      component="footer"
      py={40}
      style={{
        background: '#081430',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      ref={ref}
    >
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Group justify="space-between" align="center" mb="xl">
            {/* Logo and tagline */}
            <Box>
              <Link 
                href="/" 
                style={{ textDecoration: 'none' }}
                onClick={() => trackEvent(EVENTS.FOOTER_CLICK_LINK, { item: 'logo' })}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Image
                    src="/logo.png"
                    alt="Lucid Web Studios"
                    width={120}
                    height={39}
                    style={{ height: 39, width: 'auto', marginBottom: 8 }}
                  />
                </motion.div>
              </Link>
              <Text size="sm" style={{ color: '#7A94BA' }}>
                Your digital partner for clarity
              </Text>
            </Box>

            {/* Social links */}
            <Group gap="md">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Anchor
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                    onClick={() => trackEvent(EVENTS.FOOTER_CLICK_SOCIAL, { platform: social.label })}
                    style={{
                      color: '#7A94BA',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#4DA3FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#7A94BA';
                    }}
                  >
                    <social.icon size={20} stroke={1.5} />
                  </Anchor>
                </motion.div>
              ))}
            </Group>
          </Group>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
        >
          <Divider color="rgba(255, 255, 255, 0.08)" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Text size="xs" style={{ color: '#7A94BA' }} mt="xl">
            © {new Date().getFullYear()} Lucid Web Studios. All rights reserved
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
}
