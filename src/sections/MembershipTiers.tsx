export default function MembershipTiers() {
  return (
    <section id="membership" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Membership Tiers</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Choose the level that matches your ambition
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#0f0f0f] border border-white/10 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2">Explorer</h3>
            <div className="text-3xl font-bold mb-6">Free</div>
            <ul className="space-y-4 mb-8 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Access to community forums</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Basic city guides</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Monthly newsletter</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Event announcements</span>
              </li>
            </ul>
            <a href="#join" className="block w-full py-3 text-center border-2 border-white/20 rounded-md hover:bg-white/10 transition-colors font-medium">
              Get Started
            </a>
          </div>

          <div className="bg-[#0f0f0f] border-2 border-white rounded-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Citizen</h3>
            <div className="text-3xl font-bold mb-6">
              $49<span className="text-lg text-gray-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Everything in Explorer</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Full travel intelligence library</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Private member network</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Exclusive partnership deals</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Quarterly virtual events</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Direct messaging</span>
              </li>
            </ul>
            <a href="#join" className="block w-full py-3 text-center bg-white text-black rounded-md hover:bg-gray-200 transition-colors font-semibold">
              Join Now
            </a>
          </div>

          <div className="bg-[#0f0f0f] border border-white/10 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2">Elite</h3>
            <div className="text-3xl font-bold mb-6">
              $199<span className="text-lg text-gray-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Everything in Citizen</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Personal concierge service</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>1-on-1 strategy calls</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>VIP event access</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Premium partner benefits</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <a href="#join" className="block w-full py-3 text-center border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors font-semibold">
              Upgrade to Elite
            </a>
          </div>
        </div>
      </div>
    </section>
  )
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
