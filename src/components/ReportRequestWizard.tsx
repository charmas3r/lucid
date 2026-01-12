'use client';

import { useState } from 'react';
import {
  Modal,
  Box,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Progress,
  ThemeIcon,
  Badge,
  Paper,
  SimpleGrid,
  Checkbox,
  ScrollArea,
} from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconSearch,
  IconChartBar,
  IconRocket,
  IconBrain,
  IconWorld,
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconMail,
  IconUser,
  IconBuildingSkyscraper,
  IconLink,
  IconSparkles,
  IconFileAnalytics,
  IconTargetArrow,
  IconTrendingUp,
} from '@tabler/icons-react';
import { trackEvent, EVENTS } from '@/lib/analytics';

type ReportType = 'seo' | 'geo' | 'conversion' | 'full';

interface ReportOption {
  id: ReportType;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  deliveryTime: string;
  color: string;
}

const REPORT_OPTIONS: ReportOption[] = [
  {
    id: 'seo',
    title: 'SEO Audit',
    description: 'Technical SEO health check with actionable recommendations',
    icon: <IconSearch size={24} />,
    features: [
      'Google Lighthouse scores breakdown',
      'Core Web Vitals analysis',
      'Technical SEO checklist (50+ points)',
      'Competitor keyword gap analysis',
      'Content optimization opportunities',
    ],
    deliveryTime: '2-3 business days',
    color: '#00D4FF',
  },
  {
    id: 'geo',
    title: 'GEO Report',
    description: 'AI search visibility audit for ChatGPT, Gemini & Perplexity',
    icon: <IconBrain size={24} />,
    features: [
      'AI citation analysis across platforms',
      'Entity recognition assessment',
      'Structured data recommendations',
      'AI-friendly content audit',
      'Competitive AI visibility comparison',
    ],
    deliveryTime: '3-4 business days',
    color: '#A855F7',
  },
  {
    id: 'conversion',
    title: 'Conversion Audit',
    description: 'UX analysis to identify conversion blockers',
    icon: <IconTargetArrow size={24} />,
    features: [
      'User journey mapping',
      'Friction point identification',
      'CTA effectiveness analysis',
      'Mobile experience audit',
      'A/B testing recommendations',
    ],
    deliveryTime: '3-4 business days',
    color: '#10B981',
  },
  {
    id: 'full',
    title: 'Full Digital Audit',
    description: 'Comprehensive analysis across all dimensions',
    icon: <IconSparkles size={24} />,
    features: [
      'Everything in SEO Audit',
      'Everything in GEO Report',
      'Everything in Conversion Audit',
      'Integrated strategy roadmap',
      'Priority-ranked action items',
      '30-minute strategy call included',
    ],
    deliveryTime: '5-7 business days',
    color: '#F59E0B',
  },
];

interface FormData {
  reportTypes: ReportType[];
  websiteUrl: string;
  businessType: string;
  currentChallenges: string;
  name: string;
  email: string;
  company: string;
}

interface ReportRequestWizardProps {
  opened: boolean;
  onClose: () => void;
  defaultReportType?: ReportType;
}

