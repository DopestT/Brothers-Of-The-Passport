import { useState } from 'react';
import { Check, Send, Globe, MessageSquare } from 'lucide-react';

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryInterest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/apply/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          countryInterest: formData.countryInterest,
          message: formData.message,
          source: 'website',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Something went wrong. Please try again.');
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
            <h1 className="font-serif text-3xl text-gold mb-4">Application Received</h1>
            <p className="text-ivory/70 mb-6">
              Thank you for applying to Brothers of the Passport. We've received your application 
              and are reviewing it.
            </p>
            <div className="bg-gold/10 border border-gold/30 p-4 rounded-lg mb-6">
              <p className="text-gold font-medium">Status: Under Review</p>
              <p className="text-ivory/60 text-sm">Typical response time: 24-48 hours</p>
            </div>
            <p className="text-ivory/60 text-sm">
              We'll contact you at {formData.email} with our decision.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Apply for Membership
          </h1>
          <p className="text-ivory/70 max-w-xl mx-auto">
            Brothers of the Passport is a curated community. Tell us about yourself and 
            why you'd be a good fit.
          </p>
        </div>

        {/* Form */}
        <div className="card-dark p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-ivory/70 mb-2">
                Full Name <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-ivory/70 mb-2">
                Email <span className="text-gold">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Country Interest */}
            <div>
              <label className="block text-sm text-ivory/70 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Countries of Interest
              </label>
              <input
                type="text"
                value={formData.countryInterest}
                onChange={(e) => setFormData({ ...formData, countryInterest: e.target.value })}
                className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                placeholder="e.g., Portugal, Thailand, Mexico"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm text-ivory/70 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Tell us about yourself
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder="What brings you to Brothers of the Passport? What are your goals for location freedom?"
              />
            </div>

            {/* Honeypot (anti-spam) */}
            <div className="hidden">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>

        {/* Note */}
        <p className="text-center text-ivory/50 text-sm mt-6">
          Applications are reviewed within 24-48 hours. You'll receive an email with our decision.
        </p>
      </div>
    </div>
  );
};

export default Apply;
