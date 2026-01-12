'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
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
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  IconMail, 
  IconPhone, 
  IconMapPin, 
  IconClock,
  IconSend,
  IconCalendar,
  IconX,
  IconCheck,
} from '@tabler/icons-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { trackEvent, EVENTS } from '@/lib/analytics';

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

// Helper to parse date string like "January 6, 2026" to Date object
const parseDateString = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
};

// Helper to format Date to readable string
const formatDateToString = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

function ContactForm() {
  const searchParams = useSearchParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  // Get pre-filled values from URL params
  const prefilledDateStr = searchParams.get('date') || '';
  const prefilledTime = searchParams.get('time') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    preferredTime: prefilledTime,
    message: '',
  });
  
  // Separate state for date picker (Date object)
  const [preferredDate, setPreferredDate] = useState<Date | null>(
    parseDateString(prefilledDateStr)
  );
  
  // Handler for DatePickerInput that properly converts the value
  const handleDateChange = (value: string | Date | null) => {
    if (value === null) {
      setPreferredDate(null);
    } else if (value instanceof Date) {
      setPreferredDate(value);
    } else {
      // If string, parse it
      const parsed = new Date(value);
      setPreferredDate(isNaN(parsed.getTime()) ? null : parsed);
    }
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(8);

  // Auto-close success message after countdown
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
    setCountdown(8);
    setPreferredDate(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      preferredTime: '',
      message: '',
    });
  };

  // Update form when URL params change
  useEffect(() => {
    if (prefilledDateStr) {
      setPreferredDate(parseDateString(prefilledDateStr));
    }
    if (prefilledTime) {
      setFormData(prev => ({
        ...prev,
        preferredTime: prefilledTime,
      }));
    }
  }, [prefilledDateStr, prefilledTime]);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Include formatted date in submission
    const submissionData = {
      ...formData,
      preferredDate: formatDateToString(preferredDate),
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      trackEvent(EVENTS.FORM_SUBMIT_CONTACT, { 
        service: formData.service || 'not_specified',
        has_consultation: Boolean(preferredDate && formData.preferredTime)
      });
      setSubmitted(true);
    } catch (err) {
      trackEvent(EVENTS.FORM_ERROR, { form: 'contact', error: err instanceof Error ? err.message : 'unknown' });
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: IconMail,
      label: 'Email',
      value: 'evan@lucidweb.studio',
      href: 'mailto:evan@lucidweb.studio',
    },
    {
      icon: IconPhone,
      label: 'Phone',
      value: '(949) 485-2240',
      href: 'tel:+19494852240',
    },
    {
      icon: IconMapPin,
      label: 'Location',
      value: 'Orange County, CA',
      href: null,
    },
    {
      icon: IconClock,
      label: 'Hours',
      value: 'Mon - Fri: 9am - 6pm PST',
      href: null,
    },
  ];

  const services = [
    'Website Design & Development',
    'Mobile App Development',
    'E-commerce Solutions',
    'SEO & Digital Marketing',
    'Brand Identity & Design',
    'Maintenance & Support',
    'Other',
  ];

  const timeSlots = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
  ];

  if (submitted) {
    // Calculate progress for the countdown ring (0 to 1)
    const progress = countdown / 8;
    const circumference = 2 * Math.PI * 46; // radius of 46
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
            background: '#FFFFFF',
            borderRadius: 24,
            border: '1px solid rgba(10, 26, 63, 0.06)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
            }}
          >
            <Button
              variant="subtle"
              size="sm"
              onClick={handleReset}
              aria-label="Close success message"
              styles={{
                root: {
                  color: '#8A9BB8',
                  padding: 8,
                  minWidth: 'auto',
                  height: 'auto',
                  '&:hover': {
                    background: 'rgba(10, 26, 63, 0.05)',
                    color: '#0A1A3F',
                  },
                },
              }}
            >
              <IconX size={20} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {/* Countdown ring around the icon */}
            <Box
              style={{
                position: 'relative',
                width: 100,
                height: 100,
                margin: '0 auto 24px',
              }}
            >
              {/* SVG Progress Ring */}
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
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(31, 79, 216, 0.1)"
                  strokeWidth="4"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1F4FD8" />
                    <stop offset="100%" stopColor="#4DA3FF" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Icon */}
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
          <Title order={2} mb="md" style={{ color: '#0A1A3F' }}>
            Message Sent!
          </Title>
          <Text size="lg" style={{ color: '#5A7099' }} maw={400} mx="auto">
            Thank you for reaching out. We&apos;ll get back to you within 24 hours to discuss your project.
          </Text>
          {preferredDate && formData.preferredTime && (
            <Badge
              size="lg"
              mt="xl"
              style={{
                background: 'rgba(31, 79, 216, 0.1)',
                color: '#1F4FD8',
              }}
            >
              <IconCalendar size={14} style={{ marginRight: 6 }} />
              Consultation: {formatDateToString(preferredDate)} at {formData.preferredTime}
            </Badge>
          )}
          
          {/* Action buttons */}
          <Group justify="center" mt="xl" gap="md">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="light"
                onClick={handleReset}
                styles={{
                  root: {
                    background: 'rgba(31, 79, 216, 0.08)',
                    color: '#1F4FD8',
                    border: '1px solid rgba(31, 79, 216, 0.15)',
                    borderRadius: 10,
                    '&:hover': {
                      background: 'rgba(31, 79, 216, 0.12)',
                    },
                  },
                }}
              >
                Send Another Message
              </Button>
            </motion.div>
          </Group>
          
          {/* Countdown text */}
          <Text size="sm" mt="lg" style={{ color: '#8A9BB8' }}>
            Closing in {countdown} second{countdown !== 1 ? 's' : ''}...
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
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={60}>
        {/* Contact Info */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
          <Stack gap="xl">
            <Box>
              <Badge
                size="lg"
                radius="xl"
                tt="uppercase"
                fw={600}
                mb="lg"
                style={{
                  background: 'rgba(31, 79, 216, 0.08)',
                  color: '#1F4FD8',
                  border: '1px solid rgba(31, 79, 216, 0.15)',
                  letterSpacing: '1px',
                  fontSize: '0.7rem',
                  padding: '10px 16px',
                }}
              >
                Get in Touch
              </Badge>
              <Title order={2} mb="md" style={{ color: '#0A1A3F', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                Let&apos;s bring your vision to life
              </Title>
              <Text size="lg" style={{ color: '#5A7099' }} maw={450}>
                Ready to start your project? Fill out the form and we&apos;ll schedule a free consultation to discuss your needs.
              </Text>
            </Box>

            <Stack gap="lg">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <Group gap="md">
                    <Box
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <info.icon size={22} color="#FFFFFF" />
                    </Box>
                    <Box>
                      <Text size="sm" style={{ color: '#8A9BB8' }}>
                        {info.label}
                      </Text>
                      {info.href ? (
                        <Text
                          component="a"
                          href={info.href}
                          fw={500}
                          style={{ color: '#0A1A3F', textDecoration: 'none' }}
                        >
                          {info.value}
                        </Text>
                      ) : (
                        <Text fw={500} style={{ color: '#0A1A3F' }}>
                          {info.value}
                        </Text>
                      )}
                    </Box>
                  </Group>
                </motion.div>
              ))}
            </Stack>
          </Stack>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            p={{ base: 'xl', md: 40 }}
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid rgba(10, 26, 63, 0.06)',
              boxShadow: '0 4px 30px rgba(10, 26, 63, 0.06)',
            }}
          >
            <Stack gap="md">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="Full Name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  styles={{
                    label: { color: '#0A1A3F', fontWeight: 500, marginBottom: 6 },
                    input: {
                      background: '#F8F9FB',
                      border: '1px solid rgba(10, 26, 63, 0.08)',
                      borderRadius: 10,
                      '&:focus': {
                        borderColor: '#1F4FD8',
                      },
                    },
                  }}
                />
                <TextInput
                  label="Email"
                  placeholder="john@company.com"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  styles={{
                    label: { color: '#0A1A3F', fontWeight: 500, marginBottom: 6 },
                    input: {
                      background: '#F8F9FB',
                      border: '1px solid rgba(10, 26, 63, 0.08)',
                      borderRadius: 10,
                      '&:focus': {
                        borderColor: '#1F4FD8',
                      },
                    },
                  }}
                />
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="Phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  styles={{
                    label: { color: '#0A1A3F', fontWeight: 500, marginBottom: 6 },
                    input: {
                      background: '#F8F9FB',
                      border: '1px solid rgba(10, 26, 63, 0.08)',
                      borderRadius: 10,
                      '&:focus': {
                        borderColor: '#1F4FD8',
                      },
                    },
                  }}
                />
                <TextInput
                  label="Company"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  styles={{
                    label: { color: '#0A1A3F', fontWeight: 500, marginBottom: 6 },
                    input: {
                      background: '#F8F9FB',
                      border: '1px solid rgba(10, 26, 63, 0.08)',
                      borderRadius: 10,
                      '&:focus': {
                        borderColor: '#1F4FD8',
                      },
                    },
                  }}
                />
              </SimpleGrid>

              <Select
                label="Service Interested In"
                placeholder="Select a service"
                data={services}
                value={formData.service}
                onChange={(value) => handleChange('service', value || '')}
                styles={{
                  label: { color: '#0A1A3F', fontWeight: 500, marginBottom: 6 },
                  input: {
                    background: '#F8F9FB',
                    border: '1px solid rgba(10, 26, 63, 0.08)',
                    borderRadius: 10,
                    '&:focus': {
                      borderColor: '#1F4FD8',
                    },
                  },
                }}
              />

              {/* Consultation Time Section */}
              <Box
                p="md"
                style={{
                  background: (preferredDate || prefilledTime) ? 'rgba(31, 79, 216, 0.05)' : '#F8F9FB',
                  borderRadius: 12,
                  border: (preferredDate || prefilledTime)
                    ? '1px solid rgba(31, 79, 216, 0.2)' 
                    : '1px solid rgba(10, 26, 63, 0.06)',
                }}
              >
                <Group gap="xs" mb="sm">
                  <IconCalendar size={18} color="#1F4FD8" />
                  <Text fw={500} style={{ color: '#0A1A3F' }}>
                    Preferred Consultation Time
                  </Text>
                  {(preferredDate || prefilledTime) && (
                    <Badge size="xs" color="blue" variant="light">
                      Pre-selected
                    </Badge>
                  )}
                </Group>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <DatePickerInput
                    label="Date"
                    placeholder="Select date"
                    value={preferredDate}
                    onChange={handleDateChange as (value: string | null) => void}
                    minDate={new Date()}
                    clearable
                    valueFormat="MMMM D, YYYY"
                    styles={{
                      label: { color: '#5A7099', fontWeight: 500, marginBottom: 6, fontSize: '0.85rem' },
                      input: {
                        background: '#FFFFFF',
                        border: '1px solid rgba(10, 26, 63, 0.08)',
                        borderRadius: 10,
                        '&:focus': {
                          borderColor: '#1F4FD8',
                        },
                      },
                    }}
                  />
                  <Select
                    label="Time"
                    placeholder="Select time"
                    data={timeSlots}
                    value={formData.preferredTime}
                    onChange={(value) => handleChange('preferredTime', value || '')}
                    styles={{
                      label: { color: '#5A7099', fontWeight: 500, marginBottom: 6, fontSize: '0.85rem' },
                      input: {
                        background: '#FFFFFF',
                        border: '1px solid rgba(10, 26, 63, 0.08)',
                        borderRadius: 10,
                        '&:focus': {
                          borderColor: '#1F4FD8',
                        },
                      },
                    }}
                  />
                </SimpleGrid>
              </Box>

              <Textarea
                label="Project Details"
                placeholder="Tell us about your project, goals, and any specific requirements..."
                minRows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                styles={{
                  label: { color: '#0A1A3F', fontWeight: 500, marginBottom: 6 },
                  input: {
                    background: '#F8F9FB',
                    border: '1px solid rgba(10, 26, 63, 0.08)',
                    borderRadius: 10,
                    '&:focus': {
                      borderColor: '#1F4FD8',
                    },
                  },
                }}
              />

              {error && (
                <Box
                  p="sm"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: 8,
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <Text size="sm" style={{ color: '#DC2626' }}>
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
                      height: 52,
                      boxShadow: '0 4px 20px rgba(31, 79, 216, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 25px rgba(77, 163, 255, 0.4)',
                      },
                    },
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>
      </SimpleGrid>
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <Box component="main" pt={120} pb={80} style={{ background: '#F8F9FB', minHeight: '100vh' }}>
        <Container size="xl">
          <Suspense fallback={<div>Loading...</div>}>
            <ContactForm />
          </Suspense>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

