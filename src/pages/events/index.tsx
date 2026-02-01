import { useState } from 'react';
import { MapPin, Users, Video, ExternalLink, Clock, Check } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
  type: 'virtual' | 'in-person' | 'elite-only';
  location?: string;
  attendees: number;
  maxAttendees?: number;
  image?: string;
  rsvped?: boolean;
}

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Monthly Global Hangout',
    description: 'Casual virtual meetup with brothers from around the world. Share updates, ask questions, and connect.',
    date: '2025-02-27',
    time: '8:00 PM',
    timezone: 'UTC',
    type: 'virtual',
    attendees: 127,
  },
  {
    id: '2',
    title: 'Lisbon Meetup',
    description: 'In-person dinner and drinks for members in Portugal. Location shared with RSVPs.',
    date: '2025-03-15',
    time: '7:00 PM',
    timezone: 'WET',
    type: 'in-person',
    location: 'Lisbon, Portugal',
    attendees: 23,
    maxAttendees: 30,
  },
  {
    id: '3',
    title: 'ELITE Strategy Session',
    description: 'Monthly closed-door session for ELITE members. Topic: Tax Optimization Strategies for 2025.',
    date: '2025-02-20',
    time: '6:00 PM',
    timezone: 'UTC',
    type: 'elite-only',
    attendees: 45,
  },
  {
    id: '4',
    title: 'Bangkok Nomad Dinner',
    description: 'Monthly gathering in Sukhumvit. Network with fellow nomads and share city intel.',
    date: '2025-04-20',
    time: '7:00 PM',
    timezone: 'ICT',
    type: 'in-person',
    location: 'Bangkok, Thailand',
    attendees: 18,
    maxAttendees: 25,
  },
  {
    id: '5',
    title: 'Mexico City Meetup',
    description: 'Taco tour through Roma Norte followed by drinks. Perfect for newcomers to CDMX.',
    date: '2025-03-08',
    time: '6:30 PM',
    timezone: 'CST',
    type: 'in-person',
    location: 'Mexico City, Mexico',
    attendees: 31,
    maxAttendees: 40,
  },
  {
    id: '6',
    title: 'Virtual: Banking Offshore',
    description: 'Expert panel on international banking options. Q&A session included.',
    date: '2025-03-05',
    time: '7:00 PM',
    timezone: 'UTC',
    type: 'virtual',
    attendees: 89,
  },
];

const Events = () => {
  const [filter, setFilter] = useState<'all' | 'virtual' | 'in-person' | 'elite-only'>('all');
  const [events, setEvents] = useState(EVENTS);

  const filteredEvents = events.filter(e => filter === 'all' || e.type === filter);

  const handleRSVP = (eventId: string) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, rsvped: !e.rsvped, attendees: e.rsvped ? e.attendees - 1 : e.attendees + 1 } : e
    ));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Events
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Virtual calls, city meetups, and ELITE-only sessions. Connect with brothers worldwide.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['all', 'virtual', 'in-person', 'elite-only'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-gold text-charcoal'
                  : 'bg-charcoal-light text-ivory/70 hover:text-ivory'
              }`}
            >
              {f === 'elite-only' ? 'ELITE Only' : f}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card-dark p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Date Badge */}
                <div className="flex-shrink-0 w-20 h-20 bg-gold/10 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-gold text-xs uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-gold text-2xl font-bold">
                    {new Date(event.date).getDate()}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.type === 'virtual' 
                        ? 'bg-blue-900/30 text-blue-400'
                        : event.type === 'elite-only'
                        ? 'bg-purple-900/30 text-purple-400'
                        : 'bg-green-900/30 text-green-400'
                    }`}>
                      {event.type === 'virtual' && <Video className="w-3 h-3 inline mr-1" />}
                      {event.type === 'in-person' && <MapPin className="w-3 h-3 inline mr-1" />}
                      {event.type === 'elite-only' && '👑 '}
                      {event.type}
                    </span>
                    {event.maxAttendees && (
                      <span className="text-xs text-ivory/50">
                        {event.attendees}/{event.maxAttendees} spots
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl text-ivory mb-2">{event.title}</h2>
                  <p className="text-ivory/70 mb-4">{event.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-ivory/60 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(event.date)} at {event.time} {event.timezone}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees} attending
                    </span>
                  </div>
                </div>

                {/* RSVP Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleRSVP(event.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      event.rsvped
                        ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                        : 'bg-gold text-charcoal hover:shadow-gold'
                    }`}
                  >
                    {event.rsvped ? (
                      <>
                        <Check className="w-4 h-4 inline mr-1" />
                        RSVPed
                      </>
                    ) : (
                      'RSVP'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Events */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ivory/50">No events found for this filter.</p>
          </div>
        )}

        {/* Host Event CTA */}
        <div className="mt-12 card-dark p-8 border-gold/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl text-gold mb-2">Host a Meetup</h3>
              <p className="text-ivory/70">
                Want to organize an event in your city? We provide support and promotion.
              </p>
            </div>
            <a 
              href="mailto:events@brothersofthepassport.com" 
              className="btn-gold whitespace-nowrap flex items-center gap-2"
            >
              Apply to Host
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
