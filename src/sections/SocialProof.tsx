export default function SocialProof() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">5,000+</div>
            <div className="text-gray-400">Global Brothers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">120+</div>
            <div className="text-gray-400">Countries Covered</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">$2M+</div>
            <div className="text-gray-400">Saved Through Partnerships</div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            "Travel smarter. Build leverage. Live larger. Join the brotherhood redefining modern masculinity through global citizenship."
          </p>
        </div>
      </div>
    </section>
  )
}
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-charcoal-light"
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-24">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Gold number with glow */}
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold animate-glow-pulse mb-2">
                {metric.value}
              </div>
              
              {/* Labels */}
              <div className="text-ivory/70 text-xs md:text-sm tracking-widest uppercase">
                {metric.label}
              </div>
              {metric.sublabel && (
                <div className="text-ivory/50 text-xs tracking-widest uppercase mt-0.5">
                  {metric.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
};

export default SocialProof;
