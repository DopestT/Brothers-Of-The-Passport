// SEO Content - Cornerstone Articles & City Guides

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: 'country' | 'city' | 'topic';
  country?: string;
  city?: string;
  content: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  featured: boolean;
}

export interface CityGuide {
  slug: string;
  city: string;
  country: string;
  region: string;
  why: string;
  costOfLiving: {
    accommodation: string;
    food: string;
    transport: string;
    total: string;
  };
  visa: {
    requirements: string;
    duration: string;
    notes: string;
  };
  lifestyle: string;
  risks: string[];
  perks: string[];
  affiliateLinks: {
    flights: string;
    hotels: string;
    insurance: string;
  };
}

// Cornerstone Articles
export const CORNERSTONE_ARTICLES: Guide[] = [
  {
    slug: 'best-countries-digital-nomads-2025',
    title: 'The 15 Best Countries for Digital Nomads in 2025',
    description: 'Comprehensive rankings based on cost of living, visa options, internet speed, and quality of life.',
    category: 'topic',
    content: '',
    tags: ['digital nomad', 'countries', 'rankings', '2025'],
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-15',
    readTime: '15 min',
    featured: true,
  },
  {
    slug: 'portugal-golden-visa-guide',
    title: 'Portugal Golden Visa: Complete 2025 Guide',
    description: 'Everything you need to know about Portugal\'s residency by investment program.',
    category: 'topic',
    content: '',
    tags: ['portugal', 'golden visa', 'residency', 'investment'],
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-10',
    readTime: '12 min',
    featured: true,
  },
  {
    slug: 'thailand-visa-options',
    title: 'Thailand Visa Options for Long-Term Stays',
    description: 'From tourist visas to the Long-Term Resident visa - find your path to living in Thailand.',
    category: 'topic',
    content: '',
    tags: ['thailand', 'visa', 'long-term', 'southeast asia'],
    publishedAt: '2025-01-08',
    updatedAt: '2025-01-08',
    readTime: '10 min',
    featured: false,
  },
  {
    slug: 'offshore-banking-basics',
    title: 'Offshore Banking for Beginners: A Practical Guide',
    description: 'Learn the fundamentals of international banking without the complexity.',
    category: 'topic',
    content: '',
    tags: ['banking', 'offshore', 'finance', 'privacy'],
    publishedAt: '2025-01-05',
    updatedAt: '2025-01-05',
    readTime: '8 min',
    featured: true,
  },
  {
    slug: 'tax-residency-explained',
    title: 'Tax Residency: What Every Nomad Needs to Know',
    description: 'Understanding tax obligations when living abroad.',
    category: 'topic',
    content: '',
    tags: ['tax', 'residency', 'compliance', 'finance'],
    publishedAt: '2025-01-03',
    updatedAt: '2025-01-03',
    readTime: '11 min',
    featured: false,
  },
  {
    slug: 'mexico-temporary-resident-visa',
    title: 'Mexico Temporary Resident Visa: Step-by-Step',
    description: 'How to obtain Mexican residency with income requirements and process timeline.',
    category: 'topic',
    content: '',
    tags: ['mexico', 'visa', 'residency', 'latin america'],
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-01',
    readTime: '9 min',
    featured: false,
  },
  {
    slug: 'credit-cards-travel',
    title: 'Best Credit Cards for International Travelers',
    description: 'Maximize points, minimize fees with these traveler-friendly cards.',
    category: 'topic',
    content: '',
    tags: ['credit cards', 'travel', 'points', 'finance'],
    publishedAt: '2024-12-28',
    updatedAt: '2024-12-28',
    readTime: '7 min',
    featured: false,
  },
  {
    slug: 'dating-abroad-guide',
    title: 'Dating Abroad: A Respectful Approach',
    description: 'Navigating relationships in foreign countries with cultural sensitivity.',
    category: 'topic',
    content: '',
    tags: ['dating', 'culture', 'relationships', 'lifestyle'],
    publishedAt: '2024-12-20',
    updatedAt: '2024-12-20',
    readTime: '10 min',
    featured: false,
  },
  {
    slug: 'cost-living-comparison-2025',
    title: 'Cost of Living Comparison: 20 Popular Nomad Cities',
    description: 'Real numbers on what it costs to live well in top destinations.',
    category: 'topic',
    content: '',
    tags: ['cost of living', 'comparison', 'budget', 'cities'],
    publishedAt: '2024-12-15',
    updatedAt: '2024-12-15',
    readTime: '14 min',
    featured: true,
  },
  {
    slug: 'second-passport-options',
    title: 'Second Passport Options: Citizenship by Investment & Descent',
    description: 'Explore pathways to dual citizenship and their requirements.',
    category: 'topic',
    content: '',
    tags: ['citizenship', 'passport', 'investment', 'descent'],
    publishedAt: '2024-12-10',
    updatedAt: '2024-12-10',
    readTime: '13 min',
    featured: true,
  },
];

