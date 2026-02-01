import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'For general inquiries and support',
      email: 'support@brothersofthepassport.com',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Community',
      description: 'For members - join the discussion',
      email: 'community@brothersofthepassport.com',
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4 text-center">Contact Us</h1>
        <p className="text-ivory/70 text-center mb-12 max-w-2xl mx-auto">
          Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.
        </p>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method) => (
            <div key={method.title} className="card-dark p-6 text-center">
              <div className="text-gold mb-4 flex justify-center">{method.icon}</div>
              <h3 className="font-serif text-xl text-ivory mb-2">{method.title}</h3>
              <p className="text-ivory/60 text-sm mb-4">{method.description}</p>
              <a
                href={`mailto:${method.email}`}
                className="text-gold hover:underline text-sm"
              >
                {method.email}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="card-dark p-8">
          <h2 className="font-serif text-2xl text-ivory mb-6">Send a Message</h2>
          
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-gold mb-4">
                <Send className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="font-serif text-xl text-ivory mb-2">Message Sent!</h3>
              <p className="text-ivory/60">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-ivory/70 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label className="block text-sm text-ivory/70 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                className="btn-gold w-full md:w-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
