# Brothers of the Passport - Setup Guide

## Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- Stripe account
- Resend account
- Vercel account (for deployment)

## Quick Start

### 1. Clone and Install

```bash
git clone <repository>
cd brothers-of-the-passport
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in all values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Source | Description |
|----------|--------|-------------|
| `PUBLIC_SITE_URL` | Your domain | Production URL |
| `SUPABASE_URL` | Supabase Dashboard > Settings > API | Project URL |
| `SUPABASE_ANON_KEY` | Supabase Dashboard > Settings > API | Anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard > Settings > API | Service role key (keep secret) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard > Developers > API keys | Secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI or Dashboard | Webhook signing secret |
| `STRIPE_PLUS_PRICE_ID` | Stripe Dashboard > Products | PLUS plan price ID |
| `STRIPE_ELITE_PRICE_ID` | Stripe Dashboard > Products | ELITE plan price ID |
| `RESEND_API_KEY` | Resend Dashboard | API key |
| `ADMIN_EMAIL` | Your email | Admin notifications |

### 3. Supabase Setup

1. Create a new Supabase project
2. Go to SQL Editor
3. Run the migration file:
   ```bash
   # Copy contents of supabase/migrations/001_initial_schema.sql
   # Paste into SQL Editor and run
   ```
4. Enable Email provider in Authentication > Providers
5. Configure Site URL in Authentication > URL Configuration:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/dashboard`

### 4. Stripe Setup

1. Create products in Stripe Dashboard:
   - **PLUS**: $49/month recurring
   - **ELITE**: $99/month recurring
2. Copy price IDs to `.env`
3. Set up webhook endpoint:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events to listen for:
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

### 5. Resend Setup

1. Create a Resend account
2. Add and verify your domain
3. Create an API key
4. Add to `.env`

### 6. Local Development

```bash
npm run dev
```

Visit `http://localhost:4321`

### 7. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for auto-deploys.

## Post-Deploy Checklist

- [ ] Set all environment variables in Vercel
- [ ] Configure Stripe webhook endpoint with production URL
- [ ] Test signup flow
- [ ] Test checkout flow
- [ ] Test email delivery
- [ ] Configure custom domain
- [ ] Enable HTTPS

## Troubleshooting

### Stripe webhooks not working
- Verify webhook secret is correct
- Check Vercel function logs
- Ensure endpoint returns 200 for valid requests

### Emails not sending
- Verify Resend API key
- Check domain is verified in Resend
- Check spam folders

### Auth not working
- Verify Supabase URL and keys
- Check redirect URLs in Supabase config
- Clear browser cookies and try again
