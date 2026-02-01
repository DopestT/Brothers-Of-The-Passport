import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        const parallaxValue = scrollY * 0.4;
        imageRef.current.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full transition-transform duration-100"
        style={{ transform: 'scale(1.1)' }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Global night map"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />
        {/* Additional vignette */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" 
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15,15,15,0.4) 100%)'
          }}
        />
      </div>

      {/* Passport Stamp Decorations */}
      <div className="absolute top-20 left-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="w-32 h-32 rounded-full border-2 border-gold/30 flex items-center justify-center rotate-12">
          <span className="text-gold/40 text-xs tracking-widest uppercase text-center leading-tight">
            Bangkok<br/>Thailand
          </span>
        </div>
      </div>
      <div className="absolute bottom-40 right-20 opacity-10 pointer-events-none hidden lg:block">
        <div className="w-28 h-28 rounded-full border-2 border-gold/30 flex items-center justify-center -rotate-12">
          <span className="text-gold/40 text-xs tracking-widest uppercase text-center leading-tight">
            Approved<br/>2024
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20">
        {/* Main Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory mb-4 md:mb-6 animate-fade-in">
          <span className="block">Brothers</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">of the</span>
          <span className="block mt-2">Passport</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-ivory/80 font-light tracking-wide mb-8 md:mb-12 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Global leverage. Location freedom. Brotherhood.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <button
            onClick={() => scrollToSection('#membership')}
            className="bg-gold text-charcoal px-8 py-4 rounded text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:shadow-gold-lg hover:-translate-y-1 w-full sm:w-auto"
          >
            Apply for Access
          </button>
          <button
            onClick={() => scrollToSection('#how-it-works')}
            className="border border-gold text-gold px-8 py-4 rounded text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-gold/10 hover:shadow-gold w-full sm:w-auto"
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
