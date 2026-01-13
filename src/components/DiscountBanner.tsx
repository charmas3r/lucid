'use client';

import { Box, Container, Text, Group, CloseButton } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackEvent, EVENTS } from '@/lib/analytics';

const BANNER_DISMISSED_KEY = 'discount-banner-dismissed';
const BANNER_HEIGHT = 44; // Approximate height in pixels

export function useDiscountBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to prevent hydration mismatch
    setHasMounted(true);
    const isDismissed = sessionStorage.getItem(BANNER_DISMISSED_KEY);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    trackEvent(EVENTS.BANNER_DISMISS, { banner: 'discount-50' });
  };

  // Only show banner after mount to prevent hydration flash
  return { 
    isVisible: hasMounted && isVisible, 
    handleDismiss, 
    bannerHeight: isVisible ? BANNER_HEIGHT : 0,
    hasMounted 
  };
}

export function DiscountBanner({ isVisible, onDismiss }: { isVisible: boolean; onDismiss: () => void }) {
  const handleClick = () => {
    trackEvent(EVENTS.BANNER_CLICK, { banner: 'discount-50' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <Box
            component="div"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF6B35 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
            }}
          >
            <style>
              {`
                @keyframes gradient-shift {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}
            </style>
            <Container size="xl">
              <Group
                justify="center"
                align="center"
                py={10}
                gap="xs"
                style={{ position: 'relative' }}
              >
                <Text
                  component={Link}
                  href="/pricing"
                  onClick={handleClick}
                  fw={700}
                  size="sm"
                  style={{
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  🎉 LIMITED TIME: 50% OFF All Services!
                  <Text
                    component="span"
                    fw={500}
                    size="sm"
                    visibleFrom="sm"
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textDecoration: 'underline',
                    }}
                  >
                    View Pricing →
                  </Text>
                </Text>

                <CloseButton
                  onClick={onDismiss}
                  size="sm"
                  style={{
                    position: 'absolute',
                    right: 0,
                    color: '#FFFFFF',
                    opacity: 0.8,
                  }}
                  aria-label="Dismiss banner"
                />
              </Group>
            </Container>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
