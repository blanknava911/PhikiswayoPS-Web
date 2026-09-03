import { NoticeItem } from '../types';
import { publicAssetPath } from './assets';

export async function fetchLiveNotices(): Promise<NoticeItem[] | null> {
  try {
    const response = await fetch(publicAssetPath('notices.json'), { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }

    const notices = await response.json();
    if (!Array.isArray(notices)) {
      return null;
    }

    return notices.filter((notice): notice is NoticeItem => (
      notice &&
      typeof notice.id === 'string' &&
      typeof notice.title === 'string' &&
      typeof notice.date === 'string' &&
      ['general', 'admissions', 'academic', 'events'].includes(notice.category) &&
      typeof notice.summary === 'string' &&
      typeof notice.audience === 'string' &&
      (notice.pinned === undefined || typeof notice.pinned === 'boolean')
    ));
  } catch {
    return null;
  }
}
