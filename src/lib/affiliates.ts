import { supabase } from './supabase';

// ============================================
// AFFILIATE STACK - HIGH TRUST ONLY
// ============================================

export interface AffiliatePartner {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  commission?: string;
  badge?: 'verified' | 'elite-only' | 'featured';
  eliteOnly?: boolean;
  icon?: string;
}

// Finance Partners
export const FINANCE_PARTNERS: AffiliatePartner[] = [
  {
    id: 'wise',
    name: 'Wise',
    category: 'finance',
    description: 'Multi-currency accounts with real exchange rates. Save up to 6x on international transfers.',
    url: 'https://wise.com/invite/u/brotherspassport',
    commission: 'Referral bonus',
    badge: 'verified',
    icon: 'dollar',
  },
  {
    id: 'revolut',
    name: 'Revolut',
    category: 'finance',
    description: 'Global banking app with crypto, stocks, and travel perks. Premium cards for nomads.',
    url: 'https://www.revolut.com/referral/?referral-code=brotherspassport',
    commission: 'Referral bonus',
    badge: 'verified',
    icon: 'credit-card',
  },
  {
    id: 'payoneer',
    name: 'Payoneer',
    category: 'finance',
    description: 'Get paid by international clients. Local bank accounts in 10+ currencies.',
    url: 'https://www.payoneer.com/raf/?rid=brotherspassport',
    commission: '$25 bonus',
    badge: 'verified',
    icon: 'building',
  },
  {
    id: 'offshore-banking',
    name: 'Offshore Banking Guide',
    category: 'finance',
    description: 'Educational resource on international banking. Lead generation for boutique banks.',
    url: '/guides/offshore-banking',
    badge: 'elite-only',
    eliteOnly: true,
    icon: 'globe',
  },
];

// Visa & Relocation Partners
export const VISA_PARTNERS: AffiliatePartner[] = [
  {
    id: 'nomad-capitalist',
    name: 'Nomad Capitalist',
    category: 'visa',
    description: 'Second residency and citizenship by investment. Full-service consultancy.',
    url: 'https://nomadcapitalist.com/?ref=brotherspassport',
    commission: 'Lead referral',
    badge: 'featured',
    eliteOnly: true,
    icon: 'passport',
  },
  {
    id: 'global-citizen',
    name: 'Global Citizen Solutions',
    category: 'visa',
    description: 'Golden Visa programs in Portugal, Spain, Greece. Real estate + residency packages.',
    url: 'https://www.globalcitizensolutions.com/?ref=brotherspassport',
    commission: 'Lead referral',
    badge: 'verified',
    eliteOnly: true,
    icon: 'home',
  },
  {
    id: 'visa-hq',
    name: 'VisaHQ',
    category: 'visa',
    description: 'Visa processing service for 200+ countries. Expedited options available.',
    url: 'https://www.visahq.com/?affiliate=brotherspassport',
    commission: 'Per application',
    badge: 'verified',
    icon: 'file-text',
  },
];

// Credit & Points Partners
export const CREDIT_PARTNERS: AffiliatePartner[] = [
  {
    id: 'amex-platinum',
    name: 'American Express Platinum',
    category: 'credit',
    description: 'Premium travel card with lounge access, 5x points on flights, $200 airline credit.',
    url: 'https://www.americanexpress.com/us/credit-cards/card/platinum/?ref=brotherspassport',
    commission: 'Referral bonus',
    badge: 'featured',
    icon: 'crown',
  },
  {
    id: 'chase-sapphire',
    name: 'Chase Sapphire Reserve',
    category: 'credit',
    description: '3x points on travel and dining. $300 annual travel credit. Priority Pass lounges.',
    url: 'https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve?ref=brotherspassport',
    commission: 'Referral bonus',
    badge: 'verified',
    icon: 'gem',
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture X',
    category: 'credit',
    description: '2x miles on everything. $300 annual travel credit. 10x on hotels/rental cars.',
    url: 'https://www.capitalone.com/credit-cards/venture-x/?ref=brotherspassport',
    commission: 'Referral bonus',
    badge: 'verified',
    icon: 'plane',
  },
  {
    id: 'points-guy',
    name: 'The Points Guy',
    category: 'credit',
    description: 'Maximize your points and miles. Deal alerts and redemption strategies.',
    url: 'https://thepointsguy.com/?ref=brotherspassport',
    commission: 'Affiliate',
    badge: 'verified',
    icon: 'trending-up',
  },
];

// Tools & Services
export const TOOLS_PARTNERS: AffiliatePartner[] = [
  {
    id: 'nordvpn',
    name: 'NordVPN',
    category: 'tools',
    description: 'Secure browsing from anywhere. 6,000+ servers in 60 countries. No logs.',
    url: 'https://nordvpn.com/brotherspassport',
    commission: '40% recurring',
    badge: 'verified',
    icon: 'shield',
  },
  {
    id: 'airalo',
    name: 'Airalo',
    category: 'tools',
    description: 'eSIMs for 200+ countries. Instant activation, no physical SIM needed.',
    url: 'https://www.airalo.com/?ref=brotherspassport',
    commission: '$3 credit',
    badge: 'verified',
    icon: 'sim',
  },
  {
    id: '1password',
    name: '1Password',
    category: 'tools',
    description: 'Password manager for teams and families. Secure document storage.',
    url: 'https://1password.com/sign-up/?ref=brotherspassport',
    commission: 'Referral credit',
    badge: 'verified',
    icon: 'lock',
  },
  {
    id: 'protonmail',
    name: 'Proton Mail',
    category: 'tools',
    description: 'Encrypted email from Switzerland. Privacy-first alternative to Gmail.',
    url: 'https://proton.me/mail?ref=brotherspassport',
    commission: 'Referral credit',
    badge: 'verified',
    icon: 'mail',
  },
  {
    id: 'google-fi',
    name: 'Google Fi',
    category: 'tools',
    description: 'International phone plan that works in 200+ countries. Flexible pricing.',
    url: 'https://g.co/fi/r/brotherspassport',
    commission: '$20 credit',
    badge: 'verified',
    icon: 'phone',
  },
];

