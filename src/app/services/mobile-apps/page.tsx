'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Box,
  Badge,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Group,
  List,
  Divider,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  IconDeviceMobile,
  IconArrowRight,
  IconCheck,
  IconBrandReactNative,
  IconApi,
  IconRocket,
  IconBolt,
  IconDevices,
  IconPlugConnected,
  IconPresentation,
  IconUsers,
  IconCloud,
  IconApps,
  IconBrandApple,
  IconBrandAndroid,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const services = [
  {
    icon: IconPresentation,
    title: 'MVP & Prototyping',
    description:
      'Got a big idea? We build polished prototypes that wow investors. From concept to clickable demo, get VC-ready in weeks, not months.',
    features: [
      'Interactive prototypes',
      'Investor-ready demos',
      'Rapid 4-6 week delivery',
      'User flow validation',
    ],
  },
  {
    icon: IconApps,
    title: 'Custom App Development',
    description:
      'Full-scale mobile applications built from scratch. Native performance, custom features, and an experience tailored to your exact requirements.',
    features: [
      'iOS & Android from one codebase',
      'Offline-first architecture',
      'Push notifications',
      'Biometric authentication',
    ],
  },
  {
    icon: IconPlugConnected,
    title: 'Third-Party Integrations',
    description:
      'Connect your app to the tools you already use. From Mindbody to Square, from custom CRMs to payment processors—we make it seamless.',
    features: [
      'Mindbody & wellness platforms',
      'Square & payment processing',
      'Salesforce & CRM systems',
      'Custom API connections',
    ],
  },
];

const platforms = [
  {
    icon: IconBrandApple,
    name: 'iOS',
    description: 'Native iOS experience with App Store optimization',
  },
  {
    icon: IconBrandAndroid,
    name: 'Android',
    description: 'Play Store ready with Material Design',
  },
  {
    icon: IconDevices,
    name: 'Cross-Platform',
    description: 'One codebase, all devices, native performance',
  },
];

const crossPlatformBenefits = [
  {
    icon: IconBolt,
    title: 'Faster Time to Market',
    description:
      'Launch on iOS and Android simultaneously. No waiting for separate development cycles—get to market 40% faster.',
  },
  {
    icon: IconUsers,
    title: 'Reach Everyone',
    description:
      'Don\'t choose between Apple and Android users. With cross-platform development, you reach 100% of your potential market.',
  },
  {
    icon: IconCloud,
    title: 'Lower Development Cost',
    description:
      'One team, one codebase, two platforms. You save 30-40% compared to building separate native apps.',
  },
  {
    icon: IconRocket,
    title: 'Easier Maintenance',
    description:
      'Updates and bug fixes deploy once and work everywhere. No duplicate effort, no version discrepancies.',
  },
];

// Brand Logo Components
const MindbodyLogo = () => (
  <svg viewBox="0 0 100 24" fill="none" height="20" style={{ minWidth: 80 }}>
    <text x="0" y="18" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="700" fill="#00B2A9">MINDBODY</text>
  </svg>
);

const SquareLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" height="22" width="22">
    <rect width="24" height="24" rx="4" fill="#000000"/>
    <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
  </svg>
);

const StripeLogo = () => (
  <svg viewBox="0 0 60 25" fill="none" height="22" style={{ minWidth: 50 }}>
    <path d="M5 10.1c0-.6.5-1 1.2-1 1.1 0 2.5.4 3.6 1V6.5c-1.2-.5-2.4-.7-3.6-.7C3.4 5.8 1 7.5 1 10.3c0 4.4 6 3.7 6 5.6 0 .7-.6 1-1.4 1-1.2 0-2.8-.5-4.1-1.2v3.7c1.4.6 2.8.9 4.1.9 2.9 0 4.9-1.4 4.9-4.3C10.5 11.4 5 12.2 5 10.1zm11.6-4.1l-3.5.7v3.5l3.5-.7V6zm0 4.2h-3.5v9.6h3.5V10.2zm4.7 0l-.2-1.4h-3.1v11h3.5v-7.5c.8-1.1 2.2-.9 2.6-.8V8.2c-.5-.2-2.1-.5-2.8 2zm6.7-3.9c-1.3 0-2.2.6-2.6 1l-.2-.8h-3.1v14l3.5-.7v-3.4c.5.3 1.2.8 2.3.8 2.4 0 4.5-1.9 4.5-6.1.1-3.8-2.1-4.8-4.4-4.8zm-.8 7.4c-.8 0-1.2-.3-1.5-.6v-4.9c.3-.4.8-.6 1.5-.6 1.2 0 2 1.3 2 3 0 1.8-.8 3.1-2 3.1zm13.2 0c0 2.2 1.1 3.9 3.2 3.9 1 0 1.8-.2 2.6-.5v-2.8c-.6.3-1.3.5-1.8.5-.8 0-1.1-.4-1.1-1.3v-5h1.9V8.2h-1.9V5.1l-3.5.7v2.4h-1.3v2.5h1.3v3zm-2.4-3.5h-3.5v9.6H38V10.2z" fill="#635BFF"/>
  </svg>
);

