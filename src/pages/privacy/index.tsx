const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-gold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-ivory/70 mb-8">Last Updated: January 2025</p>
          
          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Introduction</h2>
            <p className="text-ivory/80 leading-relaxed">
              Brothers of the Passport ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when 
              you use our membership services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Information We Collect</h2>
            <h3 className="text-gold text-lg mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-ivory/80 space-y-2 mb-4">
              <li>Name and email address</li>
              <li>Billing information (processed securely by Stripe)</li>
              <li>Country of interest and travel preferences</li>
              <li>Communication history</li>
            </ul>
            
            <h3 className="text-gold text-lg mb-2">Usage Information</h3>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Login activity and access logs</li>
              <li>Pages visited and features used</li>
              <li>Affiliate link clicks (anonymized)</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">How We Use Your Information</h2>
            <ol className="list-decimal list-inside text-ivory/80 space-y-2">
              <li><strong>Service Provision:</strong> To provide membership services, content access, and community features</li>
              <li><strong>Billing:</strong> To process payments and manage subscriptions</li>
              <li><strong>Communication:</strong> To send updates, newsletters, and important notices</li>
              <li><strong>Improvement:</strong> To analyze usage and improve our services</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Information Sharing</h2>
            <p className="text-ivory/80 leading-relaxed">
              We do not sell your personal information. We share data only with:
            </p>
            <ul className="list-disc list-inside text-ivory/80 space-y-2 mt-2">
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Supabase:</strong> For data storage</li>
              <li><strong>Resend:</strong> For email delivery</li>
              <li><strong>Legal authorities:</strong> When required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Data Security</h2>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>All data encrypted in transit (HTTPS/TLS)</li>
              <li>Database encrypted at rest</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Your Rights</h2>
            <p className="text-ivory/80 leading-relaxed mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion (subject to legal obligations)</li>
              <li>Export your data</li>
              <li>Unsubscribe from marketing emails</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Data Retention</h2>
            <ul className="list-disc list-inside text-ivory/80 space-y-2">
              <li><strong>Active accounts:</strong> Data retained while membership is active</li>
              <li><strong>Canceled accounts:</strong> Data retained for 1 year, then anonymized</li>
              <li><strong>Financial records:</strong> Retained for 7 years (legal requirement)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Contact</h2>
            <p className="text-ivory/80">
              For privacy inquiries:{' '}
              <a href="mailto:privacy@brothersofthepassport.com" className="text-gold hover:underline">
                privacy@brothersofthepassport.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