// Travel Partners
export const TRAVEL_PARTNERS: AffiliatePartner[] = [
  {
    id: 'safetywing',
    name: 'SafetyWing',
    category: 'travel',
    description: 'Nomad insurance. $45/month. Covers 180+ countries. Home country coverage included.',
    url: 'https://safetywing.com/nomad-insurance?ref=brotherspassport',
    commission: '10% recurring',
    badge: 'featured',
    icon: 'heart',
  },
  {
    id: 'world-nomads',
    name: 'World Nomads',
    category: 'travel',
    description: 'Adventure travel insurance. Covers 200+ activities. 24/7 emergency assistance.',
    url: 'https://www.worldnomads.com?affiliate=brotherspassport',
    commission: 'Per policy',
    badge: 'verified',
    icon: 'compass',
  },
  {
    id: 'booking',
    name: 'Booking.com',
    category: 'travel',
    description: 'Hotels, apartments, and villas worldwide. Member rates on long stays.',
    url: 'https://www.booking.com/index.html?aid=brotherspassport',
    commission: '4-6%',
    badge: 'verified',
    icon: 'bed',
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    category: 'travel',
    description: 'Unique stays and experiences. Monthly discounts up to 40%.',
    url: 'https://www.airbnb.com/r/brotherspassport',
    commission: 'Referral credit',
    badge: 'verified',
    icon: 'home',
  },
  {
    id: 'trustedhousesitters',
    name: 'TrustedHousesitters',
    category: 'travel',
    description: 'Free accommodation by house sitting. Annual membership.',
    url: 'https://www.trustedhousesitters.com/?ref=brotherspassport',
    commission: '25%',
    badge: 'elite-only',
    eliteOnly: true,
    icon: 'key',
  },
];

// Get all partners by category
export function getPartnersByCategory(category: string, isElite: boolean = false): AffiliatePartner[] {
  const allPartners = [
    ...FINANCE_PARTNERS,
    ...VISA_PARTNERS,
    ...CREDIT_PARTNERS,
    ...TOOLS_PARTNERS,
    ...TRAVEL_PARTNERS,
  ];
  
  return allPartners.filter(p => {
    if (p.category !== category) return false;
    if (p.eliteOnly && !isElite) return false;
    return true;
  });
}

// Get all categories
export function getPartnerCategories(): { id: string; name: string; icon: string }[] {
  return [
    { id: 'finance', name: 'Finance & Banking', icon: 'dollar' },
    { id: 'visa', name: 'Visas & Relocation', icon: 'passport' },
    { id: 'credit', name: 'Credit & Points', icon: 'credit-card' },
    { id: 'tools', name: 'Tools & Services', icon: 'tool' },
    { id: 'travel', name: 'Travel & Insurance', icon: 'plane' },
  ];
}

// Track affiliate click
export async function trackAffiliateClick(
  partnerId: string,
  category: string,
  estimatedValue?: number
): Promise<void> {
  try {
    await fetch('/api/track/affiliate-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        partnerId,
        category,
        estimatedValue,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Track affiliate click error:', error);
  }
}

// Build affiliate URL with tracking
export function buildAffiliateUrl(
  partnerId: string,
  subId?: string
): string {
  const allPartners = [
    ...FINANCE_PARTNERS,
    ...VISA_PARTNERS,
    ...CREDIT_PARTNERS,
    ...TOOLS_PARTNERS,
    ...TRAVEL_PARTNERS,
  ];
  
  const partner = allPartners.find(p => p.id === partnerId);
  if (!partner) return '#';
  
  const url = new URL(partner.url);
  
  // Add tracking parameters
  url.searchParams.set('utm_source', 'brotherspassport');
  url.searchParams.set('utm_medium', 'affiliate');
  url.searchParams.set('utm_campaign', partner.category);
  
  if (subId) {
    url.searchParams.set('subid', subId);
  }
  
  return url.toString();
}

// Get featured partners
export function getFeaturedPartners(isElite: boolean = false): AffiliatePartner[] {
  const allPartners = [
    ...FINANCE_PARTNERS,
    ...VISA_PARTNERS,
    ...CREDIT_PARTNERS,
    ...TOOLS_PARTNERS,
    ...TRAVEL_PARTNERS,
  ];
  
  return allPartners
    .filter(p => p.badge === 'featured' || p.badge === 'verified')
    .filter(p => !p.eliteOnly || isElite)
    .slice(0, 6);
}

// Get partner stats (admin only)
export async function getPartnerStats(days: number = 30): Promise<{
  partnerId: string;
  clicks: number;
  estimatedRevenue: number;
}[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('affiliate_clicks')
    .select('link_key, created_at')
    .gte('created_at', startDate.toISOString());
  
  if (error) throw error;
  
  // Aggregate stats
  const stats: Record<string, { clicks: number; revenue: number }> = {};
  
  data?.forEach((click) => {
    if (!stats[click.link_key]) {
      stats[click.link_key] = { clicks: 0, revenue: 0 };
    }
    stats[click.link_key].clicks++;
  });
  
  return Object.entries(stats).map(([partnerId, stat]) => ({
    partnerId,
    clicks: stat.clicks,
    estimatedRevenue: stat.revenue,
  }));
}
