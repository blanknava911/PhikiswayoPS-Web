import React, { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { TabType } from '../types';

interface CookieNoticeProps {
  setActiveTab: (tab: TabType) => void;
}

const storageKey = 'phikiswayo-cookie-notice-dismissed';

const hasDismissedNotice = () => {
  try {
    return window.localStorage.getItem(storageKey) === 'yes';
  } catch {
    return false;
  }
};

const saveDismissedNotice = () => {
  try {
    window.localStorage.setItem(storageKey, 'yes');
  } catch {
    // If browser storage is unavailable, closing the notice for this page view is enough.
  }
};

export const CookieNotice: React.FC<CookieNoticeProps> = ({ setActiveTab }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasDismissedNotice());
  }, []);

  const dismiss = () => {
    saveDismissedNotice();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-neutral-200 bg-white/95 px-4 py-4 shadow-2xl backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ff2121]">
            <Cookie className="h-5 w-5" />
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-700">
            This website does not use advertising cookies. It uses only essential browser storage to remember this notice and help the site work properly.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('cookies');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-extrabold text-neutral-700 hover:bg-neutral-50"
          >
            Read Notice
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center gap-2 rounded-lg bg-[#ff2121] px-4 py-2 text-xs font-extrabold text-white hover:bg-red-700"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close cookie notice"
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
