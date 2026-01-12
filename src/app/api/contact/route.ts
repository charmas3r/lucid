import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { InquiryConfirmationEmail } from '@/emails';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    // Initialize Resend inside handler to avoid build-time errors
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const body: ContactFormData = await request.json();
    
    const { name, email, phone, company, service, preferredDate, preferredTime, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Build the email content
    const consultationInfo = preferredDate && preferredTime 
      ? `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Preferred Consultation</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>${preferredDate} at ${preferredTime}</strong></td>
        </tr>
      ` 
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 10px 0 0 0;">From lucidweb.studio</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; width: 140px;">Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Email</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #1F4FD8; text-decoration: none;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Phone</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #1F4FD8; text-decoration: none;">${phone}</a></td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Company</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${company}</td>
                </tr>
                ` : ''}
                ${service ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Service</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><span style="background: rgba(31, 79, 216, 0.1); color: #1F4FD8; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${service}</span></td>
                </tr>
                ` : ''}
                ${consultationInfo}
              </table>
              
              ${message ? `
              <div style="margin-top: 24px; padding: 20px; background: #f8f9fb; border-radius: 12px;">
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Project Details:</p>
                <p style="margin: 0; color: #0A1A3F; white-space: pre-wrap;">${message}</p>
              </div>
              ` : ''}
              
              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Reply to ${name}</a>
              </div>
            </div>
            
            <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
              This email was sent from the contact form on lucidweb.studio
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Lucid Web Studios <noreply@notifications.lucidweb.studio>',
      to: ['evan@lucidweb.studio'],
      replyTo: email,
      subject: `New Contact: ${name}${service ? ` - ${service}` : ''}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Generate a simple reference ID
    const inquiryId = `LWS-${Date.now().toString(36).toUpperCase()}`;

    // Send confirmation email to the user using React Email template
    await resend.emails.send({
      from: 'Lucid Web Studios <noreply@notifications.lucidweb.studio>',
      to: [email],
      subject: "We've received your inquiry! Here's what happens next",
      react: InquiryConfirmationEmail({
        customerName: name,
        service,
        preferredDate,
        preferredTime,
        inquiryId,
      }),
    });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
