// Travel Booking Integration
// Supports Duffel API (primary) and Travelpayouts (fallback)

// Duffel Configuration
const DUFFEL_API_KEY = import.meta.env.VITE_DUFFEL_API_KEY || '';
const DUFFEL_API_URL = 'https://api.duffel.com/air';

// Travelpayouts Configuration (for future use)
// const TRAVELPAYOUTS_TOKEN = import.meta.env.VITE_TRAVELPAYOUTS_TOKEN || '';
// const TRAVELPAYOUTS_MARKER = import.meta.env.VITE_TRAVELPAYOUTS_MARKER || '';

// Affiliate IDs for tracking
const AFFILIATE_CONFIG = {
  booking: {
    baseUrl: 'https://www.booking.com',
    aid: import.meta.env.VITE_BOOKING_AID || '',
  },
  agoda: {
    baseUrl: 'https://www.agoda.com',
    cid: import.meta.env.VITE_AGODA_CID || '',
  },
  safetywing: {
    baseUrl: 'https://safetywing.com/nomad-insurance',
    ref: 'brotherspassport',
  },
  worldnomads: {
    baseUrl: 'https://www.worldnomads.com',
    affiliate: 'brotherspassport',
  },
};

// Types
export interface FlightSearch {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
}

export interface HotelSearch {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms?: number;
}

export interface TravelDeal {
  id: string;
  type: 'flight' | 'hotel' | 'insurance';
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  affiliateUrl: string;
  badge?: string;
  expiresAt?: string;
}

