import { NoticeItem } from '../types';
import { fetchFirebaseNotices } from './firebase';
import { supabase } from './supabase';

export async function fetchLiveNotices(): Promise<NoticeItem[] | null> {
  try {
    const firebaseNotices = await fetchFirebaseNotices(false);
    if (firebaseNotices && firebaseNotices.length > 0) {
      return firebaseNotices;
    }
  } catch (err) {
    console.warn('Firebase notices fetch notice: falling back to Supabase/static data', err);
  }

  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('notices')
      .select('id,title,published_at,category,summary,audience,pinned')
      .eq('published', true)
      .order('pinned', { ascending: false })
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data?.map((notice) => ({
      id: notice.id,
      title: notice.title,
      date: notice.published_at,
      category: notice.category,
      summary: notice.summary,
      audience: notice.audience,
      pinned: notice.pinned,
    })) ?? null;
  } catch {
    return null;
  }
}

