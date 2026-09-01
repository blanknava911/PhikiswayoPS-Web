import React, { useEffect, useState } from 'react';
import { AlertCircle, CalendarDays, Megaphone, Newspaper } from 'lucide-react';
import { SCHOOL_NOTICES } from '../data/schoolData';
import { NoticeItem } from '../types';
import { fetchLiveNotices } from '../utils/notices';

const categoryStyles: Record<NoticeItem['category'], string> = {
  general: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  admissions: 'bg-red-50 text-[#ff2121] border-red-200',
  academic: 'bg-blue-50 text-blue-700 border-blue-200',
  events: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export const NewsSection: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>(SCHOOL_NOTICES);
  const [liveNoticeError, setLiveNoticeError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchLiveNotices()
      .then((liveNotices) => {
        if (isMounted && liveNotices !== null) {
          setNotices(liveNotices);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLiveNoticeError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-[#F9F9F9]" id="news-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12" id="news-header">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
              <Newspaper className="w-4 h-4" />
              News & Notices
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
              Latest School Announcements
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base">
              Important updates for parents, guardians, learners, and the wider Phikiswayo Primary School community.
            </p>
          </div>

          {liveNoticeError && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
              <AlertCircle className="w-4 h-4" />
              <span>Showing saved notices while live notices are unavailable.</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="notices-grid">
          {notices.map((notice) => (
            <article
              key={notice.id}
              className={`bg-white border rounded-2xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                notice.pinned ? 'border-[#ff2121]/50' : 'border-neutral-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${categoryStyles[notice.category]}`}>
                  {notice.category}
                </span>
                {notice.pinned && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-bold text-white">
                    <Megaphone className="w-3 h-3 text-[#ff4d4d]" />
                    Pinned
                  </span>
                )}
              </div>

              <h3 className="text-xl font-extrabold text-neutral-900 font-display mb-3">
                {notice.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                {notice.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <CalendarDays className="w-4 h-4 text-[#ff2121]" />
                  {notice.date}
                </span>
                <span className="font-bold text-neutral-700">{notice.audience}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
