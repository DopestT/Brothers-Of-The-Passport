import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, DollarSign, FileText, AlertTriangle, Sparkles, Plane, Hotel, Shield, ArrowLeft, ExternalLink } from 'lucide-react';
import { CITY_GUIDES, getCityGuide, getRelatedCities, getAllCountries, type CityGuide } from '@/data/guides';
import { trackAffiliateClick } from '@/lib/affiliates';

const CityGuidePage = () => {
  const { country, city } = useParams<{ country?: string; city?: string }>();
  const [selectedCity, setSelectedCity] = useState<CityGuide | null>(null);
  const [countries, setCountries] = useState<{ name: string; slug: string; cityCount: number }[]>([]);

  useEffect(() => {
    setCountries(getAllCountries());
    
    if (city) {
      const guide = getCityGuide(city);
      setSelectedCity(guide || null);
    }
  }, [city, country]);

  // Country listing page
  if (country && !city) {
    const countryCities = CITY_GUIDES.filter(c => 
      c.country.toLowerCase().replace(/\s+/g, '-') === country
    );
    const countryName = countryCities[0]?.country || country;

    return (
      <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <a href="/city-guides" className="text-ivory/60 hover:text-gold flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            All City Guides
          </a>
          
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            {countryName}
          </h1>
          <p className="text-ivory/70 max-w-2xl mb-12">
            Explore cities in {countryName}. Detailed cost breakdowns, visa information, 
            and member-exclusive perks.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryCities.map((cityGuide) => (
              <a
                key={cityGuide.slug}
                href={`/city-guides/${country}/${cityGuide.slug}`}
                className="card-dark p-6 hover:border-gold/30 transition-colors"
              >
                <h2 className="font-serif text-2xl text-ivory mb-2">{cityGuide.city}</h2>
                <p className="text-gold mb-4">{cityGuide.costOfLiving.total}</p>
                <p className="text-ivory/60 text-sm line-clamp-2">{cityGuide.why}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Individual city guide
  if (selectedCity) {
    // const travelPerks = getCityTravelPerks(selectedCity.city);
    const relatedCities = getRelatedCities(selectedCity.slug, 2);

    return (
      <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-ivory/60 mb-6">
            <a href="/city-guides" className="hover:text-gold">City Guides</a>
            <span>/</span>
            <a href={`/city-guides/${selectedCity.country.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gold">
              {selectedCity.country}
            </a>
            <span>/</span>
            <span className="text-ivory">{selectedCity.city}</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-gold mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">{selectedCity.region}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-ivory mb-4">
              {selectedCity.city}, {selectedCity.country}
            </h1>
            <p className="text-ivory/70 text-lg">{selectedCity.why}</p>
          </div>

          {/* Cost of Living */}
          <div className="card-dark p-8 mb-8">
            <h2 className="font-serif text-2xl text-gold mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Cost of Living
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-ivory/50 text-sm mb-1">Accommodation</p>
                <p className="text-ivory font-medium">{selectedCity.costOfLiving.accommodation}</p>
              </div>
              <div>
                <p className="text-ivory/50 text-sm mb-1">Food</p>
                <p className="text-ivory font-medium">{selectedCity.costOfLiving.food}</p>
              </div>
              <div>
                <p className="text-ivory/50 text-sm mb-1">Transport</p>
                <p className="text-ivory font-medium">{selectedCity.costOfLiving.transport}</p>
              </div>
              <div className="bg-gold/10 p-4 rounded-lg">
                <p className="text-gold text-sm mb-1">Total Monthly</p>
                <p className="text-gold font-semibold text-lg">{selectedCity.costOfLiving.total}</p>
              </div>
            </div>
          </div>

          {/* Visa Info */}
          <div className="card-dark p-8 mb-8">
            <h2 className="font-serif text-2xl text-gold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Visa Requirements
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-ivory/50 text-sm mb-1">Requirements</p>
                <p className="text-ivory">{selectedCity.visa.requirements}</p>
              </div>
              <div>
                <p className="text-ivory/50 text-sm mb-1">Duration</p>
                <p className="text-ivory">{selectedCity.visa.duration}</p>
              </div>
              <div className="bg-charcoal p-4 rounded-lg">
                <p className="text-ivory/50 text-sm mb-1">Notes</p>
                <p className="text-ivory/80">{selectedCity.visa.notes}</p>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="card-dark p-8 mb-8">
            <h2 className="font-serif text-2xl text-gold mb-4">Lifestyle</h2>
            <p className="text-ivory/80 leading-relaxed">{selectedCity.lifestyle}</p>
          </div>

          {/* Risks */}
          <div className="card-dark p-8 mb-8 border-red-500/20">
            <h2 className="font-serif text-2xl text-red-400 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Considerations
            </h2>
            <ul className="space-y-2">
              {selectedCity.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-ivory/70">
                  <span className="text-red-400 mt-1">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Member Perks */}
          <div className="card-dark p-8 mb-8 border-gold/30">
            <h2 className="font-serif text-2xl text-gold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Member Perks
            </h2>
            <ul className="space-y-3">
              {selectedCity.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-2 text-ivory/80">
                  <Sparkles className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Booking */}
          <div className="card-dark p-8 mb-8">
            <h2 className="font-serif text-2xl text-gold mb-6">Book Your Trip</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href={selectedCity.affiliateLinks.flights}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick('skyscanner', 'flight')}
                className="flex items-center gap-3 p-4 bg-charcoal rounded-lg hover:bg-charcoal-light transition-colors"
              >
                <Plane className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-ivory font-medium">Flights</p>
                  <p className="text-ivory/50 text-sm">Compare prices</p>
                </div>
                <ExternalLink className="w-4 h-4 text-ivory/40 ml-auto" />
              </a>
              <a
                href={selectedCity.affiliateLinks.hotels}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick('booking', 'hotel')}
                className="flex items-center gap-3 p-4 bg-charcoal rounded-lg hover:bg-charcoal-light transition-colors"
              >
                <Hotel className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-ivory font-medium">Hotels</p>
                  <p className="text-ivory/50 text-sm">Member rates</p>
                </div>
                <ExternalLink className="w-4 h-4 text-ivory/40 ml-auto" />
              </a>
              <a
                href={selectedCity.affiliateLinks.insurance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick('safetywing', 'insurance')}
                className="flex items-center gap-3 p-4 bg-charcoal rounded-lg hover:bg-charcoal-light transition-colors"
              >
                <Shield className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-ivory font-medium">Insurance</p>
                  <p className="text-ivory/50 text-sm">Nomad coverage</p>
                </div>
                <ExternalLink className="w-4 h-4 text-ivory/40 ml-auto" />
              </a>
            </div>
          </div>

          {/* Related Cities */}
          {relatedCities.length > 0 && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl text-ivory mb-6">Also in {selectedCity.country}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedCities.map((city) => (
                  <a
                    key={city.slug}
                    href={`/city-guides/${city.country.toLowerCase().replace(/\s+/g, '-')}/${city.slug}`}
                    className="card-dark p-6 hover:border-gold/30 transition-colors"
                  >
                    <h3 className="font-serif text-xl text-ivory mb-2">{city.city}</h3>
                    <p className="text-gold">{city.costOfLiving.total}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // All cities listing
  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            City Guides
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Detailed breakdowns of the world's best cities for location-independent living. 
            Real costs, visa info, and member perks.
          </p>
        </div>

        {/* Countries */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-ivory mb-6">Browse by Country</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map((country) => (
              <a
                key={country.slug}
                href={`/city-guides/${country.slug}`}
                className="card-dark p-6 hover:border-gold/30 transition-colors text-center"
              >
                <h3 className="font-serif text-xl text-ivory mb-1">{country.name}</h3>
                <p className="text-ivory/50 text-sm">{country.cityCount} cities</p>
              </a>
            ))}
          </div>
        </div>

        {/* All Cities */}
        <div>
          <h2 className="font-serif text-2xl text-ivory mb-6">All Cities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITY_GUIDES.map((city) => (
              <a
                key={city.slug}
                href={`/city-guides/${city.country.toLowerCase().replace(/\s+/g, '-')}/${city.slug}`}
                className="card-dark p-6 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-gold text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {city.region}
                </div>
                <h3 className="font-serif text-xl text-ivory mb-1">{city.city}</h3>
                <p className="text-ivory/50 text-sm mb-3">{city.country}</p>
                <p className="text-gold font-medium">{city.costOfLiving.total}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityGuidePage;
