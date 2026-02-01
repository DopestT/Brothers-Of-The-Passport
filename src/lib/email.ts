import { Resend } from 'resend';

// Initialize Resend with API key (server-side only)
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@brothersofthepassport.com';
const RESEND_FROM_NAME = process.env.RESEND_FROM_NAME || 'Brothers of the Passport';

const resend = new Resend(RESEND_API_KEY);

// Email templates
export type EmailTemplate = 
  | 'welcome-plus'
  | 'welcome-elite'
  | 'payment-failed'
  | 'subscription-canceled'
  | 'application-received'
  | 'admin-new-application'
  | 'admin-new-member';

interface EmailData {
  to: string;
  template: EmailTemplate;
  subject: string;
  data: Record<string, any>;
}

// HTML Email Templates
const templates: Record<EmailTemplate, (data: Record<string, any>) => { html: string; text: string }> = {
  'welcome-plus': (data) => ({
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Brothers of the Passport</title>
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; background: #0f0f0f; color: #F5F0E6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #C9A14A; letter-spacing: 2px; }
    .content { padding: 30px 0; }
    h1 { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 500; color: #F5F0E6; margin-bottom: 20px; }
    p { line-height: 1.7; color: #F5F0E6cc; margin-bottom: 20px; }
    .button { display: inline-block; background: #C9A14A; color: #0f0f0f; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; margin: 20px 0; }
    .features { background: #1a1a1a; padding: 25px; border-radius: 8px; margin: 25px 0; }
    .features h3 { color: #C9A14A; margin-top: 0; font-family: 'Cormorant Garamond', serif; }
    .features ul { padding-left: 20px; }
    .features li { margin-bottom: 10px; color: #F5F0E6cc; }
    .footer { text-align: center; padding-top: 30px; border-top: 1px solid #2a2a2a; color: #F5F0E666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BROTHERS</div>
    </div>
    <div class="content">
      <h1>Welcome to the Brotherhood</h1>
      <p>Hello ${data.name || 'Brother'},</p>
      <p>Your PLUS membership is now active. You've taken the first step toward global leverage and location freedom.</p>
      
      <div class="features">
        <h3>Your PLUS Benefits</h3>
        <ul>
          <li>Access to all Country Guides</li>
          <li>Private Community Forum</li>
          <li>Monthly Newsletter with exclusive insights</li>
          <li>Basic travel perks and deals</li>
        </ul>
      </div>
      
      <a href="${data.dashboardUrl || 'https://brothersofthepassport.com/dashboard'}" class="button">Access Dashboard</a>
      
      <p style="margin-top: 30px;">Questions? Reply to this email or contact us at support@brothersofthepassport.com</p>
      
      <p>To freedom,<br>The Brothers Team</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Brothers of the Passport. All rights reserved.</p>
      <p>You received this email because you subscribed to our membership.</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Welcome to Brothers of the Passport!

Hello ${data.name || 'Brother'},

Your PLUS membership is now active. You've taken the first step toward global leverage and location freedom.

Your PLUS Benefits:
- Access to all Country Guides
- Private Community Forum
- Monthly Newsletter with exclusive insights
- Basic travel perks and deals

Access your dashboard: ${data.dashboardUrl || 'https://brothersofthepassport.com/dashboard'}

Questions? Reply to this email or contact us at support@brothersofthepassport.com

To freedom,
The Brothers Team

© ${new Date().getFullYear()} Brothers of the Passport. All rights reserved.
`,
  }),

  'welcome-elite': (data) => ({
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ELITE - Brothers of the Passport</title>
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; background: #0f0f0f; color: #F5F0E6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #C9A14A; letter-spacing: 2px; }
    .elite-badge { display: inline-block; background: linear-gradient(135deg, #C9A14A, #D4B56A); color: #0f0f0f; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-top: 15px; }
    .content { padding: 30px 0; }
    h1 { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 500; color: #F5F0E6; margin-bottom: 20px; }
    p { line-height: 1.7; color: #F5F0E6cc; margin-bottom: 20px; }
    .button { display: inline-block; background: #C9A14A; color: #0f0f0f; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; margin: 20px 0; }
    .features { background: linear-gradient(135deg, #1a1a1a, #242424); padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #C9A14A40; }
    .features h3 { color: #C9A14A; margin-top: 0; font-family: 'Cormorant Garamond', serif; }
    .features ul { padding-left: 20px; }
    .features li { margin-bottom: 10px; color: #F5F0E6cc; }
    .footer { text-align: center; padding-top: 30px; border-top: 1px solid #2a2a2a; color: #F5F0E666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BROTHERS</div>
      <div class="elite-badge">ELITE MEMBER</div>
    </div>
    <div class="content">
      <h1>Welcome to the Inner Circle</h1>
      <p>Hello ${data.name || 'Brother'},</p>
      <p>Your ELITE membership is now active. You've unlocked the full power of the Brotherhood.</p>
      
      <div class="features">
        <h3>Your ELITE Benefits</h3>
        <ul>
          <li>Everything in PLUS</li>
          <li>Priority Support (24-hour response)</li>
          <li>Exclusive deals and partner offers</li>
          <li>1-on-1 consultation call</li>
          <li>VIP events and meetups access</li>
          <li>Verified resources directory</li>
        </ul>
      </div>
      
      <a href="${data.dashboardUrl || 'https://brothersofthepassport.com/dashboard'}" class="button">Access Dashboard</a>
      
      <p style="margin-top: 30px;">Your dedicated support line: support@brothersofthepassport.com (priority response)</p>
      
      <p>To freedom,<br>The Brothers Team</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Brothers of the Passport. All rights reserved.</p>
      <p>You received this email because you subscribed to our ELITE membership.</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Welcome to ELITE - Brothers of the Passport!

Hello ${data.name || 'Brother'},

Your ELITE membership is now active. You've unlocked the full power of the Brotherhood.

Your ELITE Benefits:
- Everything in PLUS
- Priority Support (24-hour response)
- Exclusive deals and partner offers
- 1-on-1 consultation call
- VIP events and meetups access
- Verified resources directory

Access your dashboard: ${data.dashboardUrl || 'https://brothersofthepassport.com/dashboard'}

Your dedicated support line: support@brothersofthepassport.com (priority response)

To freedom,
The Brothers Team

© ${new Date().getFullYear()} Brothers of the Passport. All rights reserved.
`,
  }),

  'payment-failed': (data) => ({
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Failed - Brothers of the Passport</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0f0f0f; color: #F5F0E6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #C9A14A; }
    .alert { background: #3a1f1f; border: 1px solid #5a2f2f; padding: 20px; border-radius: 8px; margin: 25px 0; }
    .alert h3 { color: #e57373; margin-top: 0; }
    .button { display: inline-block; background: #C9A14A; color: #0f0f0f; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; }
    .footer { text-align: center; padding-top: 30px; border-top: 1px solid #2a2a2a; color: #F5F0E666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BROTHERS</div>
    </div>
    <div class="content">
      <h1>Payment Failed</h1>
      <p>Hello ${data.name || 'Brother'},</p>
      
      <div class="alert">
        <h3>We couldn't process your payment</h3>
        <p>Your ${data.plan || 'membership'} subscription payment failed. Please update your payment method to avoid interruption.</p>
      </div>
      
      <a href="${data.billingUrl || 'https://brothersofthepassport.com/account/billing'}" class="button">Update Payment Method</a>
      
      <p>If you need assistance, contact us at support@brothersofthepassport.com</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Brothers of the Passport</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Payment Failed - Brothers of the Passport

Hello ${data.name || 'Brother'},

We couldn't process your payment. Your ${data.plan || 'membership'} subscription payment failed. Please update your payment method to avoid interruption.

Update payment method: ${data.billingUrl || 'https://brothersofthepassport.com/account/billing'}

If you need assistance, contact us at support@brothersofthepassport.com

© ${new Date().getFullYear()} Brothers of the Passport
`,
  }),

  'subscription-canceled': (data) => ({
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Subscription Canceled - Brothers of the Passport</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0f0f0f; color: #F5F0E6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #C9A14A; }
    .content { padding: 30px 0; }
    .button { display: inline-block; background: #C9A14A; color: #0f0f0f; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; }
    .footer { text-align: center; padding-top: 30px; border-top: 1px solid #2a2a2a; color: #F5F0E666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BROTHERS</div>
    </div>
    <div class="content">
      <h1>Subscription Canceled</h1>
      <p>Hello ${data.name || 'Brother'},</p>
      <p>Your ${data.plan || 'membership'} subscription has been canceled. You'll continue to have access until ${data.accessUntil || 'the end of your billing period'}.</p>
      <p>We're sorry to see you go. If you change your mind, you can reactivate anytime.</p>
      
      <a href="${data.reactivateUrl || 'https://brothersofthepassport.com/join'}" class="button">Reactivate Membership</a>
      
      <p style="margin-top: 30px;">We'd love to hear why you left. Reply to this email with feedback.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Brothers of the Passport</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Subscription Canceled - Brothers of the Passport

Hello ${data.name || 'Brother'},

Your ${data.plan || 'membership'} subscription has been canceled. You'll continue to have access until ${data.accessUntil || 'the end of your billing period'}.

We're sorry to see you go. If you change your mind, you can reactivate anytime.

Reactivate: ${data.reactivateUrl || 'https://brothersofthepassport.com/join'}

We'd love to hear why you left. Reply to this email with feedback.

© ${new Date().getFullYear()} Brothers of the Passport
`,
  }),

  'application-received': (data) => ({
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Application Received - Brothers of the Passport</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0f0f0f; color: #F5F0E6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #C9A14A; }
    .content { padding: 30px 0; }
    .status { background: #1a2a1a; border: 1px solid #2a4a2a; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center; }
    .status h3 { color: #81c784; margin: 0; }
    .footer { text-align: center; padding-top: 30px; border-top: 1px solid #2a2a2a; color: #F5F0E666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BROTHERS</div>
    </div>
    <div class="content">
      <h1>Application Received</h1>
      <p>Hello ${data.name || 'Applicant'},</p>
      <p>Thank you for applying to Brothers of the Passport. We've received your application and are reviewing it.</p>
      
      <div class="status">
        <h3>Status: Under Review</h3>
        <p style="margin-bottom: 0;">Typical response time: 24-48 hours</p>
      </div>
      
      <p>We'll contact you at ${data.email || 'your email'} with our decision.</p>
      
      <p>To freedom,<br>The Brothers Team</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Brothers of the Passport</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Application Received - Brothers of the Passport

Hello ${data.name || 'Applicant'},

Thank you for applying to Brothers of the Passport. We've received your application and are reviewing it.

Status: Under Review
Typical response time: 24-48 hours

We'll contact you at ${data.email || 'your email'} with our decision.

To freedom,
The Brothers Team

© ${new Date().getFullYear()} Brothers of the Passport
`,
  }),

  'admin-new-application': (data) => ({
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Application - Brothers of the Passport</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0f0f0f; color: #F5F0E6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #C9A14A; }
    .content { padding: 30px 0; }
    .details { background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 25px 0; }
    .details p { margin: 8px 0; }
    .label { color: #C9A14A; font-weight: 500; }
    .button { display: inline-block; background: #C9A14A; color: #0f0f0f; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; }
    .footer { text-align: center; padding-top: 30px; border-top: 1px solid #2a2a2a; color: #F5F0E666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BROTHERS</div>
    </div>
    <div class="content">
      <h1>New Application Received</h1>
      <p>A new application has been submitted.</p>
      
      <div class="details">
        <p><span class="label">Name:</span> ${data.name}</p>
        <p><span class="label">Email:</span> ${data.email}</p>
        <p><span class="label">Country Interest:</span> ${data.countryInterest || 'Not specified'}</p>
        <p><span class="label">Message:</span> ${data.message || 'None'}</p>
        <p><span class="label">Submitted:</span> ${data.submittedAt || new Date().toISOString()}</p>
      </div>
      
      <a href="${data.adminUrl || 'https://brothersofthepassport.com/admin/applications'}" class="button">Review in Admin</a>
    </div>
    <div class="footer">
      <p>Admin Notification - Brothers of the Passport</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `New Application - Brothers of the Passport

A new application has been submitted.

Name: ${data.name}
Email: ${data.email}
Country Interest: ${data.countryInterest || 'Not specified'}
Message: ${data.message || 'None'}
Submitted: ${data.submittedAt || new Date().toISOString()}

Review in Admin: ${data.adminUrl || 'https://brothersofthepassport.com/admin/applications'}

Admin Notification - Brothers of the Passport
`,
  }),

  'admin-new-member': (data) => ({
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Member - Brothers of the Passport</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0f0f0f; color: #F5F0E6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #2a2a2a; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #C9A14A; }
    .content { padding: 30px 0; }
    .details { background: #1a2a1a; border: 1px solid #2a4a2a; padding: 20px; border-radius: 8px; margin: 25px 0; }
    .details p { margin: 8px 0; }
    .label { color: #C9A14A; font-weight: 500; }
    .plan-badge { display: inline-block; background: #C9A14A; color: #0f0f0f; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .footer { text-align: center; padding-top: 30px; border-top: 1px solid #2a2a2a; color: #F5F0E666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BROTHERS</div>
    </div>
    <div class="content">
      <h1>New Member Joined</h1>
      <p>A new member has successfully subscribed.</p>
      
      <div class="details">
        <p><span class="label">Name:</span> ${data.name}</p>
        <p><span class="label">Email:</span> ${data.email}</p>
        <p><span class="label">Plan:</span> <span class="plan-badge">${data.plan || 'PLUS'}</span></p>
        <p><span class="label">Amount:</span> ${data.amount || '$49/month'}</p>
        <p><span class="label">Joined:</span> ${data.joinedAt || new Date().toISOString()}</p>
      </div>
      
      <p>Total members: ${data.totalMembers || 'N/A'}</p>
    </div>
    <div class="footer">
      <p>Admin Notification - Brothers of the Passport</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `New Member - Brothers of the Passport

A new member has successfully subscribed.

Name: ${data.name}
Email: ${data.email}
Plan: ${data.plan || 'PLUS'}
Amount: ${data.amount || '$49/month'}
Joined: ${data.joinedAt || new Date().toISOString()}

Total members: ${data.totalMembers || 'N/A'}

Admin Notification - Brothers of the Passport
`,
  }),
};

// Send email function
export async function sendEmail({ to, template, subject, data }: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const templateFn = templates[template];
    if (!templateFn) {
      throw new Error(`Template '${template}' not found`);
    }

    const { html, text } = templateFn(data);

    const result = await resend.emails.send({
      from: `${RESEND_FROM_NAME} <${RESEND_FROM_EMAIL}>`,
      to,
      subject,
      html,
      text,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Batch send emails (for admin notifications)
export async function sendBatchEmails(emails: EmailData[]): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = await Promise.all(emails.map(email => sendEmail(email)));
  
  return {
    success: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    errors: results.filter(r => !r.success).map(r => r.error || 'Unknown error'),
  };
}

// Log email to database
export async function logEmail(to: string, templateName: string, subject: string, status: string, metadata?: Record<string, any>) {
  // This would be called server-side with Supabase service role
  // Implementation depends on your setup
  console.log('Email logged:', { to, templateName, subject, status, metadata });
}
