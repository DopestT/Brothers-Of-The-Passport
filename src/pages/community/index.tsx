import { useState, useEffect } from 'react';
import { Users, MessageCircle, Calendar, Shield, ExternalLink, Crown } from 'lucide-react';
import { getCurrentProfile } from '@/lib/supabase';

const COMMUNITY_RULES = [
  {
    title: 'Respect First',
    description: 'Treat all members with respect. Disagree without being disagreeable.',
  },
  {
    title: 'No Solicitation',
    description: 'No unsolicited promotion, MLM, or spam. Share value, not pitches.',
  },
  {
    title: 'Confidentiality',
    description: "What's shared in the community stays in the community.",
  },
  {
    title: 'No Illegal Advice',
    description: 'Share experiences, not legal advice. Consult professionals for decisions.',
  },
  {
    title: 'Quality Over Quantity',
    description: 'Contribute meaningfully. One helpful post beats ten low-effort comments.',
  },
];

const COMMUNITY_CHANNELS = [
  {
    name: 'General',
    description: 'Introductions, casual chat, and community announcements.',
    icon: '💬',
  },
  {
    name: 'City Intel',
    description: 'Real-time updates on cities, neighborhoods, and local tips.',
    icon: '🌍',
  },
  {
    name: 'Visa & Residency',
    description: 'Visa experiences, timelines, and document sharing.',
    icon: '🛂',
  },
  {
    name: 'Finance & Tax',
    description: 'Banking, investing, tax optimization discussions.',
    icon: '💰',
  },
  {
    name: 'Business',
    description: 'Entrepreneurship, remote work, and business setup.',
    icon: '💼',
  },
  {
    name: 'Lifestyle',
    description: 'Dating, health, fitness, and personal development.',
    icon: '🏋️',
  },
  {
    name: 'Deals & Perks',
    description: 'Member-shared deals on flights, stays, and services.',
    icon: '🎁',
  },
];

const ELITE_CHANNELS = [
  {
    name: 'Elite Lounge',
    description: 'Private channel for ELITE members only.',
    icon: '👑',
  },
  {
    name: 'Verified Resources',
    description: 'Direct access to vetted lawyers, accountants, and consultants.',
    icon: '✅',
  },
  {
    name: 'Deal Flow',
    description: 'Investment opportunities and business partnerships.',
    icon: '📈',
  },
];

const UPCOMING_EVENTS = [
  {
    title: 'Monthly Virtual Meetup',
    date: 'Last Thursday of each month',
    time: '8 PM UTC',
    description: 'Casual hangout with members worldwide.',
    type: 'virtual',
  },
  {
    title: 'Lisbon Meetup',
    date: 'March 15, 2025',
    time: '7 PM WET',
    description: 'In-person gathering for members in Portugal.',
    type: 'in-person',
  },
  {
    title: 'Bangkok Meetup',
    date: 'April 20, 2025',
    time: '7 PM ICT',
    description: 'Dinner and drinks in Sukhumvit.',
    type: 'in-person',
  },
];

const Community = () => {
  const [isElite, setIsElite] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'rules' | 'events'>('about');

  useEffect(() => {
    getCurrentProfile().then(profile => {
      setIsElite(profile?.role === 'elite');
    });
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Community
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Connect with 2,000+ brothers worldwide. Share intel, ask questions, 
            and build relationships.
          </p>
        </div>

        {/* Join CTA */}
        <div className="card-dark p-8 mb-12 border-gold/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h2 className="font-serif text-xl text-ivory">Join the Community</h2>
                <p className="text-ivory/60">Access our private Discord server</p>
              </div>
            </div>
            <a
              href="https://discord.gg/brotherspassport"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2"
            >
              Join Discord
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {(['about', 'rules', 'events'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gold text-charcoal'
                  : 'bg-charcoal-light text-ivory/70 hover:text-ivory'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            {/* Regular Channels */}
            <div>
              <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-gold" />
                Community Channels
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {COMMUNITY_CHANNELS.map((channel) => (
                  <div key={channel.name} className="card-dark p-4 flex items-start gap-3">
                    <span className="text-2xl">{channel.icon}</span>
                    <div>
                      <h3 className="text-ivory font-medium">{channel.name}</h3>
                      <p className="text-ivory/60 text-sm">{channel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elite Channels */}
            <div className={`${isElite ? '' : 'opacity-50'}`}>
              <h2 className="font-serif text-2xl text-gold mb-6 flex items-center gap-2">
                <Crown className="w-6 h-6" />
                ELITE-Only Channels
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ELITE_CHANNELS.map((channel) => (
                  <div key={channel.name} className="card-dark p-4 flex items-start gap-3 border-gold/30">
                    <span className="text-2xl">{channel.icon}</span>
                    <div>
                      <h3 className="text-ivory font-medium">{channel.name}</h3>
                      <p className="text-ivory/60 text-sm">{channel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {!isElite && (
                <div className="mt-4 text-center">
                  <a href="/join" className="text-gold hover:underline">
                    Upgrade to ELITE to access these channels →
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div>
            <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              Community Guidelines
            </h2>
            <div className="space-y-4">
              {COMMUNITY_RULES.map((rule, i) => (
                <div key={rule.title} className="card-dark p-6">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold font-semibold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-ivory font-medium text-lg mb-1">{rule.title}</h3>
                      <p className="text-ivory/60">{rule.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 card-dark p-6 border-red-500/20">
              <h3 className="text-red-400 font-medium mb-2">Enforcement</h3>
              <p className="text-ivory/70 text-sm">
                Violations may result in warnings, temporary suspension, or permanent ban 
                without refund. Moderators have final say. Report issues to @admin.
              </p>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <h2 className="font-serif text-2xl text-ivory mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-gold" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.title} className="card-dark p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          event.type === 'virtual' 
                            ? 'bg-blue-900/30 text-blue-400' 
                            : 'bg-green-900/30 text-green-400'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-ivory font-medium text-lg">{event.title}</h3>
                      <p className="text-ivory/60 text-sm mb-2">{event.description}</p>
                      <p className="text-gold text-sm">{event.date} • {event.time}</p>
                    </div>
                    <button className="px-4 py-2 border border-gold/40 text-gold rounded text-sm hover:bg-gold/10 transition-colors">
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-ivory/60 mb-4">
                Want to host a meetup in your city?
              </p>
              <a 
                href="mailto:community@brothersofthepassport.com" 
                className="text-gold hover:underline"
              >
                Contact our community team
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
