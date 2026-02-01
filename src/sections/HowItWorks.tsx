import { useEffect, useRef, useState } from 'react';
import { BookOpen, Plane, Briefcase } from 'lucide-react';

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '1',
    icon: <BookOpen className="w-8 h-8" />,
    title: 'LEARN',
    description: 'Get country guides and actionable strategies.',
  },
  {
    number: '2',
    icon: <Plane className="w-8 h-8" />,
    title: 'TRAVEL',
    description: 'Leverage points and exclusive travel perks.',
  },
  {
    number: '3',
    icon: <Briefcase className="w-8 h-8" />,
    title: 'BUILD',
    description: 'Unlock new income streams and opportunities.',
  },
];

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
