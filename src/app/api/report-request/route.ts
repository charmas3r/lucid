import { Resend } from 'resend';
import { NextResponse } from 'next/server';

type ReportType = 'seo' | 'geo' | 'conversion' | 'full';

interface ReportRequestData {
  reportTypes: ReportType[];
  websiteUrl: string;
  businessType?: string;
  currentChallenges?: string;
  name: string;
  email: string;
  company?: string;
}

const REPORT_NAMES: Record<ReportType, string> = {
  seo: 'SEO Audit',
  geo: 'GEO Report (AI Search Visibility)',
  conversion: 'Conversion Audit',
  full: 'Full Digital Audit',
};

const REPORT_COLORS: Record<ReportType, string> = {
  seo: '#00D4FF',
  geo: '#A855F7',
  conversion: '#10B981',
  full: '#F59E0B',
};

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const body: ReportRequestData = await request.json();
    const { reportTypes, websiteUrl, businessType, currentChallenges, name, email, company } = body;

    // Validate required fields
    if (!reportTypes?.length || !websiteUrl || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate delivery time
    const deliveryTime = reportTypes.includes('full') || reportTypes.length > 1
      ? '5-7 business days'
      : reportTypes[0] === 'seo' 
        ? '2-3 business days' 
        : '3-4 business days';

    // Build report badges HTML
    const reportBadges = reportTypes
      .map(type => `
        <span style="display: inline-block; background: ${REPORT_COLORS[type]}20; color: ${REPORT_COLORS[type]}; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-right: 8px; margin-bottom: 8px; font-weight: 500;">
          ${REPORT_NAMES[type]}
        </span>
      `)
      .join('');

    // Build internal notification email
    const internalHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0a0a1a;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #4DABF7 0%, #A855F7 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Report Request</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 10px 0 0 0;">From the Digital Audit Wizard</p>
            </div>
            
            <div style="background: #1a1a2e; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid rgba(77, 171, 247, 0.2); border-top: none;">
              
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Requested Reports</p>
                <div>${reportBadges}</div>
              </div>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888; width: 140px;">Website</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <a href="${websiteUrl}" style="color: #4DABF7; text-decoration: none;">${websiteUrl}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Contact</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white;">
                    <strong>${name}</strong><br>
                    <a href="mailto:${email}" style="color: #4DABF7; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Company</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white;">${company}</td>
                </tr>
                ` : ''}
                ${businessType ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Industry</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white;">${businessType}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Delivery</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #10B981; font-weight: 500;">${deliveryTime}</td>
                </tr>
              </table>

              ${currentChallenges ? `
              <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px; border-left: 3px solid #A855F7;">
                <p style="margin: 0 0 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Current Challenges</p>
                <p style="margin: 0; color: white; white-space: pre-wrap; line-height: 1.5;">${currentChallenges}</p>
              </div>
              ` : ''}

              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #4DABF7 0%, #228BE6 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Reply to ${name}</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Build customer confirmation email
    const customerHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🚀 Your Report Request is Confirmed!</h1>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <p style="color: #0A1A3F; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
              <p style="color: #5A7099; font-size: 16px; line-height: 1.6;">
                Thank you for requesting a personalized digital audit from Lucid Web Studios! We&apos;re excited to dive into your website and uncover opportunities for growth.
              </p>

              <div style="background: #f8f9fb; padding: 20px; border-radius: 12px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; color: #0A1A3F; font-weight: 600;">📋 Your Request Summary:</p>
                <div style="margin-bottom: 12px;">${reportBadges}</div>
                <p style="margin: 8px 0; color: #5A7099; font-size: 14px;">
                  <strong style="color: #0A1A3F;">Website:</strong> ${websiteUrl}
                </p>
                <p style="margin: 8px 0; color: #5A7099; font-size: 14px;">
                  <strong style="color: #0A1A3F;">Expected Delivery:</strong> <span style="color: #10B981; font-weight: 500;">${deliveryTime}</span>
                </p>
              </div>

              <div style="background: rgba(31, 79, 216, 0.05); padding: 16px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #1F4FD8;">
                <p style="margin: 0 0 8px 0; color: #1F4FD8; font-weight: 600;">📊 What happens next?</p>
                <ol style="margin: 0; padding-left: 20px; color: #5A7099; font-size: 14px; line-height: 1.8;">
                  <li>Our team will run comprehensive scans on your website</li>
                  <li>We&apos;ll analyze the data and identify key opportunities</li>
                  <li>You&apos;ll receive a detailed PDF report with actionable insights</li>
                  ${reportTypes.includes('full') ? '<li>We\'ll schedule your complimentary 30-minute strategy call</li>' : ''}
                </ol>
              </div>
              
              <p style="color: #5A7099; font-size: 16px; line-height: 1.6;">
                In the meantime, if you have any questions, feel free to reply to this email.
              </p>
              
              <p style="color: #0A1A3F; font-size: 16px; line-height: 1.6; margin-top: 24px;">
                Best regards,<br>
                <strong>The Lucid Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://lucidweb.studio" style="color: #1F4FD8; text-decoration: none; font-size: 14px;">lucidweb.studio</a>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send internal notification
    const { error: internalError } = await resend.emails.send({
      from: 'Lucid Web Studios <notifications@lucidweb.studio>',
      to: ['evan@lucidweb.studio'],
      replyTo: email,
      subject: `🎯 New Report Request: ${reportTypes.map(t => REPORT_NAMES[t]).join(' + ')} - ${websiteUrl}`,
      html: internalHtml,
    });

    if (internalError) {
      console.error('Resend error (internal):', internalError);
      return NextResponse.json(
        { error: 'Failed to process request' },
        { status: 500 }
      );
    }

    // Send customer confirmation
    await resend.emails.send({
      from: 'Lucid Web Studios <evan@lucidweb.studio>',
      to: [email],
      subject: '🚀 Your Digital Audit Request is Confirmed!',
      html: customerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Report request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
