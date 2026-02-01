export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Four simple steps to unlock global freedom
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Apply</h3>
            <p className="text-gray-400">
              Submit your application. We maintain quality through selective membership.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">Get Access</h3>
            <p className="text-gray-400">
              Instant access to guides, community, and exclusive partnerships.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Connect</h3>
            <p className="text-gray-400">
              Meet brothers worldwide. Attend events. Build real relationships.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
              4
            </div>
            <h3 className="text-xl font-bold mb-3">Level Up</h3>
            <p className="text-gray-400">
              Use intelligence and leverage to build your global lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const HowItWorks = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-charcoal"
    >
      {/* Gold divider line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory tracking-widest uppercase">
            How It Works
          </h2>
          <div className="gold-divider mt-6" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Gold divider between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent transform -translate-y-1/2" />
              )}

              <div className="text-center px-6 md:px-8">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/50 text-gold text-sm font-medium mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-gold mb-4 flex justify-center">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-ivory tracking-wider mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-ivory/60 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
};

export default HowItWorks;
