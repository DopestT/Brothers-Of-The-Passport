import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import MembershipTiers from './sections/MembershipTiers'
import SocialProof from './sections/SocialProof'
import WhatMembersGet from './sections/WhatMembersGet'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold tracking-tight">Brothers of the Passport</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#membership" className="text-gray-300 hover:text-white transition-colors">Membership</a>
              <a href="#events" className="text-gray-300 hover:text-white transition-colors">Events</a>
              <a href="#guides" className="text-gray-300 hover:text-white transition-colors">Guides</a>
              <a href="#partners" className="text-gray-300 hover:text-white transition-colors">Partners</a>
              <div className="flex items-center space-x-4">
                <a href="#login" className="text-gray-300 hover:text-white transition-colors">Login</a>
                <a href="#join" className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors font-medium">Join</a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <WhatMembersGet />
        <MembershipTiers />
        
        <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Global Experiences</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Connect with brothers across the world at exclusive events and experiences</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
                <h3 className="text-xl font-bold mb-3">Tokyo Meet-Up</h3>
                <p className="text-gray-400 mb-4">Exclusive networking event in the heart of Shibuya</p>
                <span className="text-sm text-gray-500">March 2026</span>
              </div>
              <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
                <h3 className="text-xl font-bold mb-3">Dubai Summit</h3>
                <p className="text-gray-400 mb-4">Elite gathering for ambitious global citizens</p>
                <span className="text-sm text-gray-500">April 2026</span>
              </div>
              <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
                <h3 className="text-xl font-bold mb-3">Bali Retreat</h3>
                <p className="text-gray-400 mb-4">Strategy session and brotherhood building</p>
                <span className="text-sm text-gray-500">May 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section id="guides" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Intelligence</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Access curated guides built by brothers who live the lifestyle</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0f0f0f] p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold mb-2">Visa Strategies</h3>
                <p className="text-gray-400 text-sm">Navigate global mobility with intelligence</p>
              </div>
              <div className="bg-[#0f0f0f] p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold mb-2">Banking & Finance</h3>
                <p className="text-gray-400 text-sm">International account strategies</p>
              </div>
              <div className="bg-[#0f0f0f] p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold mb-2">City Guides</h3>
                <p className="text-gray-400 text-sm">Deep dives into top destinations</p>
              </div>
              <div className="bg-[#0f0f0f] p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold mb-2">Tax Optimization</h3>
                <p className="text-gray-400 text-sm">Legal strategies for global citizens</p>
              </div>
            </div>
          </div>
        </section>

        <section id="partners" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trusted Partners</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Exclusive deals and partnerships negotiated for the brotherhood</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center justify-center p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
                <span className="text-gray-500 font-medium">Premium Travel</span>
              </div>
              <div className="flex items-center justify-center p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
                <span className="text-gray-500 font-medium">Global Banking</span>
              </div>
              <div className="flex items-center justify-center p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
                <span className="text-gray-500 font-medium">Luxury Hotels</span>
              </div>
              <div className="flex items-center justify-center p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
                <span className="text-gray-500 font-medium">Concierge</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
