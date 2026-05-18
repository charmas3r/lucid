'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Box,
  TextInput,
  Textarea,
  Button,
  SimpleGrid,
  Stack,
  Group,
  Select,
  Badge,
  Checkbox,
  Chip,
  ThemeIcon,
  Divider,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import {
  IconSparkles,
  IconCheck,
  IconX,
  IconSend,
  IconClock,
  IconShieldCheck,
  IconAlertCircle,
  IconRocket,
  IconLayoutGrid,
  IconBrush,
  IconServerCog,
  IconMail,
  IconChartBar,
  IconSearch,
  IconRefresh,
  IconArrowDown,
  IconGift,
} from '@tabler/icons-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Script from 'next/script';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useDiscountBanner } from '@/components/DiscountBanner';
import { trackEvent, EVENTS } from '@/lib/analytics';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const includedItems = [
  'One-page responsive website',
  'Modern, on-brand template design',
  'Mobile-first, accessible markup',
  'Basic on-page SEO (meta, headings, schema)',
  'One round of revisions',
  'Delivered in ~7 business days',
];

const notIncludedItems = [
  'Hosting & domain (see add-ons)',
  'Custom illustrations or photography',
  'CMS / blog setup (add-on)',
  'Additional pages (add-on)',
  'Ongoing maintenance or SEO',
];

const promotionTerms = [
  {
    icon: IconRocket,
    title: 'Limited slots',
    description: 'We only take a handful of free builds each month. First come, first served.',
  },
  {
    icon: IconShieldCheck,
    title: 'Real businesses only',
    description: 'Must be an operating business or organization — not a placeholder or affiliate site.',
  },
  {
    icon: IconClock,
    title: 'Content readiness',
    description: 'Bring your copy, logo, and any imagery. We can help, but final assets are on you.',
  },
  {
    icon: IconAlertCircle,
    title: 'Subject to qualification',
    description: 'We reserve the right to decline if scope or fit isn’t right. You’ll hear back within 2 business days.',
  },
];

type AddOn = {
  id: string;
  name: string;
  price: string;
  unit: string;
  icon: typeof IconLayoutGrid;
  description: string;
};

const addOns: AddOn[] = [
  {
    id: 'additional-pages',
    name: 'Additional pages',
    price: '$20',
    unit: 'per page',
    icon: IconLayoutGrid,
    description: 'Expand beyond the single included page.',
  },
  {
    id: 'custom-design',
    name: 'Custom design',
    price: '$50',
    unit: 'per page',
    icon: IconBrush,
    description: 'Move beyond templates with bespoke layouts.',
  },
  {
    id: 'cms-integration',
    name: 'CMS integration',
    price: '$50',
    unit: 'per page',
    icon: IconServerCog,
    description: 'Edit content yourself with a managed CMS.',
  },
  {
    id: 'hosting',
    name: 'Basic hosting',
    price: '$20',
    unit: 'per month',
    icon: IconServerCog,
    description: 'Fast, monitored hosting on our infrastructure.',
  },
  {
    id: 'email',
    name: 'Email service',
    price: '$10',
    unit: 'per month',
    icon: IconMail,
    description: 'Branded email send/receive for your domain.',
  },
  {
    id: 'telemetry',
    name: 'Telemetry',
    price: '$10',
    unit: 'per month',
    icon: IconChartBar,
    description: 'Privacy-first analytics with monthly insights.',
  },
  {
    id: 'iterations',
    name: 'Page iterations',
    price: '$20',
    unit: 'per page',
    icon: IconRefresh,
    description: 'Additional revisions including new copy or assets.',
  },
];

const seoTiers = [
  {
    id: 'seo-basic',
    name: 'SEO — Basic',
    price: '$100',
    unit: 'per month',
    description: 'Foundational keyword tracking & on-page tweaks.',
  },
  {
    id: 'seo-premier',
    name: 'SEO — Premier',
    price: '$250',
    unit: 'per month',
    description: 'Content optimization + monthly outreach.',
  },
  {
    id: 'seo-pro',
    name: 'SEO — Pro',
    price: '$500',
    unit: 'per month',
    description: 'Full-stack SEO program with link building & reporting.',
  },
];

const businessTypes = [
  'Local service business',
  'Restaurant / hospitality',
  'Professional services (law, accounting, consulting)',
  'Health & wellness',
  'Home services / contractor',
  'Real estate',
  'E-commerce / retail',
  'Non-profit',
  'Creator / personal brand',
  'Other',
];

