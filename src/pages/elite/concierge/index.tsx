import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Send, Check, Briefcase, Home, Calculator, Users, Globe } from 'lucide-react';
import { getCurrentProfile } from '@/lib/supabase';

interface ConciergeRequest {
  type: string;
  details: string;
  budget: string;
  timeline: string;
}

const CONCIERGE_SERVICES = [
  {
    id: 'tax',
    icon: <Calculator className="w-6 h-6" />,
    title: 'Tax Optimization',
    description: 'Connect with international tax specialists for structuring advice.',
    examples: ['Offshore company setup', 'Tax residency planning', 'Crypto tax strategy'],
  },
  {
    id: 'residency',
    icon: <Globe className="w-6 h-6" />,
    title: 'Second Residency',
    description: 'Navigate citizenship by investment and residency programs.',
    examples: ['Golden Visa (Portugal/Spain)', 'Digital nomad visas', 'Tax-friendly residencies'],
  },
  {
    id: 'realestate',
    icon: <Home className="w-6 h-6" />,
    title: 'Real Estate',
    description: 'Investment properties and relocation housing worldwide.',
    examples: ['Rental property investments', 'Relocation home search', 'Commercial real estate'],
  },
  {
    id: 'business',
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Business Structure',
    description: 'Offshore company formation and banking setup.',
    examples: ['HK/Singapore companies', 'US LLC for non-residents', 'Banking introductions'],
  },
  {
    id: 'networking',
    icon: <Users className="w-6 h-6" />,
    title: 'Introductions',
    description: 'Warm introductions to vetted professionals worldwide.',
    examples: ['Lawyers in target countries', 'Accountants & tax advisors', 'Local fixers'],
  },
];

const EliteConcierge = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState<ConciergeRequest>({
    type: '',
    details: '',
    budget: '',
    timeline: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check elite status
  useState(() => {
    getCurrentProfile().then(profile => {
      if (profile?.role !== 'elite' && profile?.role !== 'admin') {
        navigate('/dashboard');
      }
    });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/elite/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: selectedService,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
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
            <h1 className="font-serif text-3xl text-gold mb-4">Request Received</h1>
            <p className="text-ivory/70 mb-6">
              Your concierge request has been submitted. Our team will review it and connect you 
              with the right specialist within 24-48 hours.
            </p>
            <div className="bg-gold/10 border border-gold/30 p-4 rounded-lg">
              <p className="text-gold">Priority: ELITE</p>
              <p className="text-ivory/60 text-sm">Response time: 24-48 hours</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-gold mt-8"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Crown className="w-4 h-4" />
            ELITE MEMBER
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Elite Concierge
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Submit high-value requests for tax optimization, residency planning, real estate, 
            and business structuring. We'll connect you with vetted specialists.
          </p>
        </div>

        {/* Service Selection */}
        {!selectedService ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONCIERGE_SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  setFormData({ ...formData, type: service.title });
                }}
                className="card-dark p-6 text-left hover:border-gold/30 transition-colors"
              >
                <div className="text-gold mb-4">{service.icon}</div>
                <h3 className="font-serif text-xl text-ivory mb-2">{service.title}</h3>
                <p className="text-ivory/60 text-sm mb-4">{service.description}</p>
                <div className="space-y-1">
                  {service.examples.map((example) => (
                    <span key={example} className="inline-block text-xs text-ivory/40 bg-charcoal px-2 py-1 rounded mr-2">
                      {example}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Request Form */
          <div className="card-dark p-8">
            <button
              onClick={() => setSelectedService('')}
              className="text-ivory/60 hover:text-gold text-sm mb-6"
            >
              ← Back to services
            </button>

            <h2 className="font-serif text-2xl text-ivory mb-2">
              {CONCIERGE_SERVICES.find(s => s.id === selectedService)?.title}
            </h2>
            <p className="text-ivory/60 mb-8">
              {CONCIERGE_SERVICES.find(s => s.id === selectedService)?.description}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-ivory/70 mb-2">
                  Tell us about your situation
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="What are you looking to achieve? Any specific countries or requirements?"
                  className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">
                    Budget Range (optional)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  >
                    <option value="">Select budget</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-25k">$5,000 - $25,000</option>
                    <option value="25k-100k">$25,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-ivory/70 mb-2">
                    Timeline (optional)
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="bg-gold/10 border border-gold/30 p-4 rounded-lg">
                <p className="text-gold text-sm flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Elite Priority Response
                </p>
                <p className="text-ivory/60 text-sm mt-1">
                  Our team will review your request and connect you with 2-3 vetted specialists 
                  within 24-48 hours.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EliteConcierge;