export function ReportRequestWizard({ opened, onClose, defaultReportType }: ReportRequestWizardProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    reportTypes: defaultReportType ? [defaultReportType] : [],
    websiteUrl: '',
    businessType: '',
    currentChallenges: '',
    name: '',
    email: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleReportToggle = (reportId: ReportType) => {
    trackEvent(EVENTS.WIZARD_SELECT_REPORT, { report: reportId });
    setFormData(prev => {
      // If selecting "full", deselect others
      if (reportId === 'full') {
        return { ...prev, reportTypes: prev.reportTypes.includes('full') ? [] : ['full'] };
      }
      // If selecting individual reports, deselect "full"
      const withoutFull = prev.reportTypes.filter(r => r !== 'full');
      if (withoutFull.includes(reportId)) {
        return { ...prev, reportTypes: withoutFull.filter(r => r !== reportId) };
      }
      return { ...prev, reportTypes: [...withoutFull, reportId] };
    });
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.reportTypes.length > 0;
      case 1:
        return formData.websiteUrl.trim().length > 0;
      case 2:
        return formData.name.trim().length > 0 && formData.email.trim().length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/report-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request');
      }

      trackEvent(EVENTS.WIZARD_COMPLETE, { 
        reports: formData.reportTypes.join(','),
        business_type: formData.businessType || 'not_specified'
      });
      setIsComplete(true);
    } catch (err) {
      trackEvent(EVENTS.FORM_ERROR, { form: 'report_wizard', error: err instanceof Error ? err.message : 'unknown' });
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    trackEvent(EVENTS.WIZARD_CLOSE, { step, completed: isComplete });
    onClose();
    // Reset after modal animation
    setTimeout(() => {
      setStep(0);
      setIsComplete(false);
      setFormData({
        reportTypes: defaultReportType ? [defaultReportType] : [],
        websiteUrl: '',
        businessType: '',
        currentChallenges: '',
        name: '',
        email: '',
        company: '',
      });
    }, 300);
  };

  const selectedReports = REPORT_OPTIONS.filter(r => formData.reportTypes.includes(r.id));

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      size="xl"
      radius={{ base: 0, sm: 'lg' }}
      padding={0}
      withCloseButton={false}
      centered
      fullScreen={false}
      styles={{
        root: {
          zIndex: 1100,
        },
        overlay: {
          zIndex: 1100,
        },
        inner: {
          zIndex: 1101,
          padding: 0,
          '@media (max-width: 48em)': {
            padding: 0,
          },
        },
        content: {
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f0f23 100%)',
          border: '1px solid rgba(77, 171, 247, 0.2)',
          overflow: 'hidden',
          maxHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          '@media (max-width: 48em)': {
            maxHeight: '100dvh',
            height: '100dvh',
            borderRadius: 0,
            border: 'none',
          },
        },
        body: {
          padding: 0,
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <ScrollArea 
        h="100%" 
        type="auto" 
        offsetScrollbars
        styles={{
          root: { flex: 1 },
          viewport: { 
            '& > div': { 
              display: 'block !important',
              minHeight: '100%',
            },
          },
        }}
      >
      <Box p={{ base: 'md', sm: 'xl' }}>
        {/* Header */}
        <Group justify="space-between" mb="lg">
          <Box>
            <Badge
              variant="light"
              color="blue"
              size="sm"
              leftSection={<IconFileAnalytics size={12} />}
            >
              Free Digital Audit
            </Badge>
            <Title order={2} mt="xs" c="white">
              {isComplete ? 'Request Submitted!' : 'Request Your Report'}
            </Title>
          </Box>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            onClick={handleClose}
          >
            Close
          </Button>
        </Group>

        {!isComplete && (
          <Progress
            value={progress}
            size="sm"
            radius="xl"
            mb="xl"
            styles={{
              root: { background: 'rgba(255,255,255,0.1)' },
              section: { background: 'linear-gradient(90deg, #4DABF7 0%, #A855F7 100%)' },
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Stack align="center" py="xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <ThemeIcon
                    size={80}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: '#4DABF7', to: '#10B981' }}
                  >
                    <IconCheck size={40} />
                  </ThemeIcon>
                </motion.div>

                <Title order={3} c="white" ta="center">
                  We&apos;ve received your request!
                </Title>

                <Text c="dimmed" ta="center" maw={400}>
                  Our team will analyze your website and deliver your personalized report within the timeframe below.
                </Text>

                <Paper
                  p="md"
                  radius="md"
                  bg="rgba(77, 171, 247, 0.1)"
                  style={{ border: '1px solid rgba(77, 171, 247, 0.2)' }}
                >
                  <Stack gap="xs">
                    <Text size="sm" c="dimmed">What happens next:</Text>
                    <Group gap="xs">
                      <IconMail size={16} color="#4DABF7" />
                      <Text size="sm" c="white">Confirmation email sent to {formData.email}</Text>
                    </Group>
                    <Group gap="xs">
                      <IconFileAnalytics size={16} color="#4DABF7" />
                      <Text size="sm" c="white">
                        Report delivery: {selectedReports.length === 1 
                          ? selectedReports[0].deliveryTime 
                          : '5-7 business days'}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconTrendingUp size={16} color="#4DABF7" />
                      <Text size="sm" c="white">Actionable insights you can implement immediately</Text>
                    </Group>
                  </Stack>
                </Paper>

                <Button
                  variant="gradient"
                  gradient={{ from: '#4DABF7', to: '#228BE6' }}
                  size="md"
                  mt="md"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </Stack>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 0: Select Report Type */}
              {step === 0 && (
                <Stack gap="md">
                  <Text c="dimmed" size="sm">
                    Select the audit(s) you&apos;d like to receive. Each includes actionable recommendations tailored to your business.
                  </Text>

                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 'sm', sm: 'md' }}>
                    {REPORT_OPTIONS.map((report) => {
                      const isSelected = formData.reportTypes.includes(report.id);
                      return (
                        <motion.div
                          key={report.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Paper
                            p={{ base: 'sm', sm: 'md' }}
                            radius="md"
                            onClick={() => handleReportToggle(report.id)}
                            style={{
                              cursor: 'pointer',
                              background: isSelected
                                ? `linear-gradient(135deg, ${report.color}15 0%, ${report.color}05 100%)`
                                : 'rgba(255,255,255,0.02)',
                              border: `1px solid ${isSelected ? report.color : 'rgba(255,255,255,0.1)'}`,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Group justify="space-between" wrap="nowrap">
                              <Group gap="xs" wrap="nowrap" style={{ flex: 1 }}>
                                <ThemeIcon
                                  size="md"
                                  radius="md"
                                  style={{ background: `${report.color}20`, color: report.color, flexShrink: 0 }}
                                >
                                  {report.icon}
                                </ThemeIcon>
                                <Box style={{ flex: 1, minWidth: 0 }}>
                                  <Text fw={600} c="white" size="sm">{report.title}</Text>
                                  <Text size="xs" c="dimmed" lineClamp={2}>
                                    {report.description}
                                  </Text>
                                </Box>
                              </Group>
                              <Checkbox
                                checked={isSelected}
                                onChange={() => {}}
                                color="blue"
                                radius="xl"
                                styles={{
                                  input: { cursor: 'pointer' },
                                }}
                              />
                            </Group>
                            <Stack gap={4} mt="xs" visibleFrom="sm">
                              {report.features.slice(0, 3).map((feature, i) => (
                                <Group key={i} gap={6}>
                                  <IconCheck size={12} color={report.color} />
                                  <Text size="xs" c="gray.5">{feature}</Text>
                                </Group>
                              ))}
                              {report.features.length > 3 && (
                                <Text size="xs" c="dimmed" fs="italic">
                                  +{report.features.length - 3} more...
                                </Text>
                              )}
                            </Stack>
                            <Badge
                              size="xs"
                              variant="light"
                              color="gray"
                              mt="xs"
                            >
                              {report.deliveryTime}
                            </Badge>
                          </Paper>
                        </motion.div>
                      );
                    })}
                  </SimpleGrid>
                </Stack>
              )}

              {/* Step 1: Website & Business Info */}
              {step === 1 && (
                <Stack gap="md">
                  <Box>
                    <Text c="dimmed" size="sm" mb="md">
                      Tell us about your website so we can provide relevant insights.
                    </Text>

                    <Paper
                      p="md"
                      radius="md"
                      mb="md"
                      bg="rgba(168, 85, 247, 0.05)"
                      style={{ border: '1px solid rgba(168, 85, 247, 0.2)' }}
                    >
                      <Group gap="xs" mb="xs">
                        <IconWorld size={16} color="#A855F7" />
                        <Text size="sm" fw={500} c="white">Why we need your URL</Text>
                      </Group>
                      <Text size="xs" c="dimmed">
                        We&apos;ll run comprehensive scans including Lighthouse audits, AI search visibility checks, 
                        and UX analysis. Your URL is never shared and is only used for your personalized report.
                      </Text>
                    </Paper>
                  </Box>

                  <TextInput
                    label="Website URL"
                    placeholder="https://yourwebsite.com"
                    leftSection={<IconLink size={16} />}
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                    required
                    styles={{
                      label: { color: 'white', marginBottom: 8 },
                      input: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:focus': { borderColor: '#4DABF7' },
                      },
                    }}
                  />

                  <TextInput
                    label="Business Type / Industry"
                    placeholder="e.g., E-commerce, SaaS, Local Service, Healthcare..."
                    leftSection={<IconBuildingSkyscraper size={16} />}
                    value={formData.businessType}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                    styles={{
                      label: { color: 'white', marginBottom: 8 },
                      input: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                      },
                    }}
                  />

                  <Textarea
                    label="Current Challenges (Optional)"
                    placeholder="What's your biggest digital challenge right now? Low traffic, poor conversions, not showing up in AI searches..."
                    minRows={3}
                    value={formData.currentChallenges}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentChallenges: e.target.value }))}
                    styles={{
                      label: { color: 'white', marginBottom: 8 },
                      input: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                      },
                    }}
                  />
                </Stack>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <Stack gap="md">
                  <Text c="dimmed" size="sm">
                    Where should we send your personalized report?
                  </Text>

                  <TextInput
                    label="Your Name"
                    placeholder="John Smith"
                    leftSection={<IconUser size={16} />}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    styles={{
                      label: { color: 'white', marginBottom: 8 },
                      input: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                      },
                    }}
                  />

                  <TextInput
                    label="Email Address"
                    placeholder="john@company.com"
                    leftSection={<IconMail size={16} />}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    styles={{
                      label: { color: 'white', marginBottom: 8 },
                      input: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                      },
                    }}
                  />

                  <TextInput
                    label="Company (Optional)"
                    placeholder="Acme Inc."
                    leftSection={<IconBuildingSkyscraper size={16} />}
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    styles={{
                      label: { color: 'white', marginBottom: 8 },
                      input: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                      },
                    }}
                  />

                  <Paper
                    p="md"
                    radius="md"
                    bg="rgba(16, 185, 129, 0.05)"
                    style={{ border: '1px solid rgba(16, 185, 129, 0.2)' }}
                  >
                    <Group gap="xs" mb="xs">
                      <IconCheck size={16} color="#10B981" />
                      <Text size="sm" fw={500} c="white">No spam, ever</Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      We&apos;ll only use your email to deliver your report and follow up once to ensure you received it. 
                      No newsletters, no sales pitches.
                    </Text>
                  </Paper>
                </Stack>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <Stack gap="md">
                  <Text c="dimmed" size="sm">
                    Review your request before submitting:
                  </Text>

                  <Paper
                    p="md"
                    radius="md"
                    bg="rgba(255,255,255,0.02)"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Stack gap="md">
                      <Box>
                        <Text size="xs" c="dimmed" tt="uppercase" fw={500} mb={4}>
                          Selected Reports
                        </Text>
                        <Group gap="xs">
                          {selectedReports.map(report => (
                            <Badge
                              key={report.id}
                              variant="light"
                              leftSection={report.icon}
                              style={{ background: `${report.color}20`, color: report.color }}
                            >
                              {report.title}
                            </Badge>
                          ))}
                        </Group>
                      </Box>

                      <Box>
                        <Text size="xs" c="dimmed" tt="uppercase" fw={500} mb={4}>
                          Website
                        </Text>
                        <Text size="sm" c="white">{formData.websiteUrl}</Text>
                      </Box>

                      {formData.businessType && (
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={500} mb={4}>
                            Industry
                          </Text>
                          <Text size="sm" c="white">{formData.businessType}</Text>
                        </Box>
                      )}

                      <Box>
                        <Text size="xs" c="dimmed" tt="uppercase" fw={500} mb={4}>
                          Deliver To
                        </Text>
                        <Text size="sm" c="white">{formData.name} ({formData.email})</Text>
                      </Box>

                      <Box>
                        <Text size="xs" c="dimmed" tt="uppercase" fw={500} mb={4}>
                          Expected Delivery
                        </Text>
                        <Text size="sm" c="white">
                          {selectedReports.length === 1 
                            ? selectedReports[0].deliveryTime 
                            : formData.reportTypes.includes('full') 
                              ? '5-7 business days'
                              : '5-7 business days (combined reports)'}
                        </Text>
                      </Box>
                    </Stack>
                  </Paper>

                  <Paper
                    p="md"
                    radius="md"
                    bg="rgba(77, 171, 247, 0.05)"
                    style={{ border: '1px solid rgba(77, 171, 247, 0.2)' }}
                  >
                    <Text size="sm" fw={500} c="white" mb="xs">
                      What you&apos;ll receive:
                    </Text>
                    <Stack gap={6}>
                      {selectedReports.flatMap(r => r.features).slice(0, 6).map((feature, i) => (
                        <Group key={i} gap={6}>
                          <IconCheck size={14} color="#4DABF7" />
                          <Text size="xs" c="gray.5">{feature}</Text>
                        </Group>
                      ))}
                    </Stack>
                  </Paper>
                </Stack>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        {error && (
          <Paper
            p="sm"
            mt="md"
            radius="md"
            bg="rgba(239, 68, 68, 0.1)"
            style={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}
          >
            <Text size="sm" c="red.4">
              {error}
            </Text>
          </Paper>
        )}

        {/* Navigation */}
        {!isComplete && (
          <Group justify="space-between" mt="xl">
            <Button
              variant="subtle"
              color="gray"
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
            >
              Back
            </Button>

            {step < totalSteps - 1 ? (
              <Button
                variant="gradient"
                gradient={{ from: '#4DABF7', to: '#228BE6' }}
                rightSection={<IconArrowRight size={16} />}
                onClick={() => {
                  trackEvent(EVENTS.WIZARD_STEP, { from: step, to: step + 1 });
                  setStep(s => s + 1);
                }}
                disabled={!canProceed()}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="gradient"
                gradient={{ from: '#4DABF7', to: '#10B981' }}
                rightSection={<IconRocket size={16} />}
                onClick={handleSubmit}
                loading={isSubmitting}
              >
                Submit Request
              </Button>
            )}
          </Group>
        )}

        {/* Step indicator */}
        {!isComplete && (
          <Group justify="center" mt="md" gap="xs">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <Box
                key={i}
                w={i === step ? 24 : 8}
                h={8}
                style={{
                  borderRadius: 4,
                  background: i === step ? '#4DABF7' : i < step ? '#10B981' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Group>
        )}
      </Box>
      </ScrollArea>
    </Modal>
  );
}

