import { useState } from 'react';
import { Plane, Hotel, Shield, Search, ExternalLink, Sparkles } from 'lucide-react';
import { 
  buildHotelSearchUrl, 
  INSURANCE_PROVIDERS,
  getFeaturedDeals,
  trackOutboundClick 
} from '@/lib/travel';
import { getCurrentProfile } from '@/lib/supabase';

const BookTravel = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'insurance'>('flights');
  const [isElite, setIsElite] = useState(false);

  // Check membership status
  useState(() => {
    getCurrentProfile().then(profile => {
      setIsElite(profile?.role === 'elite');
    });
  });

  // Flight search state
  const [flightSearch, setFlightSearch] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    cabinClass: 'economy' as const,
  });

  // Hotel search state
  const [hotelSearch, setHotelSearch] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://www.skyscanner.com/transport/flights/${flightSearch.origin.toLowerCase()}/${flightSearch.destination.toLowerCase()}/?adults=${flightSearch.adults}&adultsv2=${flightSearch.adults}&cabinclass=${flightSearch.cabinClass}&children=0&childrenv2=&inboundaltsen=off&outboundaltsen=off&preferdirects=false&ref=home&rtn=1&oym=${flightSearch.departureDate.replace(/-/g, '')}&iym=${flightSearch.returnDate?.replace(/-/g, '') || ''}`;
    trackOutboundClick('skyscanner', 'flight');
    window.open(url, '_blank');
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildHotelSearchUrl('booking', {
      destination: hotelSearch.destination,
      checkIn: hotelSearch.checkIn,
      checkOut: hotelSearch.checkOut,
      guests: hotelSearch.guests,
    });
    trackOutboundClick('booking', 'hotel');
    window.open(url, '_blank');
  };

  const featuredDeals = getFeaturedDeals(isElite);

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Book Travel
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Member-exclusive rates on flights, hotels, and insurance. 
            {isElite && <span className="text-gold ml-2">Elite perks unlocked.</span>}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {(['flights', 'hotels', 'insurance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gold text-charcoal'
                  : 'bg-charcoal-light text-ivory/70 hover:text-ivory'
              }`}
            >
              {tab === 'flights' && <Plane className="w-5 h-5" />}
              {tab === 'hotels' && <Hotel className="w-5 h-5" />}
              {tab === 'insurance' && <Shield className="w-5 h-5" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Search Forms */}
        <div className="card-dark p-8 mb-12">
          {activeTab === 'flights' && (
            <form onSubmit={handleFlightSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">From</label>
                  <input
                    type="text"
                    placeholder="City or airport"
                    value={flightSearch.origin}
                    onChange={(e) => setFlightSearch({ ...flightSearch, origin: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">To</label>
                  <input
                    type="text"
                    placeholder="Destination"
                    value={flightSearch.destination}
                    onChange={(e) => setFlightSearch({ ...flightSearch, destination: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">Departure</label>
                  <input
                    type="date"
                    value={flightSearch.departureDate}
                    onChange={(e) => setFlightSearch({ ...flightSearch, departureDate: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">Return</label>
                  <input
                    type="date"
                    value={flightSearch.returnDate}
                    onChange={(e) => setFlightSearch({ ...flightSearch, returnDate: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-ivory/70 mb-2">Cabin Class</label>
                  <select
                    value={flightSearch.cabinClass}
                    onChange={(e) => setFlightSearch({ ...flightSearch, cabinClass: e.target.value as any })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium_economy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-ivory/70 mb-2">Travelers</label>
                  <select
                    value={flightSearch.adults}
                    onChange={(e) => setFlightSearch({ ...flightSearch, adults: parseInt(e.target.value) })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search Flights
              </button>
            </form>
          )}

          {activeTab === 'hotels' && (
            <form onSubmit={handleHotelSearch} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm text-ivory/70 mb-2">Destination</label>
                  <input
                    type="text"
                    placeholder="City or hotel name"
                    value={hotelSearch.destination}
                    onChange={(e) => setHotelSearch({ ...hotelSearch, destination: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">Check-in</label>
                  <input
                    type="date"
                    value={hotelSearch.checkIn}
                    onChange={(e) => setHotelSearch({ ...hotelSearch, checkIn: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ivory/70 mb-2">Check-out</label>
                  <input
                    type="date"
                    value={hotelSearch.checkOut}
                    onChange={(e) => setHotelSearch({ ...hotelSearch, checkOut: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded px-4 py-3 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search Hotels
              </button>
            </form>
          )}

          {activeTab === 'insurance' && (
            <div className="space-y-6">
              <p className="text-ivory/70">
                Travel with peace of mind. Compare coverage from our vetted partners.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {INSURANCE_PROVIDERS.map((provider) => (
                  <a
                    key={provider.name}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutboundClick(provider.name.toLowerCase(), 'insurance')}
                    className="card-dark p-6 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-xl text-ivory">{provider.name}</h3>
                        <p className="text-gold text-sm">{provider.price}</p>
                      </div>
                      <Shield className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-ivory/70 text-sm mb-2">{provider.description}</p>
                    <p className="text-ivory/50 text-xs">Best for: {provider.bestFor}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Featured Deals */}
        <div>
          <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-gold" />
            Member-Exclusive Deals
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <a
                key={deal.id}
                href={deal.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick(deal.type, 'deal')}
                className="card-dark p-6 hover:border-gold/30 transition-colors relative"
              >
                {deal.badge && (
                  <span className="absolute -top-2 right-4 bg-gold text-charcoal text-xs font-semibold px-3 py-1 rounded-full">
                    {deal.badge}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  {deal.type === 'flight' && <Plane className="w-5 h-5 text-gold" />}
                  {deal.type === 'hotel' && <Hotel className="w-5 h-5 text-gold" />}
                  {deal.type === 'insurance' && <Shield className="w-5 h-5 text-gold" />}
                  <span className="text-ivory/50 text-xs uppercase tracking-wider">{deal.type}</span>
                </div>
                <h3 className="font-serif text-lg text-ivory mb-2">{deal.title}</h3>
                <p className="text-ivory/60 text-sm mb-4">{deal.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gold font-semibold">{deal.price}</span>
                    {deal.originalPrice && (
                      <span className="text-ivory/40 text-sm line-through ml-2">{deal.originalPrice}</span>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-ivory/40" />
                </div>
                {deal.discount && (
                  <span className="inline-block mt-2 bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">
                    {deal.discount}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Elite CTA */}
        {!isElite && (
          <div className="mt-12 card-dark p-8 border-gold/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-xl text-gold mb-2">Unlock Elite Travel Perks</h3>
                <p className="text-ivory/70">
                  Get exclusive rates, complimentary upgrades, and priority booking support.
                </p>
              </div>
              <a href="/join" className="btn-gold whitespace-nowrap">
                Upgrade to Elite
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTravel;
