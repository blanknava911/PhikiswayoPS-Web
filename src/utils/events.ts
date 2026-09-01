import { EventItem } from '../types';
import { fetchFirebaseEvents } from './firebase';
import { supabase } from './supabase';

export async function fetchLiveEvents(): Promise<EventItem[] | null> {
  try {
    const firebaseEvents = await fetchFirebaseEvents(false);
    if (firebaseEvents && firebaseEvents.length > 0) {
      return firebaseEvents;
    }
  } catch (err) {
    console.warn('Firebase events fetch notice: falling back to Supabase/static data', err);
  }

  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('id,title,category,category_label,event_date,event_time,location,description,image_url')
      .eq('published', true)
      .order('event_date', { ascending: true });

    if (error) {
      throw error;
    }

    return data?.map((event) => ({
      id: event.id,
      title: event.title,
      category: event.category,
      categoryLabel: event.category_label,
      date: event.event_date,
      time: event.event_time,
      location: event.location,
      description: event.description,
      imageUrl: event.image_url,
    })) ?? null;
  } catch {
    return null;
  }
}

