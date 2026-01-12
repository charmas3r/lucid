import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface InquiryConfirmationEmailProps {
  customerName: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  inquiryId?: string;
}

const baseUrl = 'https://lucidweb.studio';

export const InquiryConfirmationEmail = ({
  customerName = 'there',
  service,
  preferredDate,
  preferredTime,
  inquiryId,
}: InquiryConfirmationEmailProps) => {
  const previewText = `Thanks for reaching out, ${customerName}! We've received your inquiry.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with gradient */}
          <Section style={header}>
            <Row>
              <Column align="center">
                <Text style={logoText}>LUCID</Text>
                <Text style={logoSubtext}>WEB STUDIOS</Text>
              </Column>
            </Row>
          </Section>

          {/* Main content */}
          <Section style={content}>
            {/* Success icon */}
            <Section style={iconContainer}>
              <Text style={checkIcon}>✓</Text>
            </Section>

            <Heading style={h1}>We've Received Your Inquiry!</Heading>

            <Text style={greeting}>Hi {customerName},</Text>

            <Text style={paragraph}>
              Thank you for reaching out to Lucid Web Studios. We're excited to
              learn more about your project and how we can help bring your
              vision to life.
            </Text>

            {/* Inquiry summary card */}
            {(service || preferredDate) && (
              <Section style={summaryCard}>
                <Text style={summaryTitle}>📋 Your Inquiry Summary</Text>
                {service && (
                  <Row style={summaryRow}>
                    <Column style={summaryLabel}>Service Interest:</Column>
                    <Column style={summaryValue}>
                      <Text style={serviceBadge}>{service}</Text>
                    </Column>
                  </Row>
                )}
                {preferredDate && preferredTime && (
                  <Row style={summaryRow}>
                    <Column style={summaryLabel}>Requested Time:</Column>
                    <Column style={summaryValue}>
                      <Text style={summaryValueText}>
                        {preferredDate} at {preferredTime}
                      </Text>
                    </Column>
                  </Row>
                )}
                {inquiryId && (
                  <Row style={summaryRow}>
                    <Column style={summaryLabel}>Reference ID:</Column>
                    <Column style={summaryValue}>
                      <Text style={referenceId}>{inquiryId}</Text>
                    </Column>
                  </Row>
                )}
              </Section>
            )}

            {/* Next steps */}
            <Section style={stepsSection}>
              <Heading as="h2" style={h2}>
                What Happens Next?
              </Heading>

              <Section style={stepCard}>
                <Row>
                  <Column style={stepNumber}>
                    <Text style={stepNumberText}>1</Text>
                  </Column>
                  <Column style={stepContent}>
                    <Text style={stepTitle}>Review Your Request</Text>
                    <Text style={stepDescription}>
                      Our team will carefully review your inquiry and project
                      requirements within the next few hours.
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Section style={stepCard}>
                <Row>
                  <Column style={stepNumber}>
                    <Text style={stepNumberText}>2</Text>
                  </Column>
                  <Column style={stepContent}>
                    <Text style={stepTitle}>Personal Follow-Up</Text>
                    <Text style={stepDescription}>
                      You'll receive a personalized response from our team
                      within <strong>24 hours</strong>, typically much sooner.
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Section style={stepCard}>
                <Row>
                  <Column style={stepNumber}>
                    <Text style={stepNumberText}>3</Text>
                  </Column>
                  <Column style={stepContent}>
                    <Text style={stepTitle}>Discovery Call</Text>
                    <Text style={stepDescription}>
                      We'll schedule a brief call to discuss your goals, answer
                      questions, and explore how we can help.
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* Timeline expectation */}
            <Section style={timelineBox}>
              <Text style={timelineIcon}>⏱️</Text>
              <Text style={timelineText}>
                <strong>Expected response time:</strong> Within 24 hours
                (usually same-day during business hours)
              </Text>
            </Section>

            <Hr style={divider} />

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Text style={ctaText}>
                In the meantime, feel free to explore our work or learn more
                about what we do:
              </Text>
              <Row>
                <Column align="center">
                  <Button style={primaryButton} href={`${baseUrl}/case-studies`}>
                    View Our Work
                  </Button>
                </Column>
              </Row>
              <Row style={secondaryButtonRow}>
                <Column align="center">
                  <Button style={secondaryButton} href={`${baseUrl}/services`}>
                    Explore Services
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* Questions section */}
            <Section style={questionsSection}>
              <Text style={questionsTitle}>Have Questions?</Text>
              <Text style={questionsText}>
                Feel free to reply to this email or reach us directly at{' '}
                <Link href="mailto:evan@lucidweb.studio" style={link}>
                  evan@lucidweb.studio
                </Link>
              </Text>
            </Section>

            {/* Sign off */}
            <Section style={signOff}>
              <Text style={signOffText}>
                Looking forward to connecting,
                <br />
                <strong>The Lucid Team</strong>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerLogo}>LUCID WEB STUDIOS</Text>
            <Text style={footerTagline}>
              Crafting Digital Experiences That Convert
            </Text>
            <Row style={socialRow}>
              <Column align="center">
                <Link href={baseUrl} style={socialLink}>
                  Website
                </Link>
                <Text style={socialDivider}>•</Text>
                <Link
                  href="https://linkedin.com/company/lucidwebstudios"
                  style={socialLink}
                >
                  LinkedIn
                </Link>
              </Column>
            </Row>
            <Hr style={footerDivider} />
            <Text style={footerText}>
              © {new Date().getFullYear()} Lucid Web Studios. All rights
              reserved.
            </Text>
            <Text style={footerAddress}>
              This email was sent because you submitted an inquiry on our
              website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default InquiryConfirmationEmail;

// Styles
const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
};

const header: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const logoText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  letterSpacing: '4px',
  margin: '0',
};

const logoSubtext: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.85)',
  fontSize: '12px',
  fontWeight: '500',
  letterSpacing: '3px',
  margin: '4px 0 0 0',
};

const content: React.CSSProperties = {
  padding: '40px 40px 20px',
};

const iconContainer: React.CSSProperties = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const checkIcon: React.CSSProperties = {
  backgroundColor: '#10B981',
  borderRadius: '50%',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '24px',
  fontWeight: '700',
  height: '48px',
  lineHeight: '48px',
  margin: '0',
  textAlign: 'center' as const,
  width: '48px',
};

const h1: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const h2: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '0 0 20px',
};

const greeting: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '1.5',
  margin: '0 0 16px',
};

const paragraph: React.CSSProperties = {
  color: '#5A7099',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 24px',
};

const summaryCard: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '32px',
};

const summaryTitle: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const summaryRow: React.CSSProperties = {
  marginBottom: '12px',
};

const summaryLabel: React.CSSProperties = {
  color: '#5A7099',
  fontSize: '14px',
  width: '140px',
  verticalAlign: 'middle' as const,
};

const summaryValue: React.CSSProperties = {
  verticalAlign: 'middle' as const,
};

const summaryValueText: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const serviceBadge: React.CSSProperties = {
  backgroundColor: 'rgba(31, 79, 216, 0.1)',
  borderRadius: '20px',
  color: '#1F4FD8',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: '500',
  margin: '0',
  padding: '4px 12px',
};

const referenceId: React.CSSProperties = {
  color: '#5A7099',
  fontFamily: 'monospace',
  fontSize: '13px',
  margin: '0',
};

const stepsSection: React.CSSProperties = {
  marginBottom: '32px',
};

const stepCard: React.CSSProperties = {
  marginBottom: '16px',
};

const stepNumber: React.CSSProperties = {
  width: '36px',
  verticalAlign: 'top' as const,
};

const stepNumberText: React.CSSProperties = {
  backgroundColor: '#1F4FD8',
  borderRadius: '50%',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  height: '28px',
  lineHeight: '28px',
  margin: '0',
  textAlign: 'center' as const,
  width: '28px',
};

const stepContent: React.CSSProperties = {
  paddingLeft: '12px',
  verticalAlign: 'top' as const,
};

const stepTitle: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '15px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const stepDescription: React.CSSProperties = {
  color: '#5A7099',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const timelineBox: React.CSSProperties = {
  backgroundColor: 'rgba(31, 79, 216, 0.05)',
  borderLeft: '4px solid #1F4FD8',
  borderRadius: '0 8px 8px 0',
  padding: '16px 20px',
  marginBottom: '24px',
};

const timelineIcon: React.CSSProperties = {
  fontSize: '18px',
  margin: '0 0 8px',
};

const timelineText: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const ctaSection: React.CSSProperties = {
  marginBottom: '32px',
  textAlign: 'center' as const,
};

const ctaText: React.CSSProperties = {
  color: '#5A7099',
  fontSize: '15px',
  lineHeight: '1.5',
  margin: '0 0 20px',
};

const primaryButton: React.CSSProperties = {
  backgroundColor: '#1F4FD8',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 28px',
  textDecoration: 'none',
};

const secondaryButtonRow: React.CSSProperties = {
  marginTop: '12px',
};

const secondaryButton: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: '2px solid #1F4FD8',
  borderRadius: '8px',
  color: '#1F4FD8',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '10px 28px',
  textDecoration: 'none',
};

const questionsSection: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  marginBottom: '32px',
  padding: '20px',
  textAlign: 'center' as const,
};

const questionsTitle: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '15px',
  fontWeight: '600',
  margin: '0 0 8px',
};

const questionsText: React.CSSProperties = {
  color: '#5A7099',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const link: React.CSSProperties = {
  color: '#1F4FD8',
  textDecoration: 'none',
};

const signOff: React.CSSProperties = {
  marginBottom: '16px',
};

const signOffText: React.CSSProperties = {
  color: '#0A1A3F',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
};

const footer: React.CSSProperties = {
  backgroundColor: '#0A1A3F',
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const footerLogo: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '700',
  letterSpacing: '2px',
  margin: '0 0 4px',
};

const footerTagline: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '12px',
  margin: '0 0 20px',
};

const socialRow: React.CSSProperties = {
  marginBottom: '20px',
};

const socialLink: React.CSSProperties = {
  color: '#4DA3FF',
  fontSize: '13px',
  textDecoration: 'none',
};

const socialDivider: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.3)',
  display: 'inline',
  margin: '0 12px',
};

const footerDivider: React.CSSProperties = {
  borderColor: 'rgba(255, 255, 255, 0.1)',
  margin: '0 0 20px',
};

const footerText: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '12px',
  margin: '0 0 8px',
};

const footerAddress: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.4)',
  fontSize: '11px',
  margin: '0',
};