const SalesforceLogo = () => (
  <svg viewBox="0 0 100 70" fill="none" height="22" style={{ minWidth: 65 }}>
    <path d="M41.5 14c3.5-3.6 8.4-5.9 13.8-5.9 7.3 0 13.7 4.1 17 10.1 2.8-1.2 5.9-1.9 9.1-1.9 12.5 0 22.6 10.1 22.6 22.6s-10.1 22.6-22.6 22.6c-1.7 0-3.4-.2-5-.5-2.9 5.2-8.4 8.7-14.8 8.7-2.8 0-5.4-.7-7.7-1.9-2.9 4.4-7.9 7.3-13.5 7.3-6.4 0-12-3.7-14.6-9.1-1.1.2-2.2.3-3.4.3C10.1 66.3 0 56.2 0 43.9s10.1-22.4 22.4-22.4c2.5 0 4.9.4 7.2 1.2C32.5 17.8 36.7 14 41.5 14z" fill="#00A1E0"/>
  </svg>
);

const HubSpotLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" height="22" width="22">
    <path d="M18.16 7.58v3.36a2.58 2.58 0 0 0-1.1-.25 2.61 2.61 0 0 0-2.61 2.61v.15l-2.07-2.07V5.78a1.83 1.83 0 1 0-1.31 0v5.6l-2.07 2.07v-.15a2.61 2.61 0 0 0-2.61-2.61 2.58 2.58 0 0 0-1.1.25V7.58a1.47 1.47 0 1 0-1.31 0v4.03a2.61 2.61 0 1 0 4.62 2.22l2.47-2.47 2.47 2.47a2.61 2.61 0 1 0 4.62-2.22V7.58a1.47 1.47 0 1 0-1.31 0z" fill="#FF7A59"/>
  </svg>
);

const TwilioLogo = () => (
  <svg viewBox="0 0 30 30" fill="none" height="22" width="22">
    <circle cx="15" cy="15" r="15" fill="#F22F46"/>
    <circle cx="11" cy="11" r="2.5" fill="white"/>
    <circle cx="19" cy="11" r="2.5" fill="white"/>
    <circle cx="11" cy="19" r="2.5" fill="white"/>
    <circle cx="19" cy="19" r="2.5" fill="white"/>
  </svg>
);

const FirebaseLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" height="22" width="22">
    <path d="M3.89 15.67L6.06 2.62a.47.47 0 0 1 .88-.14l2.32 4.33-5.37 8.86z" fill="#FFA000"/>
    <path d="M20.11 18.46L17.78 4.27a.47.47 0 0 0-.81-.22L3.89 15.67l7.25 4.19a1.41 1.41 0 0 0 1.41 0l7.56-4.4z" fill="#F57C00"/>
    <path d="M9.26 6.81l-2.3-4.41a.47.47 0 0 0-.88.14L3.89 15.67l5.37-8.86z" fill="#FFCA28"/>
    <path d="M20.11 18.46l-2.33-14.19a.47.47 0 0 0-.81-.22l-2.4 2.54-4.97 8.24 1.54 4.73a1.41 1.41 0 0 0 1.41 0l7.56-4.4z" fill="#F57C00"/>
    <path d="M20.11 18.46L12.55 19.86a1.41 1.41 0 0 1-1.41 0L3.89 15.67 12 21.9l8.11-3.44z" fill="#FFA000"/>
  </svg>
);

