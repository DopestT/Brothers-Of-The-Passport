const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-gold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-ivory/70 mb-8">Last Updated: January 2025</p>
          
          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">1. Acceptance of Terms</h2>
            <p className="text-ivory/80 leading-relaxed">
              By accessing or using Brothers of the Passport services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">2. Membership Eligibility</h2>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Must be 18 years or older</li>
              <li>Must provide accurate information</li>
              <li>Membership is non-transferable</li>
              <li>We reserve the right to refuse service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">3. Subscription Terms</h2>
            
            <h3 className="text-gold text-lg mb-2">PLUS Membership ($49/month)</h3>
            <ul className="list-disc list-inside text-ivory/80 space-y-2 mb-4">
              <li>Access to country guides</li>
              <li>Community forum access</li>
              <li>Monthly newsletter</li>
              <li>Basic travel perks</li>
            </ul>
            
            <h3 className="text-gold text-lg mb-2">ELITE Membership ($99/month)</h3>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>All PLUS benefits</li>
              <li>Priority support</li>
              <li>Exclusive deals</li>
              <li>1-on-1 consultation</li>
              <li>VIP events access</li>
              <li>Verified resources directory</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">4. Payment and Billing</h2>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Monthly billing on subscription date</li>
              <li>Payments processed through Stripe</li>
              <li>Failed payments may result in service suspension</li>
              <li>Prices subject to change with 30-day notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">5. Cancellation</h2>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Cancel anytime through customer portal</li>
              <li>Access continues until end of billing period</li>
              <li>No prorated refunds</li>
              <li>Re-subscription welcome</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">6. Content and Intellectual Property</h2>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>All content is property of Brothers of the Passport</li>
              <li>Members receive limited license for personal use</li>
              <li>No redistribution or commercial use</li>
              <li>No scraping or automated access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">7. Community Guidelines</h2>
            <p className="text-ivory/80 leading-relaxed mb-2">Members agree to:</p>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Treat others with respect</li>
              <li>No harassment or discrimination</li>
              <li>No spam or unsolicited promotion</li>
              <li>No illegal activities discussion</li>
              <li>Maintain confidentiality of member information</li>
            </ul>
            <p className="text-ivory/80 mt-4">Violations may result in immediate termination without refund.</p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">8. Disclaimers</h2>
            <div className="bg-gold/10 border border-gold/30 p-6 rounded-lg mb-4">
              <p className="text-gold font-semibold text-lg mb-2">NOT FINANCIAL, LEGAL, OR TAX ADVICE</p>
              <p className="text-ivory/80">
                All content provided is for informational purposes only. We are not financial advisors, 
                tax professionals, immigration lawyers, or investment advisors. Always consult qualified 
                professionals before making decisions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">9. Limitation of Liability</h2>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Services provided "as is" without warranties</li>
              <li>Not liable for damages from service use</li>
              <li>Not responsible for third-party services</li>
              <li>Maximum liability limited to fees paid in last 12 months</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">10. Contact</h2>
            <p className="text-ivory/80">
              Legal inquiries:{' '}
              <a href="mailto:legal@brothersofthepassport.com" className="text-gold hover:underline">
                legal@brothersofthepassport.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
