import { useEffect, useRef, useState } from 'react';
import { Shield, Globe, CheckCircle, Plane, Settings, Cog } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  isCTA?: boolean;
}

const benefits: Benefit[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Private Community',
    description: 'Join an invite-only network of driven men.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Country Guides',
    description: 'Exclusive, detailed assessments of each country.',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Verified Resources',
    description: 'Access vetted professionals, lawyers, tax advisors.',
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: 'Deals & Booking Perks',
    description: 'Save on flights, stays, insurance, and more.',
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Automation Tools',
    description: 'Streamline setting up a nomadic life.',
  },
  {
    icon: <Cog className="w-6 h-6" />,
    title: 'BOOK TRAVEL',
    description: '',
    isCTA: true,
  },
];

const WhatMembersGet = () => {
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
      id="tools-perks"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-charcoal"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory tracking-widest uppercase">
            What Members Get
          </h2>
          <div className="gold-divider mt-6" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {benefit.isCTA ? (
                // CTA Card
                <div className="card-dark p-6 md:p-8 h-full flex flex-col items-center justify-center text-center border-gold/30 hover:border-gold/60 transition-all duration-300 group">
                  <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <button className="border border-gold text-gold px-6 py-3 rounded text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-gold hover:text-charcoal">
                    {benefit.title}
                  </button>
                </div>
              ) : (
                // Regular Benefit Card
                <div className="card-dark p-6 md:p-8 h-full border-transparent hover:border-gold/30 transition-all duration-300 group">
                  <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-ivory tracking-wide mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-ivory/60 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatMembersGet;