const siteGoals = [
  'Generate leads / inquiries',
  'Establish online presence',
  'Showcase portfolio / case studies',
  'Take bookings or appointments',
  'Sell products (single landing page)',
  'Other',
];

const timelineOptions = [
  'ASAP',
  '1–2 weeks',
  '1 month',
  'Flexible',
];

const stylePreferences = [
  'Modern & minimal',
  'Bold & vibrant',
  'Classic & professional',
  'Playful & approachable',
  'Editorial / content-forward',
];

function ClaimForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    siteGoal: '',
    existingWebsite: '',
    hasDomain: '',
    hasBrandAssets: '',
    contentReady: '',
    timeline: '',
    projectDetails: '',
    agree: false,
    website: '', // honeypot
  });

  const [stylePicks, setStylePicks] = useState<string[]>([]);
  const [addOnInterest, setAddOnInterest] = useState<string[]>([]);
  const [seoInterest, setSeoInterest] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (submitted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (submitted && countdown === 0) {
      handleReset();
    }
  }, [submitted, countdown]);

  const handleReset = () => {
    setSubmitted(false);
    setCountdown(10);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      businessType: '',
      siteGoal: '',
      existingWebsite: '',
      hasDomain: '',
      hasBrandAssets: '',
      contentReady: '',
      timeline: '',
      projectDetails: '',
      agree: false,
      website: '',
    });
    setStylePicks([]);
    setAddOnInterest([]);
    setSeoInterest('');
    if (recaptchaRef.current) recaptchaRef.current.reset();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.agree) {
      setError('Please confirm you understand the promotion terms.');
      return;
    }

    setIsSubmitting(true);

    if (formData.website) {
      setIsSubmitting(false);
      return; // honeypot
    }

    if (!recaptchaRef.current) {
      setError('Please verify you are not a robot.');
      setIsSubmitting(false);
      return;
    }

    const recaptchaToken = await recaptchaRef.current.executeAsync();
    if (!recaptchaToken) {
      setError('reCAPTCHA verification failed. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const addOnsCombined = seoInterest
      ? [...addOnInterest, seoInterest]
      : addOnInterest;

    const submissionData = {
      ...formData,
      stylePreferences: stylePicks,
      addOnInterest: addOnsCombined,
      recaptchaToken,
    };

    try {
      const response = await fetch('/api/free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit claim');
      }

      trackEvent(EVENTS.FORM_SUBMIT_FREE_CLAIM, {
        business_type: formData.businessType || 'not_specified',
        timeline: formData.timeline || 'not_specified',
        addons_count: addOnsCombined.length,
      });
      setSubmitted(true);
    } catch (err) {
      trackEvent(EVENTS.FORM_ERROR, {
        form: 'free_claim',
        error: err instanceof Error ? err.message : 'unknown',
      });
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      if (recaptchaRef.current) recaptchaRef.current.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    const progress = countdown / 10;
    const circumference = 2 * Math.PI * 46;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          p={60}
          style={{
            background: '#0D1F4A',
            borderRadius: 24,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Button
            variant="subtle"
            size="sm"
            onClick={handleReset}
            aria-label="Close success message"
            styles={{
              root: {
                position: 'absolute',
                top: 20,
                right: 20,
                color: '#7A94BA',
                padding: 8,
                minWidth: 'auto',
                height: 'auto',
              },
            }}
          >
            <IconX size={20} />
          </Button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Box
              style={{
                position: 'relative',
                width: 100,
                height: 100,
                margin: '0 auto 24px',
              }}
            >
              <svg
                width="100"
                height="100"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'rotate(-90deg)',
                }}
              >
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(31, 79, 216, 0.1)" strokeWidth="4" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#freeGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <defs>
                  <linearGradient id="freeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1F4FD8" />
                    <stop offset="100%" stopColor="#4DA3FF" />
                  </linearGradient>
                </defs>
              </svg>
              <Box
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconCheck size={36} color="#FFFFFF" />
              </Box>
            </Box>
          </motion.div>

          <Title order={2} mb="md" style={{ color: '#FFFFFF' }}>
            Claim received!
          </Title>
          <Text size="lg" style={{ color: '#A5B4CF' }} maw={460} mx="auto">
            Thanks for applying. We&apos;ll review your details and get back to you within 2 business days to confirm your slot and next steps.
          </Text>

          <Text size="sm" mt="xl" style={{ color: '#7A94BA' }}>
            Resetting in {countdown} second{countdown !== 1 ? 's' : ''}...
          </Text>
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        p={{ base: 'xl', md: 40 }}
        style={{
          background: '#0D1F4A',
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(10, 26, 63, 0.06)',
        }}
      >
        <Stack gap="xl">
          {/* Contact Info */}
          <Box>
            <Text fw={600} mb="md" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '1px', fontSize: '0.75rem' }}>
              1. Contact Info
            </Text>
            <Stack gap="md">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="Full Name"
                  placeholder="Jane Doe"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  styles={fieldStyles}
                />
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="jane@business.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  styles={fieldStyles}
                />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="Phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  styles={fieldStyles}
                />
                <TextInput
                  label="Business Name"
                  placeholder="Acme Co."
                  required
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  styles={fieldStyles}
                />
              </SimpleGrid>
            </Stack>
          </Box>

          <Divider color="rgba(255, 255, 255, 0.08)" />

          {/* Site Build */}
          <Box>
            <Text fw={600} mb="md" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '1px', fontSize: '0.75rem' }}>
              2. Tell us about your business
            </Text>
            <Stack gap="md">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Select
                  label="Business type"
                  placeholder="Select an industry"
                  data={businessTypes}
                  value={formData.businessType}
                  onChange={(value) => handleChange('businessType', value || '')}
                  required
                  styles={fieldStyles}
                />
                <Select
                  label="What's the main goal of the site?"
                  placeholder="Select a goal"
                  data={siteGoals}
                  value={formData.siteGoal}
                  onChange={(value) => handleChange('siteGoal', value || '')}
                  required
                  styles={fieldStyles}
                />
              </SimpleGrid>

              <TextInput
                label="Existing website (if any)"
                placeholder="https://"
                value={formData.existingWebsite}
                onChange={(e) => handleChange('existingWebsite', e.target.value)}
                styles={fieldStyles}
              />

              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                <Select
                  label="Do you have a domain?"
                  placeholder="Select"
                  data={['Yes, I own one', 'No, need to register', 'Not sure']}
                  value={formData.hasDomain}
                  onChange={(value) => handleChange('hasDomain', value || '')}
                  styles={fieldStyles}
                />
                <Select
                  label="Brand assets ready?"
                  placeholder="Select"
                  data={['Yes (logo, colors, fonts)', 'Partial (logo only)', 'No, need help']}
                  value={formData.hasBrandAssets}
                  onChange={(value) => handleChange('hasBrandAssets', value || '')}
                  styles={fieldStyles}
                />
                <Select
                  label="Content readiness"
                  placeholder="Select"
                  data={['Copy & images ready', 'Some content ready', 'Need help with content']}
                  value={formData.contentReady}
                  onChange={(value) => handleChange('contentReady', value || '')}
                  styles={fieldStyles}
                />
              </SimpleGrid>

              <Box>
                <Text size="sm" fw={500} mb="xs" style={{ color: '#FFFFFF' }}>
                  Style direction (optional, pick any)
                </Text>
                <Chip.Group multiple value={stylePicks} onChange={setStylePicks}>
                  <Group gap="xs">
                    {stylePreferences.map((style) => (
                      <Chip
                        key={style}
                        value={style}
                        styles={{
                          label: {
                            background: stylePicks.includes(style)
                              ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)'
                              : '#081430',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#FFFFFF',
                          },
                        }}
                      >
                        {style}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </Box>

              <Select
                label="Timeline"
                placeholder="When do you want to launch?"
                data={timelineOptions}
                value={formData.timeline}
                onChange={(value) => handleChange('timeline', value || '')}
                styles={fieldStyles}
              />
            </Stack>
          </Box>

          <Divider color="rgba(255, 255, 255, 0.08)" />

          {/* Add-On Interest */}
          <Box>
            <Text fw={600} mb="xs" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '1px', fontSize: '0.75rem' }}>
              3. Interested in add-ons? (optional)
            </Text>
            <Text size="sm" mb="md" style={{ color: '#A5B4CF' }}>
              Select anything you might want quoted alongside the free build.
            </Text>
            <Chip.Group multiple value={addOnInterest} onChange={setAddOnInterest}>
              <Group gap="xs">
                {addOns.map((addon) => (
                  <Chip
                    key={addon.id}
                    value={addon.id}
                    styles={{
                      label: {
                        background: addOnInterest.includes(addon.id)
                          ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)'
                          : '#081430',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFFFFF',
                      },
                    }}
                  >
                    {addon.name}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>

            <Box mt="md">
              <Select
                label="SEO program (optional)"
                placeholder="Not interested / select tier"
                data={[
                  { value: '', label: 'Not interested' },
                  ...seoTiers.map((tier) => ({ value: tier.id, label: `${tier.name} — ${tier.price}/mo` })),
                ]}
                value={seoInterest}
                onChange={(value) => setSeoInterest(value || '')}
                styles={fieldStyles}
              />
            </Box>
          </Box>

          <Divider color="rgba(255, 255, 255, 0.08)" />

          {/* Project Details */}
          <Box>
            <Text fw={600} mb="md" tt="uppercase" style={{ color: '#4DA3FF', letterSpacing: '1px', fontSize: '0.75rem' }}>
              4. Anything else we should know?
            </Text>
            <Textarea
              placeholder="Tell us about your business, what makes you different, and what you want this site to accomplish."
              minRows={4}
              value={formData.projectDetails}
              onChange={(e) => handleChange('projectDetails', e.target.value)}
              styles={fieldStyles}
            />
          </Box>

          <Divider color="rgba(255, 255, 255, 0.08)" />

          {/* Agreement */}
          <Checkbox
            checked={formData.agree}
            onChange={(e) => handleChange('agree', e.currentTarget.checked)}
            label={
              <Text size="sm" style={{ color: '#A5B4CF' }}>
                I understand the free build includes one responsive page with template-based design, basic SEO, and one revision round. Hosting, domain, additional pages, custom design, and CMS are optional add-ons. Slots are limited and subject to qualification.
              </Text>
            }
            styles={{
              input: {
                background: '#081430',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          />

          {/* Honeypot */}
          <Box
            component="input"
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            style={{
              position: 'absolute',
              left: '-9999px',
              opacity: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
            tabIndex={-1}
          />

          {/* reCAPTCHA invisible */}
          <Box
            style={{
              position: 'absolute',
              left: '-9999px',
              opacity: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfDqFMsAAAAAH4FlNOx78QDqv19T17Y_f7uZPGp"
              size="invisible"
            />
          </Box>

          {error && (
            <Box
              p="sm"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 8,
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <Text size="sm" style={{ color: '#FCA5A5' }}>
                {error}
              </Text>
            </Box>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={isSubmitting}
              rightSection={!isSubmitting && <IconSend size={18} />}
              styles={{
                root: {
                  background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                  border: 'none',
                  borderRadius: 12,
                  height: 56,
                  boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                },
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Claim my free website'}
            </Button>
          </motion.div>
        </Stack>
      </Box>
    </motion.div>
  );
}

const fieldStyles = {
  label: { color: '#FFFFFF', fontWeight: 500, marginBottom: 6 },
  input: {
    background: '#081430',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: 10,
    color: '#FFFFFF',
  },
};

export default function FreePage() {
  const heroRef = useRef(null);
  const includedRef = useRef(null);
  const termsRef = useRef(null);
  const addOnsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const includedInView = useInView(includedRef, { once: true, margin: '-80px' });
  const termsInView = useInView(termsRef, { once: true, margin: '-80px' });
  const addOnsInView = useInView(addOnsRef, { once: true, margin: '-80px' });

  const { isVisible: bannerVisible, bannerHeight } = useDiscountBanner();
  // Nav pill (~100px) + banner (~44px when visible) + breathing room
  const anchorOffset = 120 + (bannerVisible ? bannerHeight : 0);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18082205862"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18082205862');
        `}
      </Script>
      <Navigation />
      <Box component="main" style={{ background: '#081430', minHeight: '100vh' }}>
        {/* Hero */}
        <Box
          component="section"
          pt={160}
          pb={80}
          ref={heroRef}
          style={{
            background: 'linear-gradient(180deg, #0D1F4A 0%, #0A1A3F 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: 420,
              height: 420,
              background: 'radial-gradient(circle, rgba(77, 163, 255, 0.18) 0%, transparent 70%)',
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
                    fw={700}
                    leftSection={<IconSparkles size={14} />}
                    style={{
                      background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                      color: '#FFFFFF',
                      letterSpacing: '1px',
                      fontSize: '0.75rem',
                      padding: '12px 20px',
                      width: 'fit-content',
                      height: 'auto',
                    }}
                    styles={{
                      label: { display: 'flex', alignItems: 'center', lineHeight: 1 },
                      section: { display: 'flex', alignItems: 'center' },
                    }}
                  >
                    Limited Promotion
                  </Badge>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Title
                    order={1}
                    ta="center"
                    maw={860}
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                      fontWeight: 700,
                      lineHeight: 1.05,
                      color: '#FFFFFF',
                    }}
                  >
                    Claim your{' '}
                    <Text
                      component="span"
                      inherit
                      style={{
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      free website
                    </Text>
                  </Title>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Text
                    size="xl"
                    ta="center"
                    maw={680}
                    lh={1.7}
                    style={{ color: 'rgba(255, 255, 255, 0.72)' }}
                  >
                    A one-page, mobile-first site built by Lucid Web Studios &mdash; on the house. No catch. Add hosting, extra pages, or SEO only if you want them.
                  </Text>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <Group gap="md">
                    <Button
                      component="a"
                      href="#claim-form"
                      size="lg"
                      radius="xl"
                      rightSection={<IconArrowDown size={18} />}
                      onClick={() => trackEvent(EVENTS.CTA_CLICK_CLAIM_FREE, { location: 'hero' })}
                      styles={{
                        root: {
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          border: 'none',
                          paddingInline: 32,
                          boxShadow: '0 4px 20px rgba(31, 79, 216, 0.35)',
                        },
                      }}
                    >
                      Claim my slot
                    </Button>
                    <Button
                      component="a"
                      href="#whats-included"
                      size="lg"
                      radius="xl"
                      variant="outline"
                      styles={{
                        root: {
                          borderColor: 'rgba(77, 163, 255, 0.4)',
                          color: '#FFFFFF',
                          paddingInline: 28,
                          '&:hover': {
                            background: 'rgba(77, 163, 255, 0.08)',
                          },
                        },
                      }}
                    >
                      See what&apos;s included
                    </Button>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Container>
        </Box>

        {/* What's Included */}
        <Box
          id="whats-included"
          component="section"
          py={80}
          ref={includedRef}
          style={{ background: '#0A1A3F', scrollMarginTop: anchorOffset }}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={includedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="md" mb={48}>
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  leftSection={<IconGift size={14} />}
                  style={{
                    background: 'rgba(77, 163, 255, 0.15)',
                    color: '#4DA3FF',
                    border: '1px solid rgba(77, 163, 255, 0.25)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                    width: 'fit-content',
                    height: 'auto',
                  }}
                  styles={{
                    label: { display: 'flex', alignItems: 'center', lineHeight: 1 },
                    section: { display: 'flex', alignItems: 'center' },
                  }}
                >
                  What you get
                </Badge>
                <Title order={2} ta="center" style={{ color: '#FFFFFF', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                  Everything you need to launch
                </Title>
                <Text ta="center" size="lg" maw={620} style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                  A real website, designed and built by us. Yours to keep.
                </Text>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={includedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: '#0D1F4A',
                    borderRadius: 20,
                    border: '1px solid rgba(77, 163, 255, 0.18)',
                    height: '100%',
                  }}
                >
                  <Group gap="sm" mb="lg">
                    <ThemeIcon
                      size={42}
                      radius="md"
                      style={{ background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)' }}
                    >
                      <IconCheck size={22} />
                    </ThemeIcon>
                    <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>
                      Included in the free build
                    </Title>
                  </Group>
                  <Stack gap="sm">
                    {includedItems.map((item) => (
                      <Group key={item} gap="sm" align="flex-start" wrap="nowrap">
                        <IconCheck size={18} color="#4DA3FF" style={{ flexShrink: 0, marginTop: 3 }} />
                        <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{item}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={includedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Box
                  p="xl"
                  style={{
                    background: '#0D1F4A',
                    borderRadius: 20,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    height: '100%',
                  }}
                >
                  <Group gap="sm" mb="lg">
                    <ThemeIcon
                      size={42}
                      radius="md"
                      variant="light"
                      style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#A5B4CF' }}
                    >
                      <IconX size={22} />
                    </ThemeIcon>
                    <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>
                      Not included (available as add-ons)
                    </Title>
                  </Group>
                  <Stack gap="sm">
                    {notIncludedItems.map((item) => (
                      <Group key={item} gap="sm" align="flex-start" wrap="nowrap">
                        <IconX size={18} color="#7A94BA" style={{ flexShrink: 0, marginTop: 3 }} />
                        <Text style={{ color: 'rgba(255, 255, 255, 0.72)' }}>{item}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Promotion Terms */}
        <Box
          component="section"
          py={80}
          ref={termsRef}
          style={{ background: '#081430' }}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={termsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="md" mb={48}>
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
                  Set the expectations
                </Badge>
                <Title order={2} ta="center" style={{ color: '#FFFFFF', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                  The fine print &mdash; up front
                </Title>
                <Text ta="center" size="lg" maw={620} style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                  We do this so the work is great and expectations stay aligned.
                </Text>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={24}>
              {promotionTerms.map((term, index) => (
                <motion.div
                  key={term.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={termsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <Box
                    p="xl"
                    style={{
                      background: '#0D1F4A',
                      borderRadius: 20,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      height: '100%',
                    }}
                  >
                    <ThemeIcon
                      size={48}
                      radius="md"
                      mb="md"
                      style={{ background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)' }}
                    >
                      <term.icon size={22} />
                    </ThemeIcon>
                    <Title order={4} mb="xs" style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>
                      {term.title}
                    </Title>
                    <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.6 }}>
                      {term.description}
                    </Text>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Add-Ons */}
        <Box
          component="section"
          py={80}
          ref={addOnsRef}
          style={{ background: '#0A1A3F' }}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Stack align="center" gap="md" mb={48}>
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
                  Optional add-ons
                </Badge>
                <Title order={2} ta="center" style={{ color: '#FFFFFF', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                  Grow when you&apos;re ready
                </Title>
                <Text ta="center" size="lg" maw={620} style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                  Add only what you need. Flat, transparent pricing &mdash; no surprises.
                </Text>
              </Stack>
            </motion.div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={20}>
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Box
                    p="lg"
                    style={{
                      background: '#0D1F4A',
                      borderRadius: 18,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      height: '100%',
                    }}
                  >
                    <Group gap="sm" mb="md">
                      <ThemeIcon
                        size={40}
                        radius="md"
                        style={{ background: 'rgba(77, 163, 255, 0.15)', color: '#4DA3FF' }}
                      >
                        <addon.icon size={20} stroke={1.5} />
                      </ThemeIcon>
                      <Box>
                        <Text fw={600} style={{ color: '#FFFFFF' }}>
                          {addon.name}
                        </Text>
                        <Group gap={4} align="baseline">
                          <Text fw={700} style={{ color: '#4DA3FF' }}>
                            {addon.price}
                          </Text>
                          <Text size="xs" style={{ color: '#7A94BA' }}>
                            {addon.unit}
                          </Text>
                        </Group>
                      </Box>
                    </Group>
                    <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                      {addon.description}
                    </Text>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>

            {/* SEO Tiers */}
            <Box mt={48}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Group gap="xs" mb="md">
                  <IconSearch size={20} color="#4DA3FF" />
                  <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.2rem' }}>
                    SEO programs
                  </Title>
                </Group>
              </motion.div>
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing={20}>
                {seoTiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  >
                    <Box
                      p="xl"
                      style={{
                        background: index === 1
                          ? 'linear-gradient(135deg, rgba(31, 79, 216, 0.15) 0%, rgba(77, 163, 255, 0.08) 100%)'
                          : '#0D1F4A',
                        borderRadius: 18,
                        border: index === 1
                          ? '1px solid rgba(77, 163, 255, 0.4)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      {index === 1 && (
                        <Badge
                          size="xs"
                          radius="sm"
                          style={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            color: '#FFFFFF',
                          }}
                        >
                          Most popular
                        </Badge>
                      )}
                      <Text fw={600} size="lg" mb="xs" style={{ color: '#FFFFFF' }}>
                        {tier.name}
                      </Text>
                      <Group gap={4} align="baseline" mb="md">
                        <Text fw={700} size="xl" style={{ color: '#4DA3FF' }}>
                          {tier.price}
                        </Text>
                        <Text size="sm" style={{ color: '#7A94BA' }}>
                          {tier.unit}
                        </Text>
                      </Group>
                      <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.6 }}>
                        {tier.description}
                      </Text>
                    </Box>
                  </motion.div>
                ))}
              </SimpleGrid>
            </Box>
          </Container>
        </Box>

        {/* Claim Form */}
        <Box
          id="claim-form"
          component="section"
          py={80}
          style={{ background: '#081430', scrollMarginTop: anchorOffset }}
        >
          <Container size="md">
            <Stack align="center" gap="md" mb={48}>
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
                Step 1 of 1
              </Badge>
              <Title order={2} ta="center" style={{ color: '#FFFFFF', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                Claim your free build
              </Title>
              <Text ta="center" size="lg" maw={560} style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                Tell us about your business. We&apos;ll reply within 2 business days with next steps.
              </Text>
            </Stack>

            <Suspense fallback={<div>Loading...</div>}>
              <ClaimForm />
            </Suspense>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
