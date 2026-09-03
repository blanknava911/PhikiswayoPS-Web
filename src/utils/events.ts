import { EventItem } from '../types';
import { publicAssetPath } from './assets';

export async function fetchLiveEvents(): Promise<EventItem[] | null> {
  try {
    const response = await fetch(publicAssetPath('events.json'), { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      return null;
    }

    return events.filter((event): event is EventItem => (
      event &&
      typeof event.id === 'string' &&
      typeof event.title === 'string' &&
      ['academic', 'sports', 'meetings'].includes(event.category) &&
      typeof event.categoryLabel === 'string' &&
      typeof event.date === 'string' &&
      typeof event.time === 'string' &&
      typeof event.location === 'string' &&
      typeof event.description === 'string' &&
      typeof event.imageUrl === 'string'
    ));
  } catch {
    return null;
  }
}
