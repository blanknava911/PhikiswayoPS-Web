import { EventItem } from '../types';
import { supabase } from './supabase';

const LOCAL_EVENTS_KEY = 'phikiswayo_admin_events';

export function getLocalEvents(): (EventItem & { published?: boolean })[] | null {
  try {
    const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveLocalEvents(events: (EventItem & { published?: boolean })[]): void {
  try {
    localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));
  } catch (err) {
    console.error('Failed to save events locally:', err);
  }
}

export async function fetchLiveEvents(): Promise<EventItem[] | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id,title,category,category_label,event_date,event_time,location,description,image_url')
        .eq('published', true)
        .order('event_date', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((event) => ({
          id: event.id,
          title: event.title,
          category: event.category,
          categoryLabel: event.category_label,
          date: event.event_date,
          time: event.event_time,
          location: event.location,
          description: event.description,
          imageUrl: event.image_url,
        }));
      }
    } catch {
      // Fallback to local storage if Supabase query fails
    }
  }

  const local = getLocalEvents();
  if (local && local.length > 0) {
    return local.filter((e) => e.published !== false);
  }

  return null;
}
