import { EventItem } from '../types';
import { supabase } from './supabase';

export async function fetchLiveEvents(): Promise<EventItem[] | null> {
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
