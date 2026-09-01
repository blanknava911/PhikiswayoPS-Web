import { NoticeItem } from '../types';
import { supabase } from './supabase';

const LOCAL_NOTICES_KEY = 'phikiswayo_admin_notices';

export function getLocalNotices(): (NoticeItem & { published?: boolean })[] | null {
  try {
    const raw = localStorage.getItem(LOCAL_NOTICES_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveLocalNotices(notices: (NoticeItem & { published?: boolean })[]): void {
  try {
    localStorage.setItem(LOCAL_NOTICES_KEY, JSON.stringify(notices));
  } catch (err) {
    console.error('Failed to save notices locally:', err);
  }
}

export async function fetchLiveNotices(): Promise<NoticeItem[] | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('id,title,published_at,category,summary,audience,pinned')
        .eq('published', true)
        .order('pinned', { ascending: false })
        .order('published_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((notice) => ({
          id: notice.id,
          title: notice.title,
          date: notice.published_at,
          category: notice.category,
          summary: notice.summary,
          audience: notice.audience,
          pinned: notice.pinned,
        }));
      }
    } catch {
      // Fallback to local storage if Supabase query fails
    }
  }

  const local = getLocalNotices();
  if (local && local.length > 0) {
    return local.filter((n) => n.published !== false);
  }

  return null;
}