// Track travel search
export async function trackTravelSearch(
  type: 'flight' | 'hotel' | 'insurance',
  params: Record<string, any>
): Promise<void> {
  try {
    await fetch('/api/track/travel-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, params, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error('Track search error:', error);
  }
}

// Build affiliate URLs with tracking
export function buildAffiliateUrl(
  provider: keyof typeof AFFILIATE_CONFIG,
  params: Record<string, string> = {}
): string {
  const config = AFFILIATE_CONFIG[provider];
  const url = new URL(config.baseUrl);
  
  // Add affiliate parameters
  if (provider === 'booking' && AFFILIATE_CONFIG.booking.aid) {
    url.searchParams.set('aid', AFFILIATE_CONFIG.booking.aid);
  }
  if (provider === 'agoda' && AFFILIATE_CONFIG.agoda.cid) {
    url.searchParams.set('cid', AFFILIATE_CONFIG.agoda.cid);
  }
  
  // Add custom params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  // Add UTM tracking
  url.searchParams.set('utm_source', 'brotherspassport');
  url.searchParams.set('utm_medium', 'affiliate');
  url.searchParams.set('utm_campaign', 'travel');
  
  return url.toString();
}

// Flight search via Duffel
export async function searchFlightsDuffel(
  search: FlightSearch
): Promise<any[]> {
  if (!DUFFEL_API_KEY) {
    console.warn('Duffel API key not configured');
    return [];
  }

  try {
    const response = await fetch(`${DUFFEL_API_URL}/offer_requests`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DUFFEL_API_KEY}`,
        'Duffel-Version': 'v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          slices: [
            {
              origin: search.origin,
              destination: search.destination,
              departure_date: search.departureDate,
            },
            ...(search.returnDate ? [{
              origin: search.destination,
              destination: search.origin,
              departure_date: search.returnDate,
            }] : []),
          ],
          passengers: Array(search.adults).fill({ type: 'adult' }),
          cabin_class: search.cabinClass,
        },
      }),
    });

    if (!response.ok) throw new Error('Duffel API error');
    
    const data = await response.json();
    return data.data?.offers || [];
  } catch (error) {
    console.error('Duffel search error:', error);
    return [];
  }
}

// Flight search via Travelpayouts (fallback)
export function buildTravelpayoutsUrl(search: FlightSearch): string {
  const TRAVELPAYOUTS_MARKER = import.meta.env.VITE_TRAVELPAYOUTS_MARKER || '';
  const params = new URLSearchParams({
    marker: TRAVELPAYOUTS_MARKER || 'default',
    origin: search.origin,
    destination: search.destination,
    departure_date: search.departureDate,
    return_date: search.returnDate || '',
    adults: search.adults.toString(),
    children: (search.children || 0).toString(),
    trip_class: search.cabinClass === 'business' ? '1' : '0',
    currency: 'USD',
    locale: 'en',
    with_request: '1',
  });
  
  return `https://www.travelpayouts.com/widgets_suggest_params?${params.toString()}`;
}

// Hotel search URL builder
export function buildHotelSearchUrl(
  provider: 'booking' | 'agoda',
  search: HotelSearch
): string {
  const params: Record<string, string> = {
    checkin: search.checkIn,
    checkout: search.checkOut,
    group_adults: search.guests.toString(),
    no_rooms: (search.rooms || 1).toString(),
  };
  
  if (provider === 'booking') {
    params.ss = search.destination;
  } else {
    params.city = search.destination;
  }
  
  return buildAffiliateUrl(provider, params);
}

// Get featured travel deals
export function getFeaturedDeals(isElite: boolean = false): TravelDeal[] {
  const deals: TravelDeal[] = [
    {
      id: '1',
      type: 'insurance',
      title: 'SafetyWing Nomad Insurance',
      description: 'Travel medical insurance for nomads. Covers 180+ countries.',
      price: '$45/month',
      affiliateUrl: AFFILIATE_CONFIG.safetywing.baseUrl,
      badge: isElite ? 'Member Discount' : undefined,
    },
    {
      id: '2',
      type: 'flight',
      title: 'Business Class to Southeast Asia',
      description: 'Premium deals on Qatar, Emirates, and Singapore Airlines.',
      price: 'From $2,400',
      originalPrice: '$4,800',
      discount: '50% off',
      affiliateUrl: buildAffiliateUrl('booking', { label: 'flights' }),
      badge: 'Elite Exclusive',
    },
    {
      id: '3',
      type: 'hotel',
      title: 'Long-Stay Apartments',
      description: 'Monthly rates with up to 40% savings.',
      price: 'From $800/month',
      affiliateUrl: buildAffiliateUrl('booking', { label: 'longstay' }),
    },
  ];
  
  return deals;
}

// Insurance providers
export const INSURANCE_PROVIDERS = [
  {
    name: 'SafetyWing',
    description: 'Nomad Insurance - Monthly subscription, global coverage',
    url: AFFILIATE_CONFIG.safetywing.baseUrl,
    bestFor: 'Digital nomads',
    price: 'From $45/month',
  },
  {
    name: 'World Nomads',
    description: 'Adventure travel insurance with extensive coverage',
    url: AFFILIATE_CONFIG.worldnomads.baseUrl,
    bestFor: 'Adventure travelers',
    price: 'Custom quote',
  },
];

// Track outbound click
export async function trackOutboundClick(
  provider: string,
  type: string,
  estimatedValue?: number
): Promise<void> {
  try {
    await fetch('/api/track/outbound', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        type,
        estimatedValue,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Track outbound error:', error);
  }
}

// City-specific travel perks
export function getCityTravelPerks(city: string): TravelDeal[] {
  const perks: Record<string, TravelDeal[]> = {
    bangkok: [
      {
        id: 'bkk-1',
        type: 'hotel',
        title: 'Sukhumvit Serviced Apartments',
        description: 'Member rates on monthly stays',
        price: '$600/month',
        affiliateUrl: buildAffiliateUrl('booking', { district: 'sukhumvit' }),
        badge: 'Member Rate',
      },
    ],
    lisbon: [
      {
        id: 'lis-1',
        type: 'hotel',
        title: 'Príncipe Real Boutique Hotels',
        description: 'Elite members get complimentary upgrades',
        price: 'From €90/night',
        affiliateUrl: buildAffiliateUrl('booking', { neighborhood: 'principe-real' }),
        badge: 'Elite Perk',
      },
    ],
    mexico: [
      {
        id: 'mex-1',
        type: 'hotel',
        title: 'Roma Norte Coliving',
        description: 'Community-focused stays for members',
        price: '$800/month',
        affiliateUrl: buildAffiliateUrl('booking', { area: 'roma-norte' }),
        badge: 'Member Rate',
      },
    ],
  };
  
  return perks[city.toLowerCase()] || [];
}