const AWSLogo = () => (
  <svg viewBox="0 0 60 36" fill="none" height="20" style={{ minWidth: 45 }}>
    <path d="M17.1 13.2l-1.9 6.2-1.9-6.2h-2.7l3.3 9h2.5l3.3-9h-2.6zm6.8 9.2c2.6 0 4.2-1.6 4.2-4.7 0-3-1.6-4.7-4.2-4.7-2.6 0-4.2 1.7-4.2 4.7 0 3.1 1.6 4.7 4.2 4.7zm0-2c-1 0-1.6-.8-1.6-2.7s.6-2.7 1.6-2.7 1.6.8 1.6 2.7-.6 2.7-1.6 2.7zm8.8 2c2.3 0 3.6-1.2 3.8-3h-2.4c-.1.7-.5 1.1-1.3 1.1-.9 0-1.5-.8-1.5-2.7s.6-2.7 1.5-2.7c.8 0 1.2.4 1.3 1.1h2.4c-.2-1.8-1.5-3-3.8-3-2.6 0-4.1 1.7-4.1 4.6 0 3 1.5 4.6 4.1 4.6z" fill="#252F3E"/>
    <path d="M4.7 25.2c5 3.7 12.3 5.7 18.6 5.7 8.8 0 16.7-3.2 22.7-8.6.5-.4.1-1-.5-.7-6.5 3.8-14.5 6-22.8 6-5.5 0-11.5-1.1-17.1-3.5-.8-.4-1.5.5-.9 1.1z" fill="#FF9900"/>
    <path d="M2.5 22.9c-.7-.9-.7-6.6 0-7.5.4-.5 2.7-.2 3.6-.1.8.1.9.7.5 1.1l-1.2 1.4c-.2.3-.2.6 0 .9l1.2 1.4c.4.4.3 1-.5 1.1-.9.1-3.2.4-3.6-.3z" fill="#FF9900"/>
  </svg>
);

const GoogleMapsLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" height="22" width="22">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
    <circle cx="12" cy="9" r="2.5" fill="white"/>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84l5.59-7.59 5.59 7.59C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7z" fill="#34A853"/>
    <path d="M12 2v6.25l5.59 7.59C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7z" fill="#FBBC04"/>
    <path d="M6.41 13.84C7.55 15.56 9.22 17.7 12 22c2.78-4.3 4.45-6.44 5.59-8.16L12 6.25 6.41 13.84z" fill="#EA4335"/>
  </svg>
);

const ApplePayLogo = () => (
  <svg viewBox="0 0 50 21" fill="none" height="18" style={{ minWidth: 45 }}>
    <path d="M9.2 2.7c-.6.7-1.5 1.3-2.4 1.2-.1-.9.3-1.9.8-2.5.6-.7 1.6-1.2 2.4-1.3.1 1-.3 1.9-.8 2.6zm.8 1.3c-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7C2.7 4.2 1.3 5.3.5 7c-1.6 2.8-.4 6.8 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 2.9-.7 1.4 0 1.7.7 2.9.7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-1-2.5-3.7-.1-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8l-.6-.6z" fill="black"/>
    <path d="M20.2 1.2c3.5 0 5.9 2.4 5.9 5.9 0 3.5-2.5 5.9-6 5.9h-3.9v6.2h-2.8V1.2h6.8zm-4 9.5h3.2c2.4 0 3.8-1.3 3.8-3.6 0-2.3-1.4-3.6-3.8-3.6h-3.2v7.2z" fill="black"/>
    <path d="M27 15c0-2.3 1.8-3.7 4.9-3.9l3.6-.2v-1c0-1.5-1-2.3-2.6-2.3-1.5 0-2.5.7-2.7 1.9H27.6c.1-2.3 2.1-4 5.3-4 3.1 0 5.1 1.6 5.1 4.2v8.5h-2.6v-2h-.1c-.8 1.4-2.3 2.3-4 2.3-2.5 0-4.3-1.5-4.3-3.5zm8.5-1.1v-1l-3.2.2c-1.6.1-2.5.8-2.5 1.9 0 1.1 1 1.9 2.4 1.9 1.9 0 3.3-1.3 3.3-3z" fill="black"/>
    <path d="M40 21.2v-2.1c.2 0 .6.1.8.1 1.2 0 1.8-.5 2.2-1.8l.2-.7-4.7-13h3l3.2 10.5h.1l3.2-10.5h2.9l-4.9 14c-1.1 3.2-2.4 4.2-5.1 4.2-.3-.1-.7-.1-.9-.7z" fill="black"/>
  </svg>
);

