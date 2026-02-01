import { useState } from 'react';
import { Search, BookOpen, MapPin, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { 
  CORNERSTONE_ARTICLES, 
  getFeaturedGuides, 
  getAllCountries,
  type Guide 
} from '@/data/guides';

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'country' | 'city' | 'topic'>('all');

  const featuredGuides = getFeaturedGuides();
  const countries = getAllCountries();

  const filteredGuides = CORNERSTONE_ARTICLES.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Guides & Insights
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Expert knowledge on visas, residencies, cost of living, and the nomad lifestyle. 
            Written for men who want actionable information.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory/40" />
            <input
              type="text"
              placeholder="Search guides, countries, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-charcoal border border-white/10 rounded-lg pl-12 pr-4 py-4 text-ivory focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['all', 'topic', 'country', 'city'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-charcoal'
                  : 'bg-charcoal-light text-ivory/70 hover:text-ivory'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>

        {/* Featured Guides */}
        {!searchQuery && activeCategory === 'all' && (
          <div className="mb-16">
            <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-gold" />
              Featured Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        )}

        {/* Countries */}
        {!searchQuery && (activeCategory === 'all' || activeCategory === 'country') && (
          <div className="mb-16">
            <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-gold" />
              Explore by Country
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {countries.map((country) => (
                <a
                  key={country.slug}
                  href={`/city-guides/${country.slug}`}
                  className="card-dark p-4 hover:border-gold/30 transition-colors text-center"
                >
                  <h3 className="font-serif text-lg text-ivory">{country.name}</h3>
                  <p className="text-ivory/50 text-sm">{country.cityCount} cities</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* All Guides */}
        <div>
          <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-gold" />
            {searchQuery ? 'Search Results' : 'All Guides'}
          </h2>
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-ivory/50">No guides found. Try a different search.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 card-dark p-8 border-gold/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl text-gold mb-2">Get Full Access</h3>
              <p className="text-ivory/70">
                Members get exclusive city guides, verified resources, and insider information.
              </p>
            </div>
            <a href="/join" className="btn-gold whitespace-nowrap">
              Become a Member
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuideCard = ({ guide }: { guide: Guide }) => (
  <a
    href={`/guides/${guide.slug}`}
    className="card-dark p-6 hover:border-gold/30 transition-colors flex flex-col h-full"
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs text-gold uppercase tracking-wider">{guide.category}</span>
      {guide.featured && (
        <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded">Featured</span>
      )}
    </div>
    <h3 className="font-serif text-xl text-ivory mb-3 flex-grow">{guide.title}</h3>
    <p className="text-ivory/60 text-sm mb-4">{guide.description}</p>
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-1 text-ivory/50">
        <Clock className="w-4 h-4" />
        {guide.readTime}
      </div>
      <span className="text-gold flex items-center gap-1">
        Read <ArrowRight className="w-4 h-4" />
      </span>
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      {guide.tags.slice(0, 3).map((tag) => (
        <span key={tag} className="text-xs text-ivory/40 bg-charcoal px-2 py-1 rounded">
          {tag}
        </span>
      ))}
    </div>
  </a>
);

export default Guides;
