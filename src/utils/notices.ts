import { NoticeItem } from '../types';

export async function fetchLiveNotices(): Promise<NoticeItem[] | null> {
  const endpoint = import.meta.env.VITE_NOTICES_API_URL;

  if (!endpoint || !/^https:\/\//.test(endpoint)) {
    return null;
  }

  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Notices request failed with status ${response.status}`);
  }

  const notices = await response.json();
  return Array.isArray(notices) ? notices : null;
}
