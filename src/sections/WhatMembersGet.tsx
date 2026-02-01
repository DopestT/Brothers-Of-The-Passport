export default function WhatMembersGet() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Members Get</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Everything you need to build a location-independent life
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Travel Intelligence</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Visa strategies for 120+ countries</li>
              <li>• Banking and finance guides</li>
              <li>• Tax optimization playbooks</li>
              <li>• Cost of living databases</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Global Community</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Private member network</li>
              <li>• City-specific channels</li>
              <li>• Mentorship programs</li>
              <li>• Accountability partners</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Exclusive Deals</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Premium travel discounts</li>
              <li>• Hotel partnerships</li>
              <li>• Banking fee waivers</li>
              <li>• Concierge services</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="text-xl font-bold mb-3">City Guides</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Deep-dive destination guides</li>
              <li>• Local insider knowledge</li>
              <li>• Safety and logistics intel</li>
              <li>• Cost breakdowns</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Events & Meetups</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Quarterly global summits</li>
              <li>• Local city meetups</li>
              <li>• Skill-building workshops</li>
              <li>• Adventure experiences</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Business Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Remote work strategies</li>
              <li>• International incorporation</li>
              <li>• Payment processor guides</li>
              <li>• Contractor networks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
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
