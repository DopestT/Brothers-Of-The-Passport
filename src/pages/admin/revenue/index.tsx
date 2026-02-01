import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download
} from 'lucide-react';
import { getCurrentProfile } from '@/lib/supabase';
import { isAdmin } from '@/lib/rbac';

interface RevenueMetrics {
  mrr: number;
  arr: number;
  totalRevenue: number;
  activeSubscriptions: number;
  churnRate: number;
  avgRevenuePerUser: number;
  newSubscriptionsThisMonth: number;
  canceledThisMonth: number;
}

const MOCK_METRICS: RevenueMetrics = {
  mrr: 98550,
  arr: 1182600,
  totalRevenue: 456780,
  activeSubscriptions: 2047,
  churnRate: 3.2,
  avgRevenuePerUser: 48.15,
  newSubscriptionsThisMonth: 87,
  canceledThisMonth: 23,
};

const MONTHLY_DATA = [
  { month: 'Jan', revenue: 82000, subs: 1680 },
  { month: 'Feb', revenue: 85000, subs: 1750 },
  { month: 'Mar', revenue: 89000, subs: 1830 },
  { month: 'Apr', revenue: 91000, subs: 1890 },
  { month: 'May', revenue: 94000, subs: 1950 },
  { month: 'Jun', revenue: 98550, subs: 2047 },
];

const TIER_BREAKDOWN = [
  { tier: 'PLUS', count: 1650, revenue: 80850, percentage: 82 },
  { tier: 'ELITE', count: 397, revenue: 17700, percentage: 18 },
];

const TOP_AFFILIATES = [
  { partner: 'Booking.com', clicks: 2450, revenue: 3840 },
  { partner: 'SafetyWing', clicks: 1890, revenue: 4200 },
  { partner: 'Wise', clicks: 1560, revenue: 2340 },
  { partner: 'NordVPN', clicks: 1230, revenue: 4920 },
  { partner: 'Airalo', clicks: 980, revenue: 1470 },
];

const AdminRevenue = () => {
  const navigate = useNavigate();
  const [metrics] = useState<RevenueMetrics>(MOCK_METRICS);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-3xl text-gold mb-2">Revenue Dashboard</h1>
            <p className="text-ivory/60">Track MRR, subscriptions, and affiliate performance</p>
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
            title="Monthly Recurring Revenue"
            value={formatCurrency(metrics.mrr)}
            change="+4.8%"
            positive
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <MetricCard
            title="Annual Recurring Revenue"
            value={formatCurrency(metrics.arr)}
            change="+5.2%"
            positive
            icon={<Calendar className="w-6 h-6" />}
          />
          <MetricCard
            title="Active Subscriptions"
            value={metrics.activeSubscriptions.toLocaleString()}
            change="+87 this month"
            positive
            icon={<Users className="w-6 h-6" />}
          />
          <MetricCard
            title="Churn Rate"
            value={`${metrics.churnRate}%`}
            change="-0.3%"
            positive
            icon={<CreditCard className="w-6 h-6" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Revenue Chart */}
          <div className="card-dark p-6">
            <h2 className="font-serif text-xl text-ivory mb-6">Revenue Trend</h2>
            <div className="h-64 flex items-end gap-4">
              {MONTHLY_DATA.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gold/60 rounded-t hover:bg-gold transition-colors"
                    style={{ height: `${(data.revenue / 100000) * 200}px` }}
                  />
                  <span className="text-ivory/50 text-sm mt-2">{data.month}</span>
                  <span className="text-gold text-xs">${(data.revenue / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier Breakdown */}
          <div className="card-dark p-6">
            <h2 className="font-serif text-xl text-ivory mb-6">Subscription Tiers</h2>
            <div className="space-y-6">
              {TIER_BREAKDOWN.map((tier) => (
                <div key={tier.tier}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-ivory font-medium">{tier.tier}</span>
                    <span className="text-gold">{formatCurrency(tier.revenue)}/mo</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-charcoal-light rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${tier.percentage}%` }}
                      />
                    </div>
                    <span className="text-ivory/60 text-sm w-16">{tier.count} subs</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-ivory/60">Average Revenue Per User</span>
                <span className="text-gold font-semibold">{formatCurrency(metrics.avgRevenuePerUser)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Performance */}
        <div className="card-dark p-6 mb-12">
          <h2 className="font-serif text-xl text-ivory mb-6">Top Affiliate Partners</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-4 text-ivory/60 font-medium">Partner</th>
                  <th className="pb-4 text-ivory/60 font-medium">Clicks</th>
                  <th className="pb-4 text-ivory/60 font-medium">Est. Revenue</th>
                  <th className="pb-4 text-ivory/60 font-medium">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {TOP_AFFILIATES.map((affiliate) => (
                  <tr key={affiliate.partner} className="border-b border-white/5">
                    <td className="py-4 text-ivory">{affiliate.partner}</td>
                    <td className="py-4 text-ivory/70">{affiliate.clicks.toLocaleString()}</td>
                    <td className="py-4 text-gold">${affiliate.revenue.toLocaleString()}</td>
                    <td className="py-4 text-ivory/70">
                      {((affiliate.revenue / affiliate.clicks) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-dark p-6">
          <h2 className="font-serif text-xl text-ivory mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              message="New PLUS subscription"
              detail="john@example.com"
              time="2 minutes ago"
              positive
            />
            <ActivityItem
              message="Member upgraded to ELITE"
              detail="mike@example.com"
              time="15 minutes ago"
              positive
            />
            <ActivityItem
              message="Subscription canceled"
              detail="Canceled at period end"
              time="1 hour ago"
              positive={false}
            />
            <ActivityItem
              message="Booking.com conversion"
              detail="$142 commission"
              time="3 hours ago"
              positive
            />
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
  positive, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  positive: boolean;
  icon: React.ReactNode;
}) => (
  <div className="card-dark p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="text-gold">{icon}</div>
      <span className={`flex items-center gap-1 text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </span>
    </div>
    <p className="text-ivory/60 text-sm mb-1">{title}</p>
    <p className="text-ivory text-2xl font-semibold">{value}</p>
  </div>
);

const ActivityItem = ({ 
  message, 
  detail, 
  time, 
  positive 
}: { 
  message: string; 
  detail: string; 
  time: string;
  positive: boolean;
}) => (
  <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
    <div className={`w-2 h-2 rounded-full ${positive ? 'bg-green-400' : 'bg-red-400'}`} />
    <div className="flex-grow">
      <p className="text-ivory text-sm">{message}</p>
      <p className="text-ivory/50 text-xs">{detail}</p>
    </div>
    <span className="text-ivory/40 text-xs">{time}</span>
  </div>
);

export default AdminRevenue;
