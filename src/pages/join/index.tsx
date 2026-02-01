import { useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { checkoutPlus, checkoutElite } from '@/lib/stripe';

const Join = () => {
  const [loading, setLoading] = useState<'plus' | 'elite' | null>(null);

  const handleSubscribe = async (plan: 'plus' | 'elite') => {
    setLoading(plan);
    try {
      if (plan === 'plus') {
        await checkoutPlus();
      } else {
        await checkoutElite();
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const tiers = [
    {
      name: 'PLUS',
      price: '$49',
      period: '/month',
      description: 'Starter Membership',
      icon: <Zap className="w-6 h-6" />,
      features: [
        'Access to all Country Guides',
        'Private Community Forum',
        'Monthly Newsletter',
        'Basic travel perks',
        'Email support',
      ],
      cta: 'GET STARTED',
      plan: 'plus' as const,
      highlighted: false,
    },
    {
      name: 'ELITE',
      price: '$99',
      period: '/month',
      description: 'VIP Membership',
      icon: <Star className="w-6 h-6" />,
      features: [
        'Everything in PLUS',
        'Priority Support (24h response)',
        'Exclusive deals & partner offers',
        '1-on-1 consultation call',
        'VIP events & meetups access',
        'Verified resources directory',
        'Early access to new features',
      ],
      cta: 'APPLY NOW',
      plan: 'elite' as const,
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Become a Member
          </h1>
          <p className="text-ivory/70 text-lg max-w-2xl mx-auto">
            Join the Brotherhood and unlock global leverage, location freedom, and a network of driven men.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card-dark p-8 relative ${
                tier.highlighted
                  ? 'border-gold/50 shadow-gold/20'
                  : 'border-transparent'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-charcoal text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-gold mb-4">{tier.icon}</div>
              
              <h2 className="font-serif text-3xl text-ivory mb-2">{tier.name}</h2>
              <p className="text-ivory/60 mb-4">{tier.description}</p>
              
              <div className="flex items-baseline mb-6">
                <span className="font-serif text-5xl text-gold">{tier.price}</span>
                <span className="text-ivory/60 ml-1">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start text-ivory/80">
                    <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(tier.plan)}
                disabled={loading === tier.plan}
                className={`w-full py-4 rounded font-medium tracking-wider uppercase transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gold text-charcoal hover:shadow-gold-lg hover:-translate-y-0.5'
                    : 'border border-gold text-gold hover:bg-gold/10'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === tier.plan ? 'Loading...' : tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-ivory/50 text-sm mb-4">Trusted by members worldwide</p>
          <div className="flex items-center justify-center gap-8 text-ivory/30 text-xs uppercase tracking-wider">
            <span>Secure Payments</span>
            <span>•</span>
            <span>Cancel Anytime</span>
            <span>•</span>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl text-ivory text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-gold font-medium mb-2">Can I cancel anytime?</h4>
              <p className="text-ivory/70 text-sm">
                Yes, you can cancel your subscription at any time through your account settings. 
                You'll continue to have access until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h4 className="text-gold font-medium mb-2">What's the difference between PLUS and ELITE?</h4>
              <p className="text-ivory/70 text-sm">
                ELITE includes everything in PLUS plus priority support, exclusive deals, 
                1-on-1 consultation, VIP events, and access to our verified resources directory.
              </p>
            </div>
            
            <div>
              <h4 className="text-gold font-medium mb-2">Is there a refund policy?</h4>
              <p className="text-ivory/70 text-sm">
                Due to the immediate access to digital content, we do not offer refunds. 
                However, you can cancel anytime to stop future billing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
