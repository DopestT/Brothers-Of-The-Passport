# Brothers of the Passport - Operator Guide

## Daily Operations

### Monitoring

1. **Check Status Endpoint**
   ```bash
   curl https://yourdomain.com/api/status
   ```

2. **Monitor Vercel Logs**
   - Go to Vercel Dashboard > Project > Functions
   - Check for errors in API routes

3. **Monitor Stripe**
   - Check Dashboard for failed payments
   - Review subscription churn

### Member Management

#### View Members
- Go to `/admin/members`
- Requires admin role
- Export CSV for analysis

#### Review Applications
- Go to `/admin/applications`
- Status options: new, reviewed, accepted, rejected, waitlisted
- Click to view details and update status

#### Manual Role Changes
```sql
-- Promote to admin (run in Supabase SQL Editor)
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

### Email Management

#### Test Email Templates
```bash
# Send test email
curl -X POST https://yourdomain.com/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com", "template": "welcome-plus"}'
```

#### View Email Logs
- Check Resend Dashboard for delivery status
- Query `email_logs` table in Supabase

### Analytics

#### Affiliate Click Stats
```sql
-- Top links last 30 days
SELECT link_key, COUNT(*) as clicks
FROM affiliate_clicks
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY link_key
ORDER BY clicks DESC;
```

#### Member Growth
```sql
-- New members by month
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as new_members
FROM profiles
WHERE role IN ('plus', 'elite')
GROUP BY month
ORDER BY month DESC;
```

#### Revenue
```sql
-- MRR calculation
SELECT 
  plan,
  COUNT(*) as subscribers,
  CASE 
    WHEN plan = 'plus' THEN COUNT(*) * 49
    WHEN plan = 'elite' THEN COUNT(*) * 99
  END as monthly_revenue
FROM subscriptions
WHERE status = 'active'
GROUP BY plan;
```

## Maintenance

### Database Backups

Supabase provides automatic daily backups. To manually export:

```bash
# Using supabase CLI
supabase db dump -f backup.sql
```

Or export tables via Supabase Dashboard > Database > Backup.

### Stripe Data Export

1. Go to Stripe Dashboard > Reports
2. Export:
   - Revenue Recognition
   - Subscriptions
   - Customers

### Updating Price IDs

When changing subscription prices:

1. Create new prices in Stripe
2. Update `.env` with new price IDs
3. Redeploy
4. Existing subscriptions continue on old price

## Security

### Rotate Secrets

#### Supabase Service Role Key
1. Go to Supabase Dashboard > Settings > API
2. Generate new service role key
3. Update in Vercel environment variables
4. Redeploy

#### Stripe Webhook Secret
1. Go to Stripe Dashboard > Developers > Webhooks
2. Reveal signing secret
3. Update in Vercel

#### Resend API Key
1. Go to Resend Dashboard > API Keys
2. Create new key
3. Update in Vercel

### Security Checks

Run monthly:
- Review admin users (`SELECT * FROM profiles WHERE role = 'admin'`)
- Check for suspicious login attempts
- Review affiliate click patterns

## Troubleshooting

### Member can't access content
1. Check their subscription status:
   ```sql
   SELECT * FROM subscriptions WHERE user_id = 'user-uuid';
   ```
2. Verify role matches subscription:
   ```sql
   SELECT role FROM profiles WHERE id = 'user-uuid';
   ```
3. If mismatched, manually update role

### Payment failed but member still has access
- Subscription status may be `past_due` with grace period
- Member loses access when status becomes `canceled` or `unpaid`

### Webhook errors
1. Check Vercel function logs
2. Verify webhook secret matches
3. Check event types are correct
4. Test with Stripe CLI:
   ```bash
   stripe trigger checkout.session.completed
   ```

## Support Escalation

### Critical Issues (site down, payments broken)
1. Check Vercel status page
2. Check Stripe status page
3. Check Supabase status page
4. Review recent deployments
5. Rollback if needed

### Member Support
- Email: support@brothersofthepassport.com
- Common issues:
  - Password reset: `/forgot-password`
  - Billing: `/account/billing`
  - Access issues: Check subscription status

## Contact

- Technical: tech@brothersofthepassport.com
- Admin: admin@brothersofthepassport.com