const GooglePayLogo = () => (
  <svg viewBox="0 0 48 20" fill="none" height="18" style={{ minWidth: 50 }}>
    <path d="M22.7 9.8v5.7h-1.8V1.8h4.8c1.2 0 2.2.4 3 1.1.9.7 1.3 1.7 1.3 2.8 0 1.2-.4 2.1-1.3 2.8-.8.7-1.8 1.1-3 1.1h-3v.2zm0-6.3v4.6h3c.7 0 1.3-.2 1.8-.7.5-.5.7-1 .7-1.6 0-.6-.2-1.2-.7-1.6-.5-.5-1.1-.7-1.8-.7h-3z" fill="#5F6368"/>
    <path d="M34 5.8c1.3 0 2.4.4 3.2 1.1.8.7 1.2 1.7 1.2 3v5.7h-1.7v-1.3h-.1c-.7 1.1-1.7 1.6-3 1.6-1.1 0-2-.3-2.7-.9-.7-.6-1-1.4-1-2.3 0-1 .4-1.8 1.1-2.4.7-.6 1.7-.9 2.9-.9 1 0 1.9.2 2.5.6v-.4c0-.6-.3-1.2-.8-1.6-.5-.4-1.1-.7-1.8-.7-.9 0-1.7.4-2.2 1.2l-1.6-.9c.8-1.2 2-1.8 3.6-1.8h.4zm-2.4 7.1c0 .5.2.8.6 1.1.4.3.9.5 1.4.5.8 0 1.5-.3 2-.8.6-.6.9-1.2.9-2-.5-.5-1.3-.7-2.3-.7-.8 0-1.4.2-1.9.5-.4.3-.7.8-.7 1.4z" fill="#5F6368"/>
    <path d="M47.8 6.1l-6.1 13.7h-1.9l2.3-4.9-4-8.8h2l2.9 6.7h.1l2.8-6.7h1.9z" fill="#5F6368"/>
    <path d="M15.4 8.5c0-.5 0-1-.1-1.5H7.9v2.8h4.2c-.2.9-.7 1.7-1.5 2.2v1.8h2.4c1.4-1.3 2.2-3.2 2.4-5.3z" fill="#4285F4"/>
    <path d="M7.9 15.5c2 0 3.7-.7 4.9-1.8l-2.4-1.8c-.7.4-1.5.7-2.5.7-1.9 0-3.6-1.3-4.1-3h-2.5v1.9c1.3 2.4 3.8 4 6.6 4z" fill="#34A853"/>
    <path d="M3.8 9.6c-.2-.5-.2-1.1 0-1.6V6.1H1.3c-.7 1.4-.7 3 0 4.4l2.5-1.9z" fill="#FBBC04"/>
    <path d="M7.9 4.6c1.1 0 2.1.4 2.8 1.1l2.1-2.1C11.6 2.4 9.9 1.8 7.9 1.8 5.1 1.8 2.6 3.4 1.3 5.8l2.5 1.9c.5-1.7 2.2-3.1 4.1-3.1z" fill="#EA4335"/>
  </svg>
);

const ZapierLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" height="22" width="22">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 9.5l-2.8 2.8 2.8 2.8c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3s-.5-.1-.7-.3l-2.8-2.8-2.8 2.8c-.2.2-.5.3-.7.3s-.5-.1-.7-.3c-.4-.4-.4-1 0-1.4l2.8-2.8-2.8-2.8c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l2.8 2.8 2.8-2.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4z" fill="#FF4A00"/>
  </svg>
);

const integrations = [
  { name: 'Mindbody', logo: MindbodyLogo },
  { name: 'Square', logo: SquareLogo },
  { name: 'Stripe', logo: StripeLogo },
  { name: 'Salesforce', logo: SalesforceLogo },
  { name: 'HubSpot', logo: HubSpotLogo },
  { name: 'Twilio', logo: TwilioLogo },
  { name: 'Firebase', logo: FirebaseLogo },
  { name: 'AWS', logo: AWSLogo },
  { name: 'Google Maps', logo: GoogleMapsLogo },
  { name: 'Apple Pay', logo: ApplePayLogo },
  { name: 'Google Pay', logo: GooglePayLogo },
  { name: 'Zapier', logo: ZapierLogo },
];

