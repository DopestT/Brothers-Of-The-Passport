import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, BarChart3, ArrowRight } from 'lucide-react';
import { getCurrentProfile, type Profile } from '@/lib/supabase';
import { isAdmin } from '@/lib/rbac';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const currentProfile = await getCurrentProfile();
      if (!currentProfile || !isAdmin(currentProfile)) {
        navigate('/dashboard');
        return;
      }
      setProfile(currentProfile);
    } catch (error) {
      console.error('Error:', error);
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

  const adminSections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Applications',
      description: 'Review and manage membership applications',
      href: '/admin/applications',
      count: 12,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Members',
      description: 'View and manage active members',
      href: '/admin/members',
      count: 2047,
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics',
      description: 'View site analytics and metrics',
      href: '/admin/analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl text-gold mb-2">Admin Dashboard</h1>
          <p className="text-ivory/60">Manage your membership platform</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="card-dark p-6 text-center">
            <div className="font-serif text-3xl text-gold mb-1">80+</div>
            <div className="text-ivory/60 text-sm">Countries</div>
          </div>
          <div className="card-dark p-6 text-center">
            <div className="font-serif text-3xl text-gold mb-1">2,047</div>
            <div className="text-ivory/60 text-sm">Members</div>
          </div>
          <div className="card-dark p-6 text-center">
            <div className="font-serif text-3xl text-gold mb-1">$98K</div>
            <div className="text-ivory/60 text-sm">Monthly Revenue</div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="space-y-4">
          {adminSections.map((section) => (
            <div
              key={section.title}
              className="card-dark p-6 flex items-center justify-between cursor-pointer hover:border-gold/30 transition-colors"
              onClick={() => navigate(section.href)}
            >
              <div className="flex items-center gap-4">
                <div className="text-gold">{section.icon}</div>
                <div>
                  <h3 className="font-serif text-lg text-ivory">{section.title}</h3>
                  <p className="text-ivory/60 text-sm">{section.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {section.count !== undefined && (
                  <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm">
                    {section.count}
                  </span>
                )}
                <ArrowRight className="w-5 h-5 text-ivory/40" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="font-serif text-xl text-ivory mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/api/admin/export/members"
              className="border border-gold/40 text-gold px-4 py-2 rounded text-sm hover:bg-gold/10 transition-colors"
            >
              Export Members CSV
            </a>
            <a
              href="/api/admin/export/applications"
              className="border border-gold/40 text-gold px-4 py-2 rounded text-sm hover:bg-gold/10 transition-colors"
            >
              Export Applications CSV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
