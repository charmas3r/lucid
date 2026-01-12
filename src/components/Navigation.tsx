'use client';

import {
  Group,
  Button,
  Container,
  Burger,
  Drawer,
  Stack,
  Box,
  Text,
  Collapse,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { IconChevronDown, IconCode, IconDeviceMobile, IconShoppingCart, IconSearch, IconChartBar } from '@tabler/icons-react';
import { Logo } from './Logo';
import { trackEvent, EVENTS } from '@/lib/analytics';

const serviceSubLinks = [
  { label: 'Web Development', href: '/services/web-development', icon: IconCode },
  { label: 'Mobile Apps', href: '/services/mobile-apps', icon: IconDeviceMobile },
  { label: 'E-Commerce', href: '/services/ecommerce', icon: IconShoppingCart },
  { label: 'SEO Services', href: '/services/seo-services', icon: IconSearch },
  { label: 'Conversion Optimization', href: '/services/conversion-optimization', icon: IconChartBar },
];

const navLinks = [
  { label: 'SERVICES', href: '/services', hasDropdown: true },
  { label: 'CASE STUDIES', href: '/case-studies' },
  { label: 'PRICING', href: '/pricing' },
  { label: 'ABOUT', href: '/about' },
];

export function Navigation() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isScrolled = scroll.y > 50;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 24px',
      }}
    >
      <Container size="xl">
        {/* Rounded pill navbar */}
        <div
          style={{
            backgroundColor: isScrolled 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(255, 255, 255, 0.85)',
            boxShadow: isScrolled
              ? '0 4px 30px rgba(10, 26, 63, 0.1), 0 1px 3px rgba(10, 26, 63, 0.06)'
              : '0 2px 20px rgba(10, 26, 63, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 60,
            padding: '12px 24px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <Group justify="space-between" align="center">
            {/* Logo */}
            <Link 
              href="/" 
              style={{ textDecoration: 'none' }}
              onClick={() => trackEvent(EVENTS.NAV_CLICK_LOGO)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Group gap="sm">
                  <Logo size={40} />
                  <Text
                    fw={700}
                    size="lg"
                    style={{ color: '#0A1A3F', fontFamily: 'var(--font-dm-sans)' }}
                  >
                    lucid
                  </Text>
                </Group>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <Group gap={40} visibleFrom="md">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
                >
                  {link.hasDropdown ? (
                    <>
                      <Group
                        gap={4}
                        style={{ cursor: 'pointer' }}
                      >
                        <Link
                          href={link.href}
                          style={{
                            textDecoration: 'none',
                            color: servicesOpen ? '#1F4FD8' : '#5A7099',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {link.label}
                        </Link>
                        <motion.div
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconChevronDown 
                            size={14} 
                            color={servicesOpen ? '#1F4FD8' : '#5A7099'}
                            style={{ transition: 'color 0.2s ease' }}
                          />
                        </motion.div>
                      </Group>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              position: 'absolute',
                              top: 'calc(100% + 16px)',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              minWidth: 280,
                              background: 'rgba(255, 255, 255, 0.98)',
                              backdropFilter: 'blur(20px)',
                              borderRadius: 16,
                              boxShadow: '0 10px 40px rgba(10, 26, 63, 0.12), 0 2px 10px rgba(10, 26, 63, 0.08)',
                              border: '1px solid rgba(10, 26, 63, 0.06)',
                              padding: '8px',
                              zIndex: 1001,
                            }}
                          >
                            {/* Arrow */}
                            <Box
                              style={{
                                position: 'absolute',
                                top: -6,
                                left: '50%',
                                transform: 'translateX(-50%) rotate(45deg)',
                                width: 12,
                                height: 12,
                                background: 'rgba(255, 255, 255, 0.98)',
                                borderTop: '1px solid rgba(10, 26, 63, 0.06)',
                                borderLeft: '1px solid rgba(10, 26, 63, 0.06)',
                              }}
                            />
                            
                            <Stack gap={4}>
                              {serviceSubLinks.map((subLink, subIndex) => (
                                <motion.div
                                  key={subLink.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                                >
                                  <Link
                                    href={subLink.href}
                                    style={{ textDecoration: 'none' }}
                                    onClick={() => trackEvent(EVENTS.NAV_CLICK_DROPDOWN, { item: subLink.label })}
                                  >
                                    <motion.div
                                      whileHover={{ x: 4 }}
                                      transition={{ duration: 0.15 }}
                                    >
                                      <Group
                                        gap="sm"
                                        p="sm"
                                        style={{
                                          borderRadius: 10,
                                          transition: 'background 0.15s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background = 'rgba(31, 79, 216, 0.06)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background = 'transparent';
                                        }}
                                      >
                                        <Box
                                          style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 10,
                                            background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.1) 0%, rgba(31, 79, 216, 0.1) 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <subLink.icon size={18} color="#1F4FD8" stroke={1.5} />
                                        </Box>
                                        <Text
                                          size="sm"
                                          fw={500}
                                          style={{ color: '#0A1A3F', whiteSpace: 'nowrap' }}
                                        >
                                          {subLink.label}
                                        </Text>
                                      </Group>
                                    </motion.div>
                                  </Link>
                                </motion.div>
                              ))}
                            </Stack>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      style={{
                        textDecoration: 'none',
                        color: '#5A7099',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                        transition: 'color 0.2s ease',
                      }}
                      onClick={() => trackEvent(EVENTS.NAV_CLICK_MENU_ITEM, { item: link.label })}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1F4FD8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#5A7099';
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </Group>

            {/* CTA Button */}
            <Group gap="md">
              <Button
                component={Link}
                href="/contact"
                radius="xl"
                visibleFrom="sm"
                onClick={() => trackEvent(EVENTS.CTA_CLICK_CONTACT, { location: 'nav' })}
                styles={{
                  root: {
                    background: '#0A1A3F',
                    border: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: '#1F4FD8',
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                Let&apos;s talk
              </Button>
              <Burger
                opened={opened}
                onClick={() => {
                  toggle();
                  trackEvent(opened ? EVENTS.NAV_CLOSE_MOBILE_MENU : EVENTS.NAV_OPEN_MOBILE_MENU);
                }}
                hiddenFrom="md"
                color="#0A1A3F"
                size="sm"
              />
            </Group>
          </Group>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {opened && (
          <Drawer
            opened={opened}
            onClose={() => {
              close();
              setMobileServicesOpen(false);
            }}
            size="100%"
            padding="xl"
            hiddenFrom="md"
            styles={{
              body: { background: '#FFFFFF', height: '100%' },
              header: { background: '#FFFFFF' },
            }}
          >
            <Stack gap="xl" mt="xl">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  {link.hasDropdown ? (
                    <Box>
                      <Group
                        justify="space-between"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      >
                        <Text
                          style={{
                            color: '#0A1A3F',
                            fontSize: '1.25rem',
                            fontWeight: 600,
                          }}
                        >
                          {link.label}
                        </Text>
                        <motion.div
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconChevronDown size={20} color="#0A1A3F" />
                        </motion.div>
                      </Group>
                      
                      <Collapse in={mobileServicesOpen}>
                        <Stack gap="md" mt="md" ml="md">
                          {serviceSubLinks.map((subLink, subIndex) => (
                            <motion.div
                              key={subLink.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: mobileServicesOpen ? 1 : 0, x: mobileServicesOpen ? 0 : -10 }}
                              transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                            >
                              <Link
                                href={subLink.href}
                                onClick={() => {
                                  close();
                                  trackEvent(EVENTS.NAV_CLICK_DROPDOWN, { item: subLink.label, source: 'mobile' });
                                }}
                                style={{ textDecoration: 'none' }}
                              >
                                <Group gap="sm">
                                  <Box
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: 8,
                                      background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.1) 0%, rgba(31, 79, 216, 0.1) 100%)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <subLink.icon size={16} color="#1F4FD8" stroke={1.5} />
                                  </Box>
                                  <Text
                                    size="md"
                                    fw={500}
                                    style={{ color: '#5A7099' }}
                                  >
                                    {subLink.label}
                                  </Text>
                                </Group>
                              </Link>
                            </motion.div>
                          ))}
                          
                          {/* View All Services link */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: mobileServicesOpen ? 1 : 0 }}
                            transition={{ delay: 0.2, duration: 0.2 }}
                          >
                            <Link
                              href="/services"
                              onClick={() => {
                                close();
                                trackEvent(EVENTS.NAV_CLICK_MENU_ITEM, { item: 'View All Services', source: 'mobile' });
                              }}
                              style={{ textDecoration: 'none' }}
                            >
                              <Text
                                size="sm"
                                fw={600}
                                style={{ color: '#1F4FD8' }}
                              >
                                View All Services →
                              </Text>
                            </Link>
                          </motion.div>
                        </Stack>
                      </Collapse>
                    </Box>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => {
                        close();
                        trackEvent(EVENTS.NAV_CLICK_MENU_ITEM, { item: link.label, source: 'mobile' });
                      }}
                      style={{
                        textDecoration: 'none',
                        color: '#0A1A3F',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Button
                  radius="xl"
                  size="lg"
                  mt="xl"
                  fullWidth
                  component={Link}
                  href="/contact"
                  onClick={() => {
                    close();
                    trackEvent(EVENTS.CTA_CLICK_CONTACT, { location: 'mobile_nav' });
                  }}
                  styles={{
                    root: {
                      background: '#0A1A3F',
                      border: 'none',
                    },
                  }}
                >
                  Let&apos;s talk
                </Button>
              </motion.div>
            </Stack>
          </Drawer>
        )}
      </AnimatePresence>
    </header>
  );
}
