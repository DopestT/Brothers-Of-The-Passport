import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Globe, 
  MousePointer, 
  TrendingUp,
  MapPin,
  Download,
  Calendar
} from 'lucide-react';
import { getCurrentProfile } from '@/lib/supabase';
import { isAdmin } from '@/lib/rbac';

interface AnalyticsMetrics {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  bounceRate: string;
  conversionRate: string;
}

const MOCK_METRICS: AnalyticsMetrics = {
  totalMembers: 2047,
  activeMembers: 1856,
  newMembersThisMonth: 87,
  pageViews: 145230,
  uniqueVisitors: 45230,
  avgSessionDuration: '4m 32s',
  bounceRate: '34.2%',
  conversionRate: '2.8%',
};

const TOP_COUNTRIES = [
  { country: 'United States', members: 456, percentage: 22 },
  { country: 'United Kingdom', members: 234, percentage: 11 },
  { country: 'Germany', members: 189, percentage: 9 },
  { country: 'Canada', members: 156, percentage: 8 },
  { country: 'Australia', members: 134, percentage: 7 },
  { country: 'Netherlands', members: 98, percentage: 5 },
  { country: 'France', members: 87, percentage: 4 },
  { country: 'Other', members: 693, percentage: 34 },
];

const CITY_INTEREST = [
  { city: 'Lisbon, Portugal', searches: 2340, bookings: 45 },
  { city: 'Bangkok, Thailand', searches: 1890, bookings: 38 },
  { city: 'Mexico City, Mexico', searches: 1650, bookings: 32 },
  { city: 'Dubai, UAE', searches: 1420, bookings: 28 },
  { city: 'Bali, Indonesia', searches: 1380, bookings: 26 },
  { city: 'Medellin, Colombia', searches: 1120, bookings: 21 },
  { city: 'Tbilisi, Georgia', searches: 980, bookings: 18 },
  { city: 'Chiang Mai, Thailand', searches: 890, bookings: 16 },
];

const TOP_PAGES = [
  { page: '/', views: 45230, avgTime: '2m 15s' },
  { page: '/join', views: 12340, avgTime: '3m 45s' },
  { page: '/city-guides', views: 8920, avgTime: '5m 20s' },
  { page: '/book-travel', views: 7650, avgTime: '4m 10s' },
  { page: '/tools-perks', views: 6230, avgTime: '3m 30s' },
  { page: '/guides', views: 5890, avgTime: '6m 45s' },
];

const TRAFFIC_SOURCES = [
  { source: 'Organic Search', percentage: 42, color: 'bg-green-500' },
  { source: 'Direct', percentage: 28, color: 'bg-blue-500' },
  { source: 'Social Media', percentage: 18, color: 'bg-purple-500' },
  { source: 'Referral', percentage: 8, color: 'bg-orange-500' },
  { source: 'Email', percentage: 4, color: 'bg-pink-500' },
];

const AdminMetrics = () => {
  const navigate = useNavigate();
  const [metrics] = useState<AnalyticsMetrics>(MOCK_METRICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const profile = await getCurrentProfile();
      if (!profile || !isAdmin(profile)) {
        navigate('/dashboard');
        return;
      }
    } catch (error) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-gold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-3xl text-gold mb-2">Analytics & Metrics</h1>
            <p className="text-ivory/60">Track growth, engagement, and user behavior</p>
          </div>
          <div className="flex gap-4">
            <select className="bg-charcoal-light border border-white/10 rounded px-4 py-2 text-ivory">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
              <option>All Time</option>
            </select>
            <button className="flex items-center gap-2 border border-gold/40 text-gold px-4 py-2 rounded hover:bg-gold/10">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Total Members"
            value={metrics.totalMembers.toLocaleString()}
            change="+87 this month"
            icon={<Users className="w-6 h-6" />}
          />
          <MetricCard
            title="Active Members"
            value={metrics.activeMembers.toLocaleString()}
            change="90.7% active rate"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <MetricCard
            title="Page Views"
            value={metrics.pageViews.toLocaleString()}
            change="+12.4% vs last month"
            icon={<MousePointer className="w-6 h-6" />}
          />
          <MetricCard
            title="Conversion Rate"
            value={metrics.conversionRate}
            change="+0.3% vs last month"
            icon={<Calendar className="w-6 h-6" />}
          />
        </div>

        {/* Geographic Distribution */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="card-dark p-6">
            <h2 className="font-serif text-xl text-ivory mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              Member Distribution
            </h2>
            <div className="space-y-4">
              {TOP_COUNTRIES.map((country) => (
                <div key={country.country}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-ivory text-sm">{country.country}</span>
                    <span className="text-ivory/60 text-sm">{country.members} members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-charcoal-light rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-gold text-sm w-10">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* City Interest Heatmap */}
          <div className="card-dark p-6">
            <h2 className="font-serif text-xl text-ivory mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold" />
              City Interest (Last 30 Days)
            </h2>
            <div className="space-y-4">
              {CITY_INTEREST.map((city) => (
                <div key={city.city} className="flex items-center justify-between py-2 border-b border-white/5">
                  <div>
                    <p className="text-ivory text-sm">{city.city}</p>
                    <p className="text-ivory/50 text-xs">{city.searches.toLocaleString()} searches</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gold text-sm">{city.bookings} bookings</span>
                    <p className="text-ivory/50 text-xs">
                      {((city.bookings / city.searches) * 100).toFixed(1)}% conversion
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="card-dark p-6 mb-12">
          <h2 className="font-serif text-xl text-ivory mb-6">Traffic Sources</h2>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="h-4 flex rounded-full overflow-hidden">
                {TRAFFIC_SOURCES.map((source) => (
                  <div 
                    key={source.source}
                    className={`${source.color} h-full`}
                    style={{ width: `${source.percentage}%` }}
                    title={`${source.source}: ${source.percentage}%`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {TRAFFIC_SOURCES.map((source) => (
                <div key={source.source} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${source.color}`} />
                  <span className="text-ivory/70 text-sm">{source.source} ({source.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="card-dark p-6">
          <h2 className="font-serif text-xl text-ivory mb-6">Top Pages</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-4 text-ivory/60 font-medium">Page</th>
                  <th className="pb-4 text-ivory/60 font-medium">Views</th>
                  <th className="pb-4 text-ivory/60 font-medium">Avg. Time</th>
                  <th className="pb-4 text-ivory/60 font-medium">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PAGES.map((page) => (
                  <tr key={page.page} className="border-b border-white/5">
                    <td className="py-4 text-ivory font-mono text-sm">{page.page}</td>
                    <td className="py-4 text-ivory/70">{page.views.toLocaleString()}</td>
                    <td className="py-4 text-ivory/70">{page.avgTime}</td>
                    <td className="py-4 text-ivory/70">{(Math.random() * 30 + 20).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string;
  icon: React.ReactNode;
}) => (
  <div className="card-dark p-6">
    <div className="text-gold mb-4">{icon}</div>
    <p className="text-ivory/60 text-sm mb-1">{title}</p>
    <p className="text-ivory text-2xl font-semibold mb-1">{value}</p>
    <p className="text-green-400 text-sm">{change}</p>
  </div>
);

export default AdminMetrics;
