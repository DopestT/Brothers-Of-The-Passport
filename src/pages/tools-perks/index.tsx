import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Wrench,
  Plane, 
  ExternalLink,
  Crown,
  Check,
  Shield,
  Globe
} from 'lucide-react';
import { 
  getPartnerCategories, 
  getPartnersByCategory, 
  trackAffiliateClick,
  getFeaturedPartners,
  type AffiliatePartner 
} from '@/lib/affiliates';
import { getCurrentProfile } from '@/lib/supabase';

const categoryIcons: Record<string, React.ReactNode> = {
  finance: <DollarSign className="w-5 h-5" />,
  visa: <Globe className="w-5 h-5" />,
  credit: <CreditCard className="w-5 h-5" />,
  tools: <Wrench className="w-5 h-5" />,
  travel: <Plane className="w-5 h-5" />,
};

const ToolsPerks = () => {
  const [activeCategory, setActiveCategory] = useState('finance');
  const [isElite, setIsElite] = useState(false);
  const [featuredPartners, setFeaturedPartners] = useState<AffiliatePartner[]>([]);

  useEffect(() => {
    getCurrentProfile().then(profile => {
      const elite = profile?.role === 'elite';
      setIsElite(elite);
      setFeaturedPartners(getFeaturedPartners(elite));
    });
  }, []);

  const categories = getPartnerCategories();
  const partners = getPartnersByCategory(activeCategory, isElite);

  const handlePartnerClick = (partner: AffiliatePartner) => {
    trackAffiliateClick(partner.id, partner.category);
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Tools & Perks
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Vetted partners and exclusive deals for Brothers of the Passport members. 
            Every recommendation is tested by our team.
          </p>
        </div>

        {/* Featured Partners */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6 text-gold" />
            Featured Partners
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPartners.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handlePartnerClick(partner)}
                className="card-dark p-6 hover:border-gold/30 transition-colors relative"
              >
                {partner.badge && (
                  <span className={`absolute -top-2 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                    partner.badge === 'featured' 
                      ? 'bg-gold text-charcoal' 
                      : partner.badge === 'elite-only'
                      ? 'bg-purple-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    {partner.badge === 'verified' && <Check className="w-3 h-3 inline mr-1" />}
                    {partner.badge}
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-gold">{categoryIcons[partner.category]}</div>
                  <h3 className="font-serif text-lg text-ivory">{partner.name}</h3>
                </div>
                <p className="text-ivory/70 text-sm mb-4">{partner.description}</p>
                <div className="flex items-center justify-between">
                  {partner.commission && (
                    <span className="text-gold text-xs">{partner.commission}</span>
                  )}
                  <ExternalLink className="w-4 h-4 text-ivory/40" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gold text-charcoal'
                  : 'bg-charcoal-light text-ivory/70 hover:text-ivory'
              }`}
            >
              {categoryIcons[cat.id]}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePartnerClick(partner)}
              className="card-dark p-6 hover:border-gold/30 transition-colors flex items-start gap-4"
            >
              <div className="text-gold mt-1">{categoryIcons[partner.category]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-serif text-lg text-ivory">{partner.name}</h3>
                  {partner.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      partner.badge === 'featured' 
                        ? 'bg-gold/20 text-gold' 
                        : partner.badge === 'elite-only'
                        ? 'bg-purple-600/20 text-purple-400'
                        : 'bg-green-600/20 text-green-400'
                    }`}>
                      {partner.badge}
                    </span>
                  )}
                </div>
                <p className="text-ivory/70 text-sm mb-3">{partner.description}</p>
                <div className="flex items-center gap-4">
                  {partner.commission && (
                    <span className="text-gold text-xs">{partner.commission}</span>
                  )}
                  <span className="text-ivory/40 text-xs flex items-center gap-1">
                    Visit <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Elite CTA */}
        {!isElite && (
          <div className="mt-12 card-dark p-8 border-gold/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-xl text-gold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Unlock Elite-Only Partners
                </h3>
                <p className="text-ivory/70">
                  Get access to verified residency consultants, offshore banking specialists, 
                  and exclusive service providers.
                </p>
              </div>
              <a href="/join" className="btn-gold whitespace-nowrap">
                Upgrade to Elite
              </a>
            </div>
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="mt-16 text-center">
          <p className="text-ivory/40 text-sm max-w-2xl mx-auto">
            <strong>Affiliate Disclosure:</strong> Brothers of the Passport participates in affiliate 
            marketing programs. We may earn commissions when you use our partner links. This comes at 
            no extra cost to you and helps support our community. We only recommend services we trust 
            and use ourselves.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsPerks;
