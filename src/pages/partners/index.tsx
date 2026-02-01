import { useState } from 'react';
import { Send, Users, TrendingUp, Star, Globe, Check } from 'lucide-react';

const PARTNER_PACKAGES = [
  {
    id: 'featured',
    name: 'Featured Partner',
    price: '$2,500/month',
    description: 'Premium placement across the platform',
    features: [
      'Tools & Perks page listing',
      'Newsletter feature (1x/month)',
      'Dashboard widget placement',
      'City guide mentions',
      'Member discount code',
      'Analytics dashboard',
    ],
    highlighted: false,
  },
  {
    id: 'sponsor',
    name: 'City Sponsor',
    price: '$5,000/month',
    description: 'Exclusive city-level partnership',
    features: [
      'Everything in Featured',
      'Exclusive city sponsorship (1 city)',
      'Dedicated city guide page',
      'Event co-hosting rights',
      'Direct member introductions',
      'Quarterly strategy call',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium Partner',
    price: 'Custom',
    description: 'Full platform integration',
    features: [
      'Everything in City Sponsor',
      'Multi-city coverage',
      'White-label integrations',
      'API access',
      'Dedicated account manager',
      'Annual strategy retreat',
    ],
    highlighted: false,
  },
];

const AUDIENCE_STATS = [
  { label: 'Members', value: '2,000+', icon: <Users className="w-5 h-5" /> },
  { label: 'Countries', value: '80+', icon: <Globe className="w-5 h-5" /> },
  { label: 'Avg. Income', value: '$150K+', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Satisfaction', value: '4.8/5', icon: <Star className="w-5 h-5" /> },
];

const Partners = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    website: '',
    package: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch('/api/partners/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-dark p-12">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-serif text-3xl text-gold mb-4">Inquiry Received</h1>
            <p className="text-ivory/70 mb-6">
              Thank you for your interest in partnering with Brothers of the Passport. 
              Our partnerships team will review your inquiry and respond within 2 business days.
            </p>
            <a href="/" className="btn-gold">Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Partner With Us
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Reach a curated community of high-performing, internationally-minded men. 
            Our members are decision-makers with global ambitions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {AUDIENCE_STATS.map((stat) => (
            <div key={stat.label} className="card-dark p-6 text-center">
              <div className="text-gold mb-2 flex justify-center">{stat.icon}</div>
              <div className="font-serif text-3xl text-ivory mb-1">{stat.value}</div>
              <div className="text-ivory/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partner Packages */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-ivory text-center mb-8">
            Partnership Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PARTNER_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`card-dark p-8 ${
                  pkg.highlighted ? 'border-gold/50 relative' : ''
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-charcoal text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-serif text-2xl text-ivory mb-2">{pkg.name}</h3>
                <p className="text-gold text-xl font-semibold mb-4">{pkg.price}</p>
                <p className="text-ivory/60 text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-ivory/80 text-sm">
                      <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setFormData({ ...formData, package: pkg.id });
                    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded font-medium transition-all ${
                    pkg.highlighted
                      ? 'bg-gold text-charcoal hover:shadow-gold'
                      : 'border border-gold text-gold hover:bg-gold/10'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ideal Partners */}
        <div className="card-dark p-8 mb-16">
          <h2 className="font-serif text-2xl text-ivory mb-6">Ideal Partners</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-gold font-medium mb-3">We Work With</h3>
              <ul className="space-y-2 text-ivory/70">
                <li>• Premium travel and hospitality brands</li>
                <li>• Financial services (banking, investing, crypto)</li>
                <li>• Residency and citizenship consultants</li>
                <li>• Real estate investment firms</li>
                <li>• Lifestyle and productivity tools</li>
                <li>• Health and insurance providers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-medium mb-3">What Our Members Value</h3>
              <ul className="space-y-2 text-ivory/70">
                <li>• Quality over quantity</li>
                <li>• Transparency and trust</li>
                <li>• Global accessibility</li>
                <li>• Time-saving solutions</li>
                <li>• Exclusive member benefits</li>
                <li>• No-nonsense communication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div id="inquiry-form" className="card-dark p-8">
          <h2 className="font-serif text-2xl text-ivory mb-2">Partner Inquiry</h2>
          <p className="text-ivory/60 mb-8">
            Tell us about your company and how you'd like to partner with Brothers of the Passport.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-ivory/70 mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm text-ivory/70 mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  placeholder="Full name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-ivory/70 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm text-ivory/70 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-ivory/70 mb-2">Interested Package</label>
              <select
                value={formData.package}
                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="">Select a package</option>
                {PARTNER_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name} - {pkg.price}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-ivory/70 mb-2">Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none resize-none"
                placeholder="Tell us about your company and partnership goals..."
              />
            </div>

            <button
              type="submit"
              className="btn-gold w-full flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-ivory/60">
            Prefer email? Contact our partnerships team at{' '}
            <a href="mailto:partners@brothersofthepassport.com" className="text-gold hover:underline">
              partners@brothersofthepassport.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partners;
