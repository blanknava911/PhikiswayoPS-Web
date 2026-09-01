import { NoticeItem } from '../types';
import { supabase } from './supabase';

export async function fetchLiveNotices(): Promise<NoticeItem[] | null> {
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
