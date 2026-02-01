const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-gold mb-8">Disclaimer</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-ivory/70 mb-8">Last Updated: January 2025</p>
          
          <section className="mb-8">
            <div className="bg-gold/10 border border-gold/30 p-6 rounded-lg mb-8">
              <h2 className="font-serif text-xl text-gold mb-4">Not Professional Advice</h2>
              <p className="text-ivory/80 leading-relaxed">
                Brothers of the Passport provides information and community resources only. 
                This is <strong className="text-gold">NOT</strong>:
              </p>
              <ul className="list-disc list-inside text-ivory/80 space-y-2 mt-4">
                <li>Financial advice</li>
                <li>Investment advice</li>
                <li>Tax advice</li>
                <li>Legal advice</li>
                <li>Immigration advice</li>
                <li>Medical advice</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">No Guarantees</h2>
            <p className="text-ivory/80 leading-relaxed mb-4">
              We do not guarantee:
            </p>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Specific travel savings</li>
              <li>Visa approvals</li>
              <li>Business success</li>
              <li>Tax optimization results</li>
              <li>Any specific outcomes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Individual Responsibility</h2>
            <p className="text-ivory/80 leading-relaxed mb-4">
              You are solely responsible for:
            </p>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Verifying all information independently</li>
              <li>Complying with all applicable laws</li>
              <li>Consulting qualified professionals</li>
              <li>Your financial and legal decisions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Third-Party Services</h2>
            <p className="text-ivory/80 leading-relaxed mb-4">
              We may recommend or link to third-party services. We:
            </p>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Are not affiliated unless stated</li>
              <li>Do not endorse all content</li>
              <li>Are not responsible for their actions</li>
              <li>Receive no compensation unless disclosed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Testimonials</h2>
            <p className="text-ivory/80 leading-relaxed">
              Testimonials represent individual experiences, not typical results. Your results may vary. 
              Success depends on many factors including individual effort, market conditions, and personal circumstances.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Updates</h2>
            <p className="text-ivory/80 leading-relaxed">
              Information may become outdated. We strive for accuracy but make no guarantees. 
              Always verify current laws, regulations, and procedures before taking action.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Affiliate Disclosure</h2>
            <p className="text-ivory/80 leading-relaxed">
              Brothers of the Passport participates in affiliate marketing programs. We may earn commissions 
              when you click on affiliate links or purchase products through our links. This does not affect 
              the price you pay. We only promote services we believe in.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Contact</h2>
            <p className="text-ivory/80">
              Questions? Contact us at{' '}
              <a href="mailto:hello@brothersofthepassport.com" className="text-gold hover:underline">
                hello@brothersofthepassport.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
