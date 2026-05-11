import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { FreeSiteConfirmationEmail } from '@/emails';

interface FreeClaimFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  businessType?: string;
  siteGoal?: string;
  existingWebsite?: string;
  hasDomain?: string;
  hasBrandAssets?: string;
  contentReady?: string;
  timeline?: string;
  stylePreferences?: string[];
  addOnInterest?: string[];
  projectDetails?: string;
  agree?: boolean;
  website?: string; // honeypot
  recaptchaToken?: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY environment variable is not set');
    return false;
  }
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const ADDON_LABELS: Record<string, string> = {
  'additional-pages': 'Additional pages — $20/page',
  'custom-design': 'Custom design — $50/page',
  'cms-integration': 'CMS integration — $50/page',
  hosting: 'Basic hosting — $20/mo',
  email: 'Email service — $10/mo',
  telemetry: 'Telemetry — $10/mo',
  iterations: 'Page iterations — $20/page',
  'seo-basic': 'SEO Basic — $100/mo',
  'seo-premier': 'SEO Premier — $250/mo',
  'seo-pro': 'SEO Pro — $500/mo',
};

const formatAddOns = (ids: string[] = []): string =>
  ids.map((id) => ADDON_LABELS[id] || id).join(', ') || 'None';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body: FreeClaimFormData = await request.json();

    const {
      name,
      email,
      phone,
      company,
      businessType,
      siteGoal,
      existingWebsite,
      hasDomain,
      hasBrandAssets,
      contentReady,
      timeline,
      stylePreferences = [],
      addOnInterest = [],
      projectDetails,
      agree,
      website,
      recaptchaToken,
    } = body;

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Name, email, and business name are required' },
        { status: 400 }
      );
    }

    if (!agree) {
      return NextResponse.json(
        { error: 'You must agree to the promotion terms.' },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    const row = (label: string, value?: string) =>
      value
        ? `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; width: 180px;">${label}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(value)}</td>
          </tr>
        `
        : '';

    const addOnsList = formatAddOns(addOnInterest);
    const styleList = stylePreferences.length ? stylePreferences.join(', ') : 'No preference';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px;">New Free Website Claim</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 10px 0 0 0;">From lucidweb.studio /free</p>
            </div>

            <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                ${row('Name', name)}
                ${row('Email', email)}
                ${row('Phone', phone)}
                ${row('Business Name', company)}
                ${row('Business Type', businessType)}
                ${row('Site Goal', siteGoal)}
                ${row('Existing Website', existingWebsite)}
                ${row('Has Domain', hasDomain)}
                ${row('Brand Assets', hasBrandAssets)}
                ${row('Content Readiness', contentReady)}
                ${row('Timeline', timeline)}
                ${row('Style Preferences', styleList)}
                ${row('Add-On Interest', addOnsList)}
              </table>

              ${
                projectDetails
                  ? `
                <div style="margin-top: 24px; padding: 20px; background: #f8f9fb; border-radius: 12px;">
                  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Project Details:</p>
                  <p style="margin: 0; color: #0A1A3F; white-space: pre-wrap;">${escapeHtml(projectDetails)}</p>
                </div>
              `
                  : ''
              }

              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background: linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Reply to ${escapeHtml(name)}</a>
              </div>
            </div>

            <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
              Submitted via the /free promotion page on lucidweb.studio
            </p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Lucid Web Studios <noreply@notifications.lucidweb.studio>',
      to: ['evan@lucidweb.studio'],
      replyTo: email,
      subject: `Free Website Claim: ${company} (${name})`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    const claimId = `FREE-${Date.now().toString(36).toUpperCase()}`;

    await resend.emails.send({
      from: 'Lucid Web Studios <noreply@notifications.lucidweb.studio>',
      to: [email],
      subject: "We've received your free website claim — here's what's next",
      react: FreeSiteConfirmationEmail({
        customerName: name,
        company,
        timeline,
        addOnInterest: addOnInterest.map((id) => ADDON_LABELS[id] || id),
        claimId,
      }),
    });

    return NextResponse.json({ success: true, id: data?.id, claimId });
  } catch (error) {
    console.error('Free claim form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
