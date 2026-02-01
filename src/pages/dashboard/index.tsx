import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  BookOpen, 
  Users, 
  Settings,
  Crown,
  LogOut,
  Shield
} from 'lucide-react';
import { getCurrentProfile, signOut, type Profile } from '@/lib/supabase';
import { openCustomerPortal } from '@/lib/stripe';
import { hasAccess, isAdmin, getRoleDisplayName } from '@/lib/rbac';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  action?: () => void;
  requires: 'guest' | 'plus' | 'elite' | 'admin';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const currentProfile = await getCurrentProfile();
      if (!currentProfile) {
        navigate('/login');
        return;
      }
      setProfile(currentProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleBilling = async () => {
    try {
      await openCustomerPortal();
    } catch (error) {
      console.error('Billing error:', error);
      alert('Could not open billing portal. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-gold">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const menuItems: MenuItem[] = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Country Guides',
      description: 'Access travel guides and strategies',
      href: '/guides',
      requires: 'plus',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Community',
      description: 'Connect with other members',
      href: '/community',
      requires: 'plus',
    },
    {
      icon: <Crown className="w-5 h-5" />,
      title: 'Verified Resources',
      description: 'Lawyers, tax advisors, relocation experts',
      href: '/resources',
      requires: 'elite',
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Billing',
      description: 'Manage your subscription',
      action: handleBilling,
      requires: 'plus',
    },
    {
      icon: <User className="w-5 h-5" />,
      title: 'Profile',
      description: 'Update your information',
      href: '/profile',
      requires: 'plus',
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: 'Settings',
      description: 'Account preferences',
      href: '/settings',
      requires: 'plus',
    },
  ];

  if (isAdmin(profile)) {
    menuItems.push({
      icon: <Shield className="w-5 h-5" />,
      title: 'Admin Panel',
      description: 'Manage members and applications',
      href: '/admin',
      requires: 'admin',
    });
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-3xl text-gold mb-2">
              Welcome, {profile.full_name || 'Brother'}
            </h1>
            <p className="text-ivory/60">
              {getRoleDisplayName(profile.role)}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const hasItemAccess = hasAccess(profile, item.requires);
            
            return (
              <div
                key={item.title}
                className={`card-dark p-6 ${
                  hasItemAccess 
                    ? 'cursor-pointer hover:border-gold/30' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (!hasItemAccess) return;
                  if (item.action) {
                    item.action();
                  } else if (item.href) {
                    navigate(item.href);
                  }
                }}
              >
                <div className="text-gold mb-4">{item.icon}</div>
                <h3 className="font-serif text-lg text-ivory mb-1">{item.title}</h3>
                <p className="text-ivory/60 text-sm">{item.description}</p>
                {!hasItemAccess && (
                  <p className="text-gold text-xs mt-2">ELITE only</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Upgrade CTA (for PLUS members) */}
        {profile.role === 'plus' && (
          <div className="mt-12 card-dark p-8 border-gold/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-xl text-gold mb-2">Upgrade to ELITE</h3>
                <p className="text-ivory/70">
                  Unlock verified resources, priority support, and VIP events.
                </p>
              </div>
              <a
                href="/join"
                className="btn-gold whitespace-nowrap"
              >
                Upgrade Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