export default function MobileAppsPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const crossPlatformRef = useRef(null);
  const integrationsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const crossPlatformInView = useInView(crossPlatformRef, { once: true, margin: '-100px' });
  const integrationsInView = useInView(integrationsRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <Box
          component="section"
          pt={160}
          pb={100}
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={heroRef}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: 450,
              height: 450,
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <Container size="xl" style={{ position: 'relative' }}>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={heroInView ? 'animate' : 'initial'}
            >
              <Stack align="center" gap="xl">
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
                    Mobile App Development
                  </Badge>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Title
                    order={1}
                    ta="center"
                    maw={900}
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: '#0A1A3F',
                    }}
                  >
                    Your App.{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #4DA3FF 0%, #3A6EA5 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Every Platform.
                    </Text>
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    maw={750}
                    lh={1.8}
                    style={{ color: '#5A7099' }}
                  >
                    From investor-ready MVPs to enterprise-scale applications—we build
                    cross-platform mobile experiences that feel native, perform brilliantly,
                    and connect to everything your business needs.
                  </Text>
                </motion.div>

                {/* Platform Icons */}
                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap={40} mt="xl">
                    {platforms.map((platform, index) => (
                      <motion.div
                        key={platform.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Stack align="center" gap="xs">
                          <ThemeIcon
                            size={60}
                            radius="xl"
                            style={{
                              background: 'rgba(31, 79, 216, 0.08)',
                              border: '1px solid rgba(31, 79, 216, 0.15)',
                            }}
                          >
                            <platform.icon size={28} color="#1F4FD8" stroke={1.5} />
                          </ThemeIcon>
                          <Text fw={600} style={{ color: '#0A1A3F' }}>
                            {platform.name}
                          </Text>
                          <Text size="xs" ta="center" maw={150} style={{ color: '#8A9BB8' }}>
                            {platform.description}
                          </Text>
                        </Stack>
                      </motion.div>
                    ))}
                  </Group>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap="md" mt="md">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        component={Link}
                        href="/contact"
                        size="lg"
                        radius="xl"
                        rightSection={<IconArrowRight size={18} />}
                        styles={{
                          root: {
                            background: 'linear-gradient(135deg, #4DA3FF 0%, #3A6EA5 100%)',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(77, 163, 255, 0.3)',
                          },
                        }}
                      >
                        Discuss Your App Idea
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        component={Link}
                        href="/services"
                        size="lg"
                        radius="xl"
                        variant="outline"
                        styles={{
                          root: {
                            borderColor: '#C9D2E3',
                            color: '#1F4FD8',
                          },
                        }}
                      >
                        All Services
                      </Button>
                    </motion.div>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* Services Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={servicesRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={servicesInView ? 'animate' : 'initial'}
              variants={staggerContainer}
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
                    What We Build
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
                    From Prototype to Production
                  </Title>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  style={{ height: '100%' }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#F8F9FB',
                      borderRadius: 24,
                      border: '1px solid rgba(10, 26, 63, 0.06)',
                      height: '100%',
                    }}
                  >
                    <Stack gap="lg">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ThemeIcon
                          size={70}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #4DA3FF 0%, #3A6EA5 100%)',
                            boxShadow: '0 8px 25px rgba(77, 163, 255, 0.25)',
                          }}
                        >
                          <service.icon size={32} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>

                      <Box>
                        <Title order={3} mb="xs" style={{ color: '#0A1A3F' }}>
                          {service.title}
                        </Title>
                        <Text size="md" lh={1.7} style={{ color: '#5A7099' }}>
                          {service.description}
                        </Text>
                      </Box>

                      <Divider color="rgba(10, 26, 63, 0.08)" />

                      <List
                        spacing="sm"
                        icon={
                          <ThemeIcon size={22} radius="xl" style={{ background: 'rgba(77, 163, 255, 0.15)' }}>
                            <IconCheck size={12} color="#3A6EA5" stroke={3} />
                          </ThemeIcon>
                        }
                      >
                        {service.features.map((feature) => (
                          <List.Item key={feature}>
                            <Text size="sm" style={{ color: '#5A7099' }}>{feature}</Text>
                          </List.Item>
                        ))}
                      </List>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Cross-Platform Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#0A1A3F' }}
          ref={crossPlatformRef}
        >
          <Container size="xl">
            <motion.div
              initial="initial"
              animate={crossPlatformInView ? 'animate' : 'initial'}
              variants={staggerContainer}
            >
              <Stack align="center" gap="lg" mb={60}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Badge
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    fw={600}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      letterSpacing: '1px',
                      fontSize: '0.7rem',
                      padding: '10px 16px',
                    }}
                  >
                    Why Cross-Platform
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
                    One Codebase. Maximum Reach.
                  </Title>
                </motion.div>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Text size="lg" ta="center" maw={700} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Using Kotlin Multiplatform and Flutter, we build apps that feel native on both iOS and Android—
                    without the cost and complexity of maintaining two separate codebases.
                  </Text>
                </motion.div>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {crossPlatformBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={crossPlatformInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Group gap="lg" align="flex-start">
                    <ThemeIcon
                      size={50}
                      radius="xl"
                      style={{
                        background: 'linear-gradient(135deg, #4DA3FF 0%, #3A6EA5 100%)',
                        flexShrink: 0,
                      }}
                    >
                      <benefit.icon size={24} color="#FFFFFF" stroke={1.5} />
                    </ThemeIcon>
                    <Box>
                      <Title order={4} mb="xs" style={{ color: '#FFFFFF' }}>
                        {benefit.title}
                      </Title>
                      <Text size="sm" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {benefit.description}
                      </Text>
                    </Box>
                  </Group>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Integrations Section */}
        <Box
          component="section"
          py={100}
          style={{ background: '#FFFFFF' }}
          ref={integrationsRef}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={60} style={{ alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={integrationsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Stack gap="xl">
                  <Box>
                    <Badge
                      size="lg"
                      radius="xl"
                      tt="uppercase"
                      fw={600}
                      mb="md"
                      style={{
                        background: 'rgba(31, 79, 216, 0.08)',
                        color: '#1F4FD8',
                        border: '1px solid rgba(31, 79, 216, 0.15)',
                        letterSpacing: '1px',
                        fontSize: '0.7rem',
                        padding: '10px 16px',
                      }}
                    >
                      Integrations
                    </Badge>
                    <Title
                      order={2}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                        fontWeight: 700,
                        color: '#0A1A3F',
                      }}
                    >
                      Connect to Everything
                    </Title>
                  </Box>

                  <Text size="lg" lh={1.8} style={{ color: '#5A7099' }}>
                    Your app doesn&apos;t exist in a vacuum. We integrate with the platforms
                    and services your business depends on—from booking systems like Mindbody
                    to payment processors like Square and Stripe.
                  </Text>

                  <Text size="md" lh={1.8} style={{ color: '#5A7099' }}>
                    Need a custom integration? Our API expertise means we can connect your
                    app to virtually any service, including your existing CRM, inventory
                    system, or proprietary tools.
                  </Text>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/contact"
                      radius="xl"
                      rightSection={<IconArrowRight size={16} />}
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #4DA3FF 0%, #3A6EA5 100%)',
                          width: 'fit-content',
                        },
                      }}
                    >
                      Discuss Your Integration Needs
                    </Button>
                  </motion.div>
                </Stack>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={integrationsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: '#F8F9FB',
                    borderRadius: 24,
                    border: '1px solid rgba(10, 26, 63, 0.06)',
                  }}
                >
                  <Text size="sm" fw={600} tt="uppercase" mb="lg" style={{ color: '#8A9BB8', letterSpacing: '1px' }}>
                    Popular Integrations
                  </Text>
                  <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
                    {integrations.map((integration, index) => (
                      <motion.div
                        key={integration.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={integrationsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -3 }}
                      >
                        <Box
                          p="md"
                          style={{
                            background: '#FFFFFF',
                            borderRadius: 12,
                            border: '1px solid rgba(10, 26, 63, 0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            minHeight: 70,
                            boxShadow: '0 1px 3px rgba(10, 26, 63, 0.04)',
                          }}
                        >
                          <integration.logo />
                          <Text size="xs" fw={500} style={{ color: '#5A7099' }}>
                            {integration.name}
                          </Text>
                        </Box>
                      </motion.div>
                    ))}
                  </SimpleGrid>
                </Box>
              </motion.div>
            </SimpleGrid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          component="section"
          py={100}
          style={{
            background: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={ctaRef}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: 400,
              height: 400,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <Container size="md" style={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="xl" ta="center">
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Turn Your App Idea Into Reality
                </Title>

                <Text size="lg" maw={550} style={{ color: 'rgba(255, 255, 255, 0.9)' }} lh={1.8}>
                  Whether you&apos;re building an MVP to pitch investors or a full-scale
                  production app, we&apos;ll bring clarity to your mobile vision.
                </Text>

                <Group gap="md" mt="md">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      href="/contact"
                      size="lg"
                      radius="xl"
                      rightSection={<IconArrowRight size={18} />}
                      styles={{
                        root: {
                          background: '#FFFFFF',
                          color: '#3A6EA5',
                        },
                      }}
                    >
                      Start Building Today
                    </Button>
                  </motion.div>
                </Group>
              </Stack>
            </motion.div>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