// City Guides Database
export const CITY_GUIDES: CityGuide[] = [
  // Portugal
  {
    slug: 'lisbon-portugal',
    city: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    why: 'Lisbon offers an unbeatable combination of European charm, affordable living, excellent weather, and a thriving expat community. The city has become a hub for digital nomads and entrepreneurs seeking EU base.',
    costOfLiving: {
      accommodation: '€800-1,500/month (1BR apartment)',
      food: '€300-500/month',
      transport: '€40/month (monthly pass)',
      total: '€1,500-2,500/month',
    },
    visa: {
      requirements: 'D7 Passive Income Visa or Digital Nomad Visa',
      duration: '1 year renewable, path to permanent residency',
      notes: 'Proof of €760/month income required for D7',
    },
    lifestyle: 'Laid-back Mediterranean lifestyle with world-class food, wine, and culture. Excellent coworking spaces and a strong English-speaking community.',
    risks: [
      'Rising costs due to popularity',
      'Bureaucracy can be slow',
      'Summer tourist crowds',
    ],
    perks: [
      'NHR tax regime (0% on foreign income for 10 years)',
      'Member rates at select coworking spaces',
      'Introductions to local accountants',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/lis',
      hotels: 'https://www.booking.com/city/pt/lisbon.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  {
    slug: 'porto-portugal',
    city: 'Porto',
    country: 'Portugal',
    region: 'Europe',
    why: 'Portugal\'s second city offers lower costs than Lisbon with authentic charm, famous wine culture, and a growing tech scene.',
    costOfLiving: {
      accommodation: '€600-1,200/month',
      food: '€250-400/month',
      transport: '€30/month',
      total: '€1,200-2,000/month',
    },
    visa: {
      requirements: 'Same as Lisbon - D7 or Digital Nomad Visa',
      duration: '1 year renewable',
      notes: 'Lower cost of living makes income requirements easier',
    },
    lifestyle: 'More relaxed than Lisbon, excellent for wine lovers, beautiful riverfront, strong student population.',
    risks: [
      'Smaller expat community than Lisbon',
      'More rain than southern Portugal',
      'Fewer international flights',
    ],
    perks: [
      'Same NHR tax benefits',
      'Wine country access',
      'Lower living costs',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/opo',
      hotels: 'https://www.booking.com/city/pt/porto.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  // Thailand
  {
    slug: 'bangkok-thailand',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
    why: 'Southeast Asia\'s most cosmopolitan city offers world-class infrastructure, incredible food, affordable luxury, and excellent connectivity.',
    costOfLiving: {
      accommodation: '$500-1,500/month',
      food: '$200-400/month',
      transport: '$50/month',
      total: '$1,000-2,500/month',
    },
    visa: {
      requirements: 'Thailand Pass (60 days) or Long-Term Resident Visa',
      duration: 'Up to 10 years with LTR',
      notes: 'LTR requires $80K income or $1M investment',
    },
    lifestyle: '24/7 city with everything you need. Amazing street food, modern malls, vibrant nightlife, and easy regional travel.',
    risks: [
      'Air pollution (seasonal)',
      'Traffic congestion',
      'Language barrier outside tourist areas',
    ],
    perks: [
      'Member rates at serviced apartments',
      'Airport fast-track service',
      'Introductions to visa agents',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/bkk',
      hotels: 'https://www.booking.com/city/th/bangkok.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  {
    slug: 'chiang-mai-thailand',
    city: 'Chiang Mai',
    country: 'Thailand',
    region: 'Southeast Asia',
    why: 'The original digital nomad hub. Low costs, great infrastructure, mountain scenery, and a massive expat community.',
    costOfLiving: {
      accommodation: '$300-800/month',
      food: '$150-300/month',
      transport: '$100/month (scooter rental)',
      total: '$700-1,500/month',
    },
    visa: {
      requirements: 'Same as Bangkok - Thailand Pass or LTR',
      duration: '60 days to 10 years',
      notes: 'Very affordable for extended stays',
    },
    lifestyle: 'Laid-back mountain town with excellent cafes, coworking spaces, and a strong nomad community.',
    risks: [
      'Burning season (Feb-Apr) - poor air quality',
      'Getting stuck in the "nomad bubble"',
      'Limited international flights',
    ],
    perks: [
      'Coworking space discounts',
      'Monthly meetups',
      'Local fixer introductions',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/cnx',
      hotels: 'https://www.booking.com/city/th/chiang-mai.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  // Mexico
  {
    slug: 'mexico-city-mexico',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'Latin America',
    why: 'One of the world\'s great cities with incredible culture, food, and affordability. Easy US time zones and direct flights.',
    costOfLiving: {
      accommodation: '$800-2,000/month',
      food: '$300-600/month',
      transport: '$30/month',
      total: '$1,500-3,000/month',
    },
    visa: {
      requirements: 'Tourist visa (180 days) or Temporary Resident',
      duration: '4 years with Temporary Resident',
      notes: 'Proof of $2,600/month income for residency',
    },
    lifestyle: 'World-class museums, restaurants, and neighborhoods. Great weather year-round. Strong US expat community.',
    risks: [
      'Earthquakes',
      'Air pollution',
      'Safety concerns in some areas',
    ],
    perks: [
      'Member rates in Roma/Condesa',
      'Airport pickup service',
      'Tax accountant referrals',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/mex',
      hotels: 'https://www.booking.com/city/mx/mexico-city.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  {
    slug: 'playa-del-carmen-mexico',
    city: 'Playa del Carmen',
    country: 'Mexico',
    region: 'Latin America',
    why: 'Caribbean beaches with modern amenities. Popular with remote workers and retirees.',
    costOfLiving: {
      accommodation: '$600-1,500/month',
      food: '$250-500/month',
      transport: '$50/month',
      total: '$1,200-2,500/month',
    },
    visa: {
      requirements: 'Same as Mexico City',
      duration: '180 days to 4 years',
      notes: 'Popular with retirees and nomads',
    },
    lifestyle: 'Beach lifestyle with good infrastructure. Easy access to Cozumel and Tulum.',
    risks: [
      'Hurricane season',
      'Sargassum seaweed (seasonal)',
      'Tourist prices in some areas',
    ],
    perks: [
      'Beach club discounts',
      'Ferry discounts to Cozumel',
      'Diving/snorkeling deals',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/cun',
      hotels: 'https://www.booking.com/city/mx/playa-del-carmen.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  // UAE
  {
    slug: 'dubai-uae',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    why: 'Tax-free living, world-class infrastructure, and a strategic location between East and West.',
    costOfLiving: {
      accommodation: '$1,500-4,000/month',
      food: '$400-800/month',
      transport: '$100/month',
      total: '$2,500-6,000/month',
    },
    visa: {
      requirements: 'Remote Work Visa or Freelance Permit',
      duration: '1 year renewable',
      notes: '$5,000/month income requirement',
    },
    lifestyle: 'Luxury lifestyle with excellent infrastructure. Zero income tax. Great for networking.',
    risks: [
      'High cost of living',
      'Extreme summer heat',
      'Cultural restrictions',
    ],
    perks: [
      '0% personal income tax',
      'Business setup support',
      'Networking event access',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/dxb',
      hotels: 'https://www.booking.com/city/ae/dubai.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  // Georgia
  {
    slug: 'tbilisi-georgia',
    city: 'Tbilisi',
    country: 'Georgia',
    region: 'Europe/Asia',
    why: 'One year visa-free for many nationalities. Low costs, great food and wine, unique culture.',
    costOfLiving: {
      accommodation: '$400-900/month',
      food: '$200-400/month',
      transport: '$20/month',
      total: '$800-1,500/month',
    },
    visa: {
      requirements: 'Visa-free for US/EU citizens (365 days)',
      duration: '365 days',
      notes: 'One of the easiest countries for long stays',
    },
    lifestyle: 'Unique culture at the crossroads of Europe and Asia. Excellent food and wine scene.',
    risks: [
      'Language barrier (Georgian is difficult)',
      'Limited international flights',
      'Bureaucracy for business',
    ],
    perks: [
      '1% tax on turnover for small business',
      'Wine country tours',
      'Mountain getaways',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/tbs',
      hotels: 'https://www.booking.com/city/ge/tbilisi.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  // Colombia
  {
    slug: 'medellin-colombia',
    city: 'Medellin',
    country: 'Colombia',
    region: 'Latin America',
    why: 'Eternal spring weather, low costs, growing nomad community, and a remarkable transformation story.',
    costOfLiving: {
      accommodation: '$500-1,200/month',
      food: '$200-400/month',
      transport: '$30/month',
      total: '$1,000-2,000/month',
    },
    visa: {
      requirements: 'Digital Nomad Visa (up to 2 years)',
      duration: 'Up to 2 years',
      notes: '$700/month income requirement',
    },
    lifestyle: 'Perfect weather year-round. Modern infrastructure in El Poblado. Growing tech scene.',
    risks: [
      'Safety concerns in some neighborhoods',
      'Altitude (can affect some people)',
      'Language barrier',
    ],
    perks: [
      'Coworking discounts',
      'Coffee region tours',
      'Local mentor network',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/mde',
      hotels: 'https://www.booking.com/city/co/medellin.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
  // Bali
  {
    slug: 'bali-indonesia',
    city: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    why: 'The spiritual home of digital nomads. Tropical paradise with strong infrastructure.',
    costOfLiving: {
      accommodation: '$500-1,500/month',
      food: '$200-500/month',
      transport: '$100/month (scooter)',
      total: '$1,000-2,500/month',
    },
    visa: {
      requirements: 'B211a Visa (6 months) or Second Home Visa',
      duration: '6 months to 5 years',
      notes: 'Second Home requires $130K in Indonesian assets',
    },
    lifestyle: 'Tropical paradise with yoga, surfing, and healthy living. Strong nomad community.',
    risks: [
      'Tourist visa runs',
      'Traffic in popular areas',
      'Rising costs in Canggu/Seminyak',
    ],
    perks: [
      'Villa rental discounts',
      'Coworking space deals',
      'Surf/yoga retreat discounts',
    ],
    affiliateLinks: {
      flights: 'https://www.skyscanner.com/flights-to/dps',
      hotels: 'https://www.booking.com/region/id/bali.html',
      insurance: 'https://safetywing.com/nomad-insurance',
    },
  },
];

// Get guides by category
export function getGuidesByCategory(category: string): Guide[] {
  return CORNERSTONE_ARTICLES.filter(g => g.category === category);
}

// Get featured guides
export function getFeaturedGuides(): Guide[] {
  return CORNERSTONE_ARTICLES.filter(g => g.featured);
}

// Get city guides by country
export function getCitiesByCountry(country: string): CityGuide[] {
  return CITY_GUIDES.filter(c => c.country.toLowerCase() === country.toLowerCase());
}

// Get city guide by slug
export function getCityGuide(slug: string): CityGuide | undefined {
  return CITY_GUIDES.find(c => c.slug === slug);
}

// Get all countries
export function getAllCountries(): { name: string; slug: string; cityCount: number }[] {
  const countries: Record<string, number> = {};
  CITY_GUIDES.forEach(city => {
    countries[city.country] = (countries[city.country] || 0) + 1;
  });
  
  return Object.entries(countries).map(([name, cityCount]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    cityCount,
  }));
}

// Get all regions
export function getAllRegions(): string[] {
  return [...new Set(CITY_GUIDES.map(c => c.region))];
}

// Get cities by region
export function getCitiesByRegion(region: string): CityGuide[] {
  return CITY_GUIDES.filter(c => c.region === region);
}

// Get related cities
export function getRelatedCities(currentSlug: string, limit: number = 3): CityGuide[] {
  const current = getCityGuide(currentSlug);
  if (!current) return [];
  
  return CITY_GUIDES
    .filter(c => c.slug !== currentSlug && c.country === current.country)
    .slice(0, limit);
}

// Search guides
export function searchGuides(query: string): (Guide | CityGuide)[] {
  const lowerQuery = query.toLowerCase();
  
  const articleMatches = CORNERSTONE_ARTICLES.filter(g =>
    g.title.toLowerCase().includes(lowerQuery) ||
    g.tags.some(t => t.includes(lowerQuery))
  );
  
  const cityMatches = CITY_GUIDES.filter(c =>
    c.city.toLowerCase().includes(lowerQuery) ||
    c.country.toLowerCase().includes(lowerQuery) ||
    c.why.toLowerCase().includes(lowerQuery)
  );
  
  return [...articleMatches, ...cityMatches];
}