// Button component to trigger the wizard
interface RequestReportButtonProps {
  reportType?: ReportType;
  children?: React.ReactNode;
  variant?: 'gradient' | 'outline' | 'subtle' | 'light' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export function RequestReportButton({
  reportType,
  children = 'Request Free Report',
  variant = 'gradient',
  size = 'md',
  fullWidth = false,
}: RequestReportButtonProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    trackEvent(EVENTS.WIZARD_OPEN, { report_type: reportType || 'none' });
    setOpened(true);
  };

  // Custom styles for white variant (for dark backgrounds)
  const getButtonProps = () => {
    if (variant === 'white') {
      return {
        variant: 'filled' as const,
        styles: {
          root: {
            background: '#FFFFFF',
            color: '#0A1A3F',
            '&:hover': {
              background: '#F8F9FB',
            },
          },
        },
      };
    }
    if (variant === 'gradient') {
      return {
        variant: 'gradient' as const,
        gradient: { from: '#4DABF7', to: '#228BE6' },
      };
    }
    return { variant };
  };

  return (
    <>
      <Button
        {...getButtonProps()}
        size={size}
        radius="xl"
        fullWidth={fullWidth}
        rightSection={<IconFileAnalytics size={16} />}
        onClick={handleOpen}
      >
        {children}
      </Button>
      <ReportRequestWizard
        opened={opened}
        onClose={() => setOpened(false)}
        defaultReportType={reportType}
      />
    </>
  );
}
