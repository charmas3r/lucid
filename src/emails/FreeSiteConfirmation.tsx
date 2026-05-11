import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface FreeSiteConfirmationEmailProps {
  customerName: string;
  company?: string;
  timeline?: string;
  addOnInterest?: string[];
  claimId?: string;
}

const baseUrl = 'https://lucidweb.studio';

export const FreeSiteConfirmationEmail = ({
  customerName = 'there',
  company,
  timeline,
  addOnInterest = [],
  claimId,
}: FreeSiteConfirmationEmailProps) => {
  const previewText = `Thanks ${customerName} — we received your free website claim.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Row>
              <Column align="center">
                <Text style={logoText}>LUCID</Text>
                <Text style={logoSubtext}>WEB STUDIOS</Text>
              </Column>
            </Row>
          </Section>

          <Section style={content}>
            <Section style={iconContainer}>
              <Text style={checkIcon}>✓</Text>
            </Section>

            <Heading style={h1}>Your free website claim is in!</Heading>

            <Text style={greeting}>Hi {customerName},</Text>

            <Text style={paragraph}>
              Thanks for claiming a free site through Lucid Web Studios.
              We&apos;ll review your submission and respond within{' '}
              <strong>2 business days</strong> to confirm your slot and
              outline next steps.
            </Text>

            {(company || timeline || claimId || addOnInterest.length > 0) && (
              <Section style={summaryCard}>
                <Text style={summaryTitle}>📋 Claim Summary</Text>
                {company && (
                  <Row style={summaryRow}>
                    <Column style={summaryLabel}>Business:</Column>
                    <Column style={summaryValue}>
                      <Text style={summaryValueText}>{company}</Text>
                    </Column>
                  </Row>
                )}
                {timeline && (
                  <Row style={summaryRow}>
                    <Column style={summaryLabel}>Timeline:</Column>
                    <Column style={summaryValue}>
                      <Text style={summaryValueText}>{timeline}</Text>
                    </Column>
                  </Row>
                )}
                {addOnInterest.length > 0 && (
                  <Row style={summaryRow}>
                    <Column style={summaryLabel}>Add-ons:</Column>
                    <Column style={summaryValue}>
                      <Text style={summaryValueText}>
                        {addOnInterest.join(', ')}
                      </Text>
                    </Column>
                  </Row>
                )}
                {claimId && (
                  <Row style={summaryRow}>
                    <Column style={summaryLabel}>Reference ID:</Column>
                    <Column style={summaryValue}>
                      <Text style={referenceId}>{claimId}</Text>
                    </Column>
                  </Row>
                )}
              </Section>
            )}

            <Section style={stepsSection}>
              <Heading as="h2" style={h2}>
                What happens next?
              </Heading>

              <Section style={stepCard}>
                <Row>
                  <Column style={stepNumber}>
                    <Text style={stepNumberText}>1</Text>
                  </Column>
                  <Column style={stepContent}>
                    <Text style={stepTitle}>Quick review</Text>
                    <Text style={stepDescription}>
                      We&apos;ll review your business, goals, and fit for the
                      promotion within 2 business days.
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
                    <Text style={stepTitle}>Kickoff call</Text>
                    <Text style={stepDescription}>
                      If your slot is confirmed, we&apos;ll book a short call
                      to walk through your content, design direction, and
                      timeline.
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
                    <Text style={stepTitle}>Build &amp; launch</Text>
                    <Text style={stepDescription}>
                      Once we have your assets, we&apos;ll deliver your free
                      one-page site in about 7 business days, including one
                      round of revisions.
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            <Section style={timelineBox}>
              <Text style={timelineText}>
                <strong>What&apos;s included:</strong> a one-page responsive
                site with modern template-based design, basic on-page SEO, and
                one revision round. Hosting, domain, additional pages, custom
                design, and CMS are optional add-ons.
              </Text>
            </Section>

            <Hr style={divider} />

            <Section style={ctaSection}>
              <Text style={ctaText}>
                In the meantime, take a look at our work:
              </Text>
              <Row>
                <Column align="center">
                  <Button style={primaryButton} href={`${baseUrl}/case-studies`}>
                    View Our Work
                  </Button>
                </Column>
              </Row>
            </Section>

            <Section style={questionsSection}>
              <Text style={questionsTitle}>Questions?</Text>
              <Text style={questionsText}>
                Reply to this email or reach us directly at{' '}
                <Link href="mailto:evan@lucidweb.studio" style={link}>
                  evan@lucidweb.studio
                </Link>
              </Text>
            </Section>

            <Section style={signOff}>
              <Text style={signOffText}>
                Talk soon,
                <br />
                <strong>The Lucid Team</strong>
              </Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerLogo}>LUCID WEB STUDIOS</Text>
            <Text style={footerTagline}>
              Crafting Digital Experiences That Convert
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerText}>
              © {new Date().getFullYear()} Lucid Web Studios. All rights reserved.
            </Text>
            <Text style={footerAddress}>
              This email was sent because you claimed a free website on lucidweb.studio.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default FreeSiteConfirmationEmail;

// Styles (mirror InquiryConfirmation for brand consistency)
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
