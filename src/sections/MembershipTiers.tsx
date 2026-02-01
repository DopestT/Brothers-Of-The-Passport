import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

interface Tier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'PLUS',
    price: '$49',
    period: '/month',
    description: 'Starter Membership',
    features: ['Country Guides Access', 'Community Forum', 'Monthly Newsletter', 'Basic Perks'],
    cta: 'GET STARTED',
  },
  {
    name: 'ELITE',
    price: '$99',
    period: '/month',
    description: 'VIP Membership',
    features: ['Everything in Plus', 'Priority Support', 'Exclusive Deals', '1-on-1 Consultation', 'VIP Events Access'],
    cta: 'APPLY NOW',
    highlighted: true,
  },
];

const airlineLogos = [
  { name: 'Emirates', width: 'w-20' },
  { name: 'Air France', width: 'w-20' },
  { name: 'Qatar', width: 'w-16' },
];

const MembershipTiers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-charcoal"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory tracking-widest uppercase">
            Become a Member
          </h2>
          <div className="gold-divider mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Pricing Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`card-dark p-6 md:p-8 h-full flex flex-col ${
                    tier.highlighted
                      ? 'border-gold/50 shadow-gold/20'
                      : 'border-transparent'
                  } hover:border-gold/40 transition-all duration-300`}
                >
                  {/* Tier Name */}
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-wider mb-2">
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline mb-4">
                    <span className="font-serif text-4xl md:text-5xl text-gold">
                      {tier.price}
                    </span>
                    <span className="text-ivory/60 text-sm ml-1">{tier.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-ivory/70 text-sm mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-ivory/80">
                        <Check className="w-4 h-4 text-gold mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                      tier.highlighted
                        ? 'bg-gold text-charcoal hover:shadow-gold hover:-translate-y-0.5'
                        : 'border border-gold text-gold hover:bg-gold/10'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Side Banner */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="card-dark p-6 md:p-8 h-full flex flex-col justify-center border-gold/20">
              {/* Banner Text */}
              <p className="text-ivory text-lg md:text-xl font-medium mb-2">
                Members save on flights, stays, visas.
              </p>

              {/* Decorative line */}
              <div className="w-12 h-px bg-gold/50 my-4" />

              {/* Airline Logos */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {airlineLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className="text-ivory/40 text-xs tracking-widest uppercase"
                  >
                    {logo.name}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="mt-6 border border-gold text-gold px-6 py-3 rounded text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-gold hover:text-charcoal w-full">
                BOOK TRAVEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipTiers;
