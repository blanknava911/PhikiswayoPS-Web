import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarPlus,
  CheckCircle2,
  LockKeyhole,
  LogOut,
  Megaphone,
  RefreshCw,
  Save,
  Trash2,
  Sparkles,
  ShieldCheck,
  Database
} from 'lucide-react';
import { EventItem, NoticeItem } from '../types';
import { ADMIN_EMAILS, supabase } from '../utils/supabase';
import { getLocalNotices, saveLocalNotices } from '../utils/notices';
import { getLocalEvents, saveLocalEvents } from '../utils/events';
import { SCHOOL_NOTICES, SCHOOL_EVENTS } from '../data/schoolData';

type AdminMode = 'notices' | 'events';

type AdminNotice = NoticeItem & {
  published: boolean;
};

type AdminEvent = EventItem & {
  published: boolean;
};

const emptyNotice: Omit<AdminNotice, 'id'> = {
  title: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'general',
  summary: '',
  audience: 'Parents and guardians',
  pinned: false,
  published: true,
};

const emptyEvent: Omit<AdminEvent, 'id'> = {
  title: '',
  category: 'academic',
  categoryLabel: 'Academic',
  date: new Date().toISOString().slice(0, 10),
  time: '08:00',
  location: 'Phikiswayo Primary School',
  description: '',
  imageUrl: '',
  published: true,
};

const fieldClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-[#ff2121] focus:ring-2 focus:ring-red-100';
const labelClass = 'text-xs font-extrabold uppercase tracking-wider text-neutral-600';

const SESSION_STORAGE_KEY = 'phikiswayo_admin_session';

export const AdminSection: React.FC = () => {
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => {
    return localStorage.getItem(SESSION_STORAGE_KEY) || null;
  });
  const [inputEmail, setInputEmail] = useState('');
  const [mode, setMode] = useState<AdminMode>('notices');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState<AdminNotice[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [noticeForm, setNoticeForm] = useState<AdminNotice | Omit<AdminNotice, 'id'>>(emptyNotice);
  const [eventForm, setEventForm] = useState<AdminEvent | Omit<AdminEvent, 'id'>>(emptyEvent);

  const isAllowedAdmin = Boolean(
    sessionEmail &&
      ADMIN_EMAILS.some((email) => email.toLowerCase() === sessionEmail.toLowerCase())
  );
  const adminList = ADMIN_EMAILS.join(' or ');

  const loadContent = useCallback(async () => {
    if (!isAllowedAdmin) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      let loadedNotices: AdminNotice[] = [];
      let loadedEvents: AdminEvent[] = [];

      // 1. Attempt loading from Supabase if configured
      if (supabase) {
        try {
          const [noticesRes, eventsRes] = await Promise.all([
            supabase
              .from('notices')
              .select('id,title,published_at,category,summary,audience,pinned,published')
              .order('pinned', { ascending: false })
              .order('published_at', { ascending: false }),
            supabase
              .from('events')
              .select('id,title,category,category_label,event_date,event_time,location,description,image_url,published')
              .order('event_date', { ascending: true }),
          ]);

          if (!noticesRes.error && noticesRes.data) {
            loadedNotices = noticesRes.data.map((n) => ({
              id: n.id,
              title: n.title,
              date: n.published_at,
              category: n.category,
              summary: n.summary,
              audience: n.audience,
              pinned: Boolean(n.pinned),
              published: Boolean(n.published),
            }));
          }

          if (!eventsRes.error && eventsRes.data) {
            loadedEvents = eventsRes.data.map((e) => ({
              id: e.id,
              title: e.title,
              category: e.category,
              categoryLabel: e.category_label,
              date: e.event_date,
              time: e.event_time,
              location: e.location,
              description: e.description,
              imageUrl: e.image_url || '',
              published: Boolean(e.published),
            }));
          }
        } catch {
          // Supabase network error fallback
        }
      }

      // 2. Local storage fallback
      if (loadedNotices.length === 0) {
        const local = getLocalNotices();
        if (local && local.length > 0) {
          loadedNotices = local.map((n) => ({
            ...n,
            published: n.published ?? true,
          }));
        }
      }

      if (loadedEvents.length === 0) {
        const local = getLocalEvents();
        if (local && local.length > 0) {
          loadedEvents = local.map((e) => ({
            ...e,
            published: e.published ?? true,
          }));
        }
      }

      setNotices(loadedNotices);
      setEvents(loadedEvents);
    } catch (err) {
      console.error('Error loading admin content:', err);
      setError('Could not load notices or events.');
    } finally {
      setLoading(false);
    }
  }, [isAllowedAdmin]);

  useEffect(() => {
    if (isAllowedAdmin) {
      loadContent();
    }
  }, [isAllowedAdmin, loadContent]);

  const selectedNoticeId = 'id' in noticeForm ? noticeForm.id : null;
  const selectedEventId = 'id' in eventForm ? eventForm.id : null;

  const statusText = useMemo(() => {
    if (!sessionEmail) return 'Admin login required';
    if (!isAllowedAdmin) return 'Signed in account not authorized';
    return supabase ? 'Supabase Connected (Admin)' : 'Admin Portal Active';
  }, [isAllowedAdmin, sessionEmail]);

  const handleAdminSignIn = (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = inputEmail.trim().toLowerCase();
    if (!cleanEmail) return;

    if (ADMIN_EMAILS.some((adm) => adm.toLowerCase() === cleanEmail)) {
      setSessionEmail(cleanEmail);
      localStorage.setItem(SESSION_STORAGE_KEY, cleanEmail);
      setMessage(`Welcome back, administrator (${cleanEmail})!`);
      setError('');
    } else {
      setError(`The email "${cleanEmail}" is not authorized. Please sign in with ${adminList}.`);
    }
  };

  const handleSignOut = () => {
    setSessionEmail(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setMessage('Successfully signed out.');
    setError('');
  };

  const seedDefaultData = async () => {
    if (!isAllowedAdmin) return;
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const formattedNotices: AdminNotice[] = SCHOOL_NOTICES.map((notice, idx) => ({
        id: `notice-${Date.now()}-${idx}`,
        title: notice.title,
        date: notice.date.includes('2026') ? '2026-09-15' : '2026-09-01',
        category: notice.category,
        summary: notice.summary,
        audience: notice.audience,
        pinned: Boolean(notice.pinned),
        published: true,
      }));

      const formattedEvents: AdminEvent[] = SCHOOL_EVENTS.map((event, idx) => ({
        id: `event-${Date.now()}-${idx}`,
        title: event.title,
        category: event.category === 'community' ? 'meetings' : event.category,
        categoryLabel: event.badge || 'School Event',
        date: event.date.includes('October')
          ? '2026-10-24'
          : event.date.includes('November 12')
          ? '2026-11-12'
          : event.date.includes('November 20')
          ? '2026-11-20'
          : '2026-09-15',
        time: event.time,
        location: event.location,
        description: event.description,
        imageUrl: event.image,
        published: true,
      }));

      saveLocalNotices(formattedNotices);
      saveLocalEvents(formattedEvents);

      if (supabase) {
        try {
          await supabase.from('notices').insert(
            formattedNotices.map((n) => ({
              id: n.id,
              title: n.title,
              published_at: n.date,
              category: n.category,
              summary: n.summary,
              audience: n.audience,
              pinned: n.pinned,
              published: n.published,
            }))
          );
          await supabase.from('events').insert(
            formattedEvents.map((e) => ({
              id: e.id,
              title: e.title,
              category: e.category,
              category_label: e.categoryLabel,
              event_date: e.date,
              event_time: e.time,
              location: e.location,
              description: e.description,
              image_url: e.imageUrl,
              published: e.published,
            }))
          );
        } catch {
          // Ignore remote write error on demo mode
        }
      }

      setNotices(formattedNotices);
      setEvents(formattedEvents);
      setMessage('Default school notices and events successfully imported!');
    } catch (err) {
      console.error('Seed error:', err);
      setError('Failed to seed initial data.');
    } finally {
      setLoading(false);
    }
  };

  const saveNotice = async (event: FormEvent) => {
    event.preventDefault();
    if (!isAllowedAdmin) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const noticeId = selectedNoticeId || `notice-${Date.now()}`;
      const newNotice: AdminNotice = {
        id: noticeId,
        title: noticeForm.title.trim(),
        date: noticeForm.date,
        category: noticeForm.category,
        summary: noticeForm.summary.trim(),
        audience: noticeForm.audience.trim(),
        pinned: Boolean(noticeForm.pinned),
        published: Boolean(noticeForm.published),
      };

      const updatedNotices = selectedNoticeId
        ? notices.map((n) => (n.id === selectedNoticeId ? newNotice : n))
        : [newNotice, ...notices];

      setNotices(updatedNotices);
      saveLocalNotices(updatedNotices);

      if (supabase) {
        try {
          await supabase.from('notices').upsert({
            id: newNotice.id,
            title: newNotice.title,
            published_at: newNotice.date,
            category: newNotice.category,
            summary: newNotice.summary,
            audience: newNotice.audience,
            pinned: newNotice.pinned,
            published: newNotice.published,
          });
        } catch {
          // local fallback preserved
        }
      }

      setMessage(selectedNoticeId ? 'Notice updated successfully.' : 'New notice published!');
      setNoticeForm(emptyNotice);
    } catch (err) {
      console.error('Save notice error:', err);
      setError('Notice could not be saved.');
    } finally {
      setLoading(false);
    }
  };

  const saveEvent = async (event: FormEvent) => {
    event.preventDefault();
    if (!isAllowedAdmin) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const eventId = selectedEventId || `event-${Date.now()}`;
      const newEvent: AdminEvent = {
        id: eventId,
        title: eventForm.title.trim(),
        category: eventForm.category,
        categoryLabel: eventForm.categoryLabel.trim(),
        date: eventForm.date,
        time: eventForm.time.trim(),
        location: eventForm.location.trim(),
        description: eventForm.description.trim(),
        imageUrl: eventForm.imageUrl?.trim() || '',
        published: Boolean(eventForm.published),
      };

      const updatedEvents = selectedEventId
        ? events.map((e) => (e.id === selectedEventId ? newEvent : e))
        : [...events, newEvent];

      setEvents(updatedEvents);
      saveLocalEvents(updatedEvents);

      if (supabase) {
        try {
          await supabase.from('events').upsert({
            id: newEvent.id,
            title: newEvent.title,
            category: newEvent.category,
            category_label: newEvent.categoryLabel,
            event_date: newEvent.date,
            event_time: newEvent.time,
            location: newEvent.location,
            description: newEvent.description,
            image_url: newEvent.imageUrl,
            published: newEvent.published,
          });
        } catch {
          // local fallback preserved
        }
      }

      setMessage(selectedEventId ? 'Event updated successfully.' : 'New event published!');
      setEventForm(emptyEvent);
    } catch (err) {
      console.error('Save event error:', err);
      setError('Event could not be saved.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNotice = async (id: string) => {
    if (!isAllowedAdmin) return;
    if (!window.confirm('Are you sure you want to delete this notice?')) return;

    setLoading(true);
    try {
      const updated = notices.filter((n) => n.id !== id);
      setNotices(updated);
      saveLocalNotices(updated);

      if (supabase) {
        try {
          await supabase.from('notices').delete().eq('id', id);
        } catch {
          // ignore
        }
      }

      setMessage('Notice deleted.');
      if (selectedNoticeId === id) {
        setNoticeForm(emptyNotice);
      }
    } catch (err) {
      console.error('Delete notice error:', err);
      setError('Notice could not be deleted.');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!isAllowedAdmin) return;
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    setLoading(true);
    try {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      saveLocalEvents(updated);

      if (supabase) {
        try {
          await supabase.from('events').delete().eq('id', id);
        } catch {
          // ignore
        }
      }

      setMessage('Event deleted.');
      if (selectedEventId === id) {
        setEventForm(emptyEvent);
      }
    } catch (err) {
      console.error('Delete event error:', err);
      setError('Event could not be deleted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F9F9F9] py-16" id="admin-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#ff2121]">
              <LockKeyhole className="h-4 w-4" />
              School Administration
            </span>
            <h2 className="font-display text-3xl font-extrabold text-neutral-950 sm:text-4xl">
              School Management Portal
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Publish and manage official school announcements, parent circulars, and calendar events.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-700 shadow-sm">
            {isAllowedAdmin ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-[#ff2121]" />
            )}
            <span>{statusText}</span>
          </div>
        </div>

        {/* Login Box */}
        {!sessionEmail && (
          <div className="max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#ff2121]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold text-neutral-950">
                  School Admin Sign In
                </h3>
                <p className="text-xs text-neutral-500">
                  Authorized accounts: <strong>{adminList}</strong>
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleAdminSignIn} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="admin-email-input">
                  Administrator Email
                </label>
                <input
                  id="admin-email-input"
                  type="email"
                  className={`${fieldClass} mt-1`}
                  placeholder="e.g. blanknava205@gmail.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff2121] px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                <LockKeyhole className="h-4 w-4" />
                <span>Access Management Portal</span>
              </button>

              <div className="flex flex-wrap gap-2 pt-2 text-xs text-neutral-500">
                <span>Quick Fill:</span>
                {ADMIN_EMAILS.map((email) => (
                  <button
                    key={email}
                    type="button"
                    onClick={() => setInputEmail(email)}
                    className="underline text-[#ff2121] font-semibold hover:text-red-800 cursor-pointer"
                  >
                    {email}
                  </button>
                ))}
              </div>
            </form>
          </div>
        )}

        {/* Access Blocked Warning */}
        {sessionEmail && !isAllowedAdmin && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900 max-w-xl">
            <h3 className="mb-2 font-display text-xl font-extrabold">Unauthorized Account</h3>
            <p className="leading-relaxed">
              Signed in as <strong>{sessionEmail}</strong>. Only <strong>{adminList}</strong> have administrator permissions for Phikiswayo Primary School.
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 text-xs font-extrabold text-white cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out & Switch Account
            </button>
          </div>
        )}

        {/* Admin Dashboard */}
        {isAllowedAdmin && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar Controls */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-5">
                <div className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <p className="text-xs font-bold text-neutral-500">Active Administrator</p>
                    <p className="text-sm font-extrabold text-neutral-950 truncate max-w-[180px]">{sessionEmail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setMode('notices'); setMessage(''); setError(''); }}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-extrabold cursor-pointer transition ${
                      mode === 'notices' ? 'bg-[#ff2121] text-white shadow-sm' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <Megaphone className="h-4 w-4" />
                    Notices ({notices.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('events'); setMessage(''); setError(''); }}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-extrabold cursor-pointer transition ${
                      mode === 'events' ? 'bg-[#ff2121] text-white shadow-sm' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Events ({events.length})
                  </button>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={loadContent}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-extrabold text-neutral-700 hover:bg-neutral-50 disabled:opacity-60 cursor-pointer"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Content
                  </button>

                  <button
                    type="button"
                    onClick={seedDefaultData}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-extrabold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    Seed Default School Content
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="lg:col-span-8">
              {(message || error) && (
                <div
                  className={`mb-5 rounded-lg border px-4 py-3 text-sm font-semibold flex items-center justify-between ${
                    error
                      ? 'border-red-200 bg-red-50 text-red-800'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  }`}
                >
                  <span>{error || message}</span>
                  <button
                    type="button"
                    onClick={() => { setMessage(''); setError(''); }}
                    className="text-xs font-bold underline ml-3"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Mode: Notices */}
              {mode === 'notices' && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <form onSubmit={saveNotice} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-5 font-display text-2xl font-extrabold text-neutral-950">
                      {selectedNoticeId ? 'Edit Notice' : 'New School Notice'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass} htmlFor="notice-title">Notice Title</label>
                        <input
                          id="notice-title"
                          className={`${fieldClass} mt-1`}
                          value={noticeForm.title}
                          onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                          placeholder="e.g. Term 1 Parent General Meeting"
                          required
                          minLength={3}
                          maxLength={200}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="notice-date">Date</label>
                          <input
                            id="notice-date"
                            type="date"
                            className={`${fieldClass} mt-1`}
                            value={noticeForm.date}
                            onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="notice-category">Category</label>
                          <select
                            id="notice-category"
                            className={`${fieldClass} mt-1`}
                            value={noticeForm.category}
                            onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as NoticeItem['category'] })}
                          >
                            <option value="general">General</option>
                            <option value="admissions">Admissions</option>
                            <option value="academic">Academic</option>
                            <option value="events">Events</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="notice-audience">Target Audience</label>
                        <input
                          id="notice-audience"
                          className={`${fieldClass} mt-1`}
                          value={noticeForm.audience}
                          onChange={(e) => setNoticeForm({ ...noticeForm, audience: e.target.value })}
                          placeholder="e.g. All Grade R - 7 Parents"
                          required
                          minLength={2}
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="notice-summary">Announcement Content</label>
                        <textarea
                          id="notice-summary"
                          className={`${fieldClass} mt-1 min-h-28`}
                          value={noticeForm.summary}
                          onChange={(e) => setNoticeForm({ ...noticeForm, summary: e.target.value })}
                          placeholder="Provide details about the notice..."
                          required
                          minLength={5}
                          maxLength={2000}
                        />
                      </div>
                      <div className="flex flex-wrap gap-5 text-sm font-semibold text-neutral-700">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(noticeForm.pinned)}
                            onChange={(e) => setNoticeForm({ ...noticeForm, pinned: e.target.checked })}
                            className="rounded text-[#ff2121] focus:ring-[#ff2121]"
                          />
                          Pin to top
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(noticeForm.published)}
                            onChange={(e) => setNoticeForm({ ...noticeForm, published: e.target.checked })}
                            className="rounded text-[#ff2121] focus:ring-[#ff2121]"
                          />
                          Published (Visible on site)
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#ff2121] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60 cursor-pointer shadow-sm hover:bg-red-700 transition"
                        >
                          <Save className="h-4 w-4" />
                          Save Notice
                        </button>
                        <button
                          type="button"
                          onClick={() => setNoticeForm(emptyNotice)}
                          className="rounded-lg border border-neutral-200 px-5 py-3 text-sm font-extrabold text-neutral-700 hover:bg-neutral-50 cursor-pointer transition"
                        >
                          Clear Form
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Notices List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
                      School Notices ({notices.length})
                    </h4>
                    {notices.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
                        No notices found yet. Use the form to create one or click &ldquo;Seed Default School Content&rdquo;.
                      </div>
                    ) : (
                      notices.map((notice) => (
                        <article key={notice.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-extrabold uppercase text-[#ff2121]">{notice.category}</span>
                                {notice.pinned && (
                                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-800">
                                    Pinned
                                  </span>
                                )}
                              </div>
                              <h4 className="font-display text-base font-extrabold text-neutral-950">{notice.title}</h4>
                              <p className="text-xs text-neutral-500">{notice.date} • {notice.audience}</p>
                            </div>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                notice.published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {notice.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="mb-3 text-xs text-neutral-600 line-clamp-2">{notice.summary}</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setNoticeForm(notice)}
                              className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-extrabold text-neutral-700 hover:bg-neutral-200 cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteNotice(notice.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-extrabold text-red-700 hover:bg-red-100 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Mode: Events */}
              {mode === 'events' && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <form onSubmit={saveEvent} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-5 font-display text-2xl font-extrabold text-neutral-950">
                      {selectedEventId ? 'Edit Event' : 'New School Event'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass} htmlFor="event-title">Event Title</label>
                        <input
                          id="event-title"
                          className={`${fieldClass} mt-1`}
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="e.g. Grade 7 Inter-School Athletics"
                          required
                          minLength={3}
                          maxLength={200}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="event-date">Date</label>
                          <input
                            id="event-date"
                            type="date"
                            className={`${fieldClass} mt-1`}
                            value={eventForm.date}
                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="event-time">Time</label>
                          <input
                            id="event-time"
                            type="text"
                            className={`${fieldClass} mt-1`}
                            value={eventForm.time}
                            onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                            placeholder="e.g. 08:30 - 13:00"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="event-category">Category</label>
                          <select
                            id="event-category"
                            className={`${fieldClass} mt-1`}
                            value={eventForm.category}
                            onChange={(e) => {
                              const category = e.target.value as EventItem['category'];
                              const labels = {
                                academic: 'Academic Assessment',
                                sports: 'Sports & Athletics',
                                meetings: 'Parent Meetings',
                              };
                              setEventForm({
                                ...eventForm,
                                category,
                                categoryLabel: labels[category] || 'School Event',
                              });
                            }}
                          >
                            <option value="academic">Academic</option>
                            <option value="sports">Sports</option>
                            <option value="meetings">Parent Meetings</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="event-label">Display Badge</label>
                          <input
                            id="event-label"
                            className={`${fieldClass} mt-1`}
                            value={eventForm.categoryLabel}
                            onChange={(e) => setEventForm({ ...eventForm, categoryLabel: e.target.value })}
                            placeholder="e.g. Sports & Athletics"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-location">Location / Venue</label>
                        <input
                          id="event-location"
                          className={`${fieldClass} mt-1`}
                          value={eventForm.location}
                          onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                          placeholder="e.g. Phikiswayo School Grounds"
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-image">Banner Image URL</label>
                        <input
                          id="event-image"
                          type="text"
                          className={`${fieldClass} mt-1`}
                          value={eventForm.imageUrl}
                          onChange={(e) => setEventForm({ ...eventForm, imageUrl: e.target.value })}
                          placeholder="https://... or school-sports.jpg"
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-description">Event Details & Description</label>
                        <textarea
                          id="event-description"
                          className={`${fieldClass} mt-1 min-h-28`}
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Describe the activities, schedule, and learner preparations..."
                          required
                          minLength={5}
                          maxLength={3000}
                        />
                      </div>
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(eventForm.published)}
                          onChange={(e) => setEventForm({ ...eventForm, published: e.target.checked })}
                          className="rounded text-[#ff2121] focus:ring-[#ff2121]"
                        />
                        Published (Visible on site)
                      </label>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#ff2121] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60 cursor-pointer shadow-sm hover:bg-red-700 transition"
                        >
                          <Save className="h-4 w-4" />
                          Save Event
                        </button>
                        <button
                          type="button"
                          onClick={() => setEventForm(emptyEvent)}
                          className="rounded-lg border border-neutral-200 px-5 py-3 text-sm font-extrabold text-neutral-700 hover:bg-neutral-50 cursor-pointer transition"
                        >
                          Clear Form
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Events List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
                      School Events ({events.length})
                    </h4>
                    {events.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
                        No events found yet. Use the form to create one or click &ldquo;Seed Default School Content&rdquo;.
                      </div>
                    ) : (
                      events.map((schoolEvent) => (
                        <article key={schoolEvent.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[11px] font-extrabold uppercase text-[#ff2121]">
                                {schoolEvent.categoryLabel || schoolEvent.category}
                              </p>
                              <h4 className="font-display text-base font-extrabold text-neutral-950">{schoolEvent.title}</h4>
                              <p className="text-xs text-neutral-500">{schoolEvent.date} • {schoolEvent.time} • {schoolEvent.location}</p>
                            </div>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                schoolEvent.published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {schoolEvent.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="mb-3 text-xs text-neutral-600 line-clamp-2">{schoolEvent.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setEventForm(schoolEvent)}
                              className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-extrabold text-neutral-700 hover:bg-neutral-200 cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteEvent(schoolEvent.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-extrabold text-red-700 hover:bg-red-100 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
