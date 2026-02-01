const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-gold mb-8">Refund Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-ivory/70 mb-8">Last Updated: January 2025</p>
          
          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">General Policy</h2>
            <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg mb-4">
              <p className="text-red-400 font-semibold text-lg">
                No refunds after membership access has been granted.
              </p>
            </div>
            <p className="text-ivory/80 leading-relaxed">
              Due to the immediate access to digital content and community resources upon subscription, 
              we do not offer refunds for membership fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Exceptions</h2>
            <p className="text-ivory/80 leading-relaxed mb-4">
              We may consider refunds in the following circumstances:
            </p>
            <ol className="list-decimal list-inside text-ivory/80 space-y-3">
              <li>
                <strong className="text-gold">Technical Issues:</strong> Service unavailable for more than 
                7 consecutive days due to our technical failures
              </li>
              <li>
                <strong className="text-gold">Duplicate Charges:</strong> Accidental duplicate billing 
                on the same account
              </li>
              <li>
                <strong className="text-gold">Fraud:</strong> Unauthorized use of payment method 
                (requires documentation)
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Refund Process</h2>
            <ol className="list-decimal list-inside text-ivory/80 space-y-3">
              <li>
                Contact{' '}
                <a href="mailto:support@brothersofthepassport.com" className="text-gold hover:underline">
                  support@brothersofthepassport.com
                </a>{' '}
                within 7 days of the charge
              </li>
              <li>Provide reason and supporting documentation</li>
              <li>We will review within 5 business days</li>
              <li>If approved, refund processed within 10 business days to original payment method</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Cancellation vs Refund</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-charcoal-light p-6 rounded-lg border border-gold/20">
                <h3 className="text-gold font-semibold mb-2">Cancellation</h3>
                <ul className="list-disc list-inside text-ivory/80 space-y-2 text-sm">
                  <li>Stops future billing</li>
                  <li>Keeps access until period ends</li>
                  <li>No money back</li>
                  <li>Can re-subscribe anytime</li>
                </ul>
              </div>
              <div className="bg-charcoal-light p-6 rounded-lg border border-gold/20">
                <h3 className="text-gold font-semibold mb-2">Refund</h3>
                <ul className="list-disc list-inside text-ivory/80 space-y-2 text-sm">
                  <li>Returns payment</li>
                  <li>Terminates access immediately</li>
                  <li>Only in exceptional cases</li>
                  <li>Requires approval</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Chargebacks</h2>
            <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
              <p className="text-ivory/80 leading-relaxed">
                Members who initiate chargebacks without contacting support first will be permanently 
                banned from the platform. We take fraud seriously and will dispute illegitimate chargebacks.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-ivory mb-4">Contact</h2>
            <p className="text-ivory/80">
              For refund inquiries:{' '}
              <a href="mailto:support@brothersofthepassport.com" className="text-gold hover:underline">
                support@brothersofthepassport.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
