import { useEffect, useRef, useState } from 'react';

interface Metric {
  value: string;
  label: string;
  sublabel?: string;
}

const metrics: Metric[] = [
  { value: '+80', label: 'COUNTRIES', sublabel: 'WORLDWIDE' },
  { value: '+2,000', label: 'MEMBERS', sublabel: 'WORLDWIDE' },
  { value: '$1M+', label: 'SAVED ON', sublabel: 'TRAVEL' },
];

const SocialProof = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
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
