import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock
} from 'lucide-react';

type EventCategory = 'all' | 'academic' | 'sports' | 'meetings';

interface SchoolEvent {
  id: string;
  title: string;
  category: 'academic' | 'sports' | 'meetings';
  categoryLabel: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

const EVENTS_DATA: SchoolEvent[] = [
  {
    id: '1',
    title: 'Term 3 Formal Assessments',
    category: 'academic',
    categoryLabel: 'Academic',
    date: 'Sept 15, 2026',
    time: '08:00 – 14:00',
    location: 'Main Academic Block',
    description: 'Foundational literacy, numeracy, and life skills formal assessments for Grades R through 7.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    title: 'Annual Inter-House Sports Day',
    category: 'sports',
    categoryLabel: 'Sports',
    date: 'Oct 24, 2026',
    time: '09:00 – 15:00',
    location: 'Phikiswayo Sports Field',
    description: 'Track and field athletics, soccer derby, netball tournaments, and traditional Zulu cultural dance.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    title: 'General SGB & Parent Meeting',
    category: 'meetings',
    categoryLabel: 'Parent Meetings',
    date: 'Nov 12, 2026',
    time: '14:00 – 16:30',
    location: 'School Community Hall',
    description: 'Quarterly parent gathering to review learner academic milestones, school safety, and infrastructure projects.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    title: 'Foundation Reading Festival',
    category: 'academic',
    categoryLabel: 'Academic',
    date: 'Nov 20, 2026',
    time: '10:00 – 13:00',
    location: 'Reading & Literacy Hub',
    description: 'Spelling bees, isiZulu and English storytelling celebrations for Grades R, 1, 2, and 3 learners.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    title: 'Ntuzuma Primary Schools Derby',
    category: 'sports',
    categoryLabel: 'Sports',
    date: 'Dec 02, 2026',
    time: '13:30 – 16:00',
    location: 'Ntuzuma Sports Complex',
    description: 'Friendly under-11 and under-13 soccer and netball matches competing with neighboring circuit schools.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    title: 'Grade 7 Farewell & Awards Day',
    category: 'meetings',
    categoryLabel: 'Parent Meetings',
    date: 'Dec 09, 2026',
    time: '09:30 – 13:00',
    location: 'Main School Hall',
    description: 'Ceremony celebrating graduating Grade 7 learners and academic excellence prize-giving with parents.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
  }
];

export const EventsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');

  const filteredEvents = activeCategory === 'all' 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(e => e.category === activeCategory);

  return (
    <section className="py-20 bg-white" id="events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="events-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
            Calendar & Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
            School Events & Activities
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Keep track of academic assessment weeks, sports fixtures, and parent meetings at Phikiswayo Primary.
          </p>
        </div>

        {/* Tabbed Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" id="events-filter-buttons">
          
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-neutral-100 text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-all"
          >
            All Events
          </button>

          <button
            onClick={() => setActiveCategory('academic')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm cursor-pointer ${
              activeCategory === 'academic'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-neutral-100 text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-academic"
          >
            Academic
          </button>

          <button
            onClick={() => setActiveCategory('sports')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm cursor-pointer ${
              activeCategory === 'sports'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-neutral-100 text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-sports"
          >
            Sports
          </button>

          <button
            onClick={() => setActiveCategory('meetings')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm cursor-pointer ${
              activeCategory === 'meetings'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-neutral-100 text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-meetings"
          >
            Parent Meetings
          </button>

        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="events-grid">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="bg-neutral-50 border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              id={`event-card-${event.id}`}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden bg-neutral-800">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                
                {/* Date Badge */}
                <div className="absolute top-3 left-3 bg-[#ff2121] text-white px-3 py-1 rounded-md text-xs font-extrabold shadow-md flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{event.date}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                  {event.categoryLabel}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#ff2121] transition-colors mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/80 space-y-1 text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5 text-[#ff2121] font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
