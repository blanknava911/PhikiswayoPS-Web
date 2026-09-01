import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, CalendarPlus, CheckCircle2, LockKeyhole, LogOut, Megaphone, RefreshCw, Save, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';
import { EventItem, NoticeItem } from '../types';
import { SCHOOL_EVENTS, SCHOOL_NOTICES } from '../data/schoolData';
import { ADMIN_EMAILS, isAdminEmail, isConfigured, supabase } from '../utils/supabase';

type AdminMode = 'notices' | 'events';
type AdminNotice = NoticeItem & { published: boolean };
type AdminEvent = EventItem & { published: boolean };

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

const fieldClass = 'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-[#ff2121] focus:ring-2 focus:ring-red-100';
const labelClass = 'text-xs font-extrabold uppercase tracking-wider text-neutral-600';

function mapNotice(notice: Record<string, unknown>): AdminNotice {
  return {
    id: String(notice.id),
    title: String(notice.title ?? ''),
    date: String(notice.published_at ?? ''),
    category: (notice.category as NoticeItem['category']) ?? 'general',
    summary: String(notice.summary ?? ''),
    audience: String(notice.audience ?? 'School community'),
    pinned: Boolean(notice.pinned),
    published: Boolean(notice.published),
  };
}

function mapEvent(event: Record<string, unknown>): AdminEvent {
  return {
    id: String(event.id),
    title: String(event.title ?? ''),
    category: (event.category as EventItem['category']) ?? 'academic',
    categoryLabel: String(event.category_label ?? 'Academic'),
    date: String(event.event_date ?? ''),
    time: String(event.event_time ?? '08:00'),
    location: String(event.location ?? 'Phikiswayo Primary School'),
    description: String(event.description ?? ''),
    imageUrl: String(event.image_url ?? ''),
    published: Boolean(event.published),
  };
}

export const AdminSection: React.FC = () => {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState(ADMIN_EMAILS[0]);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AdminMode>('notices');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState<AdminNotice[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [noticeForm, setNoticeForm] = useState<AdminNotice | Omit<AdminNotice, 'id'>>(emptyNotice);
  const [eventForm, setEventForm] = useState<AdminEvent | Omit<AdminEvent, 'id'>>(emptyEvent);

  const configured = isConfigured();
  const isAllowedAdmin = isAdminEmail(sessionEmail);
  const adminList = ADMIN_EMAILS.join(' or ');
  const selectedNoticeId = 'id' in noticeForm ? noticeForm.id : null;
  const selectedEventId = 'id' in eventForm ? eventForm.id : null;

  const loadContent = useCallback(async () => {
    if (!supabase || !isAllowedAdmin) return;

    setLoading(true);
    setError('');

    const [noticeResult, eventResult] = await Promise.all([
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

    if (noticeResult.error || eventResult.error) {
      setError('Could not load live content. Run the Supabase setup SQL, then try again.');
      setLoading(false);
      return;
    }

    setNotices((noticeResult.data ?? []).map((notice) => mapNotice(notice as Record<string, unknown>)));
    setEvents((eventResult.data ?? []).map((event) => mapEvent(event as Record<string, unknown>)));
    setLoading(false);
  }, [isAllowedAdmin]);

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAllowedAdmin) loadContent();
  }, [isAllowedAdmin, loadContent]);

  const statusText = useMemo(() => {
    if (!configured) return 'Supabase setup required';
    if (!sessionEmail) return 'Admin login required';
    if (!isAllowedAdmin) return 'Signed in account not authorized';
    return 'Supabase connected';
  }, [configured, isAllowedAdmin, sessionEmail]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;

    setLoading(true);
    setError('');
    setMessage('');

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password,
    });

    if (loginError) {
      setError('Login failed. Check that the admin user exists in Supabase Auth and that the password is correct.');
    } else {
      setMessage('Admin login successful.');
      setPassword('');
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase?.auth.signOut();
    setSessionEmail(null);
    setMessage('Successfully signed out.');
    setLoading(false);
  };

  const seedDefaultData = async () => {
    if (!supabase || !isAllowedAdmin) return;

    setLoading(true);
    setError('');
    setMessage('');

    const noticeRows = SCHOOL_NOTICES.map((notice) => ({
      title: notice.title,
      published_at: notice.id === 'notice-office-hours' ? '2026-09-01' : '2026-09-15',
      category: notice.category,
      summary: notice.summary,
      audience: notice.audience,
      pinned: Boolean(notice.pinned),
      published: true,
    }));

    const eventRows = SCHOOL_EVENTS.map((schoolEvent) => ({
      title: schoolEvent.title,
      category: schoolEvent.category === 'community' ? 'meetings' : schoolEvent.category,
      category_label: schoolEvent.badge || 'School Event',
      event_date: schoolEvent.date.includes('October')
        ? '2026-10-24'
        : schoolEvent.date.includes('November 12')
          ? '2026-11-12'
          : schoolEvent.date.includes('November 20')
            ? '2026-11-20'
            : schoolEvent.date.includes('December 02')
              ? '2026-12-02'
              : schoolEvent.date.includes('December 08')
                ? '2026-12-08'
                : '2026-09-15',
      event_time: schoolEvent.time,
      location: schoolEvent.location,
      description: schoolEvent.description,
      image_url: schoolEvent.image,
      published: true,
    }));

    const [noticeResult, eventResult] = await Promise.all([
      supabase.from('notices').insert(noticeRows),
      supabase.from('events').insert(eventRows),
    ]);

    if (noticeResult.error || eventResult.error) {
      setError('Default content could not be added. Check that the Supabase SQL setup has been run.');
    } else {
      setMessage('Default school notices and events were added to Supabase.');
      await loadContent();
    }

    setLoading(false);
  };

  const saveNotice = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase || !isAllowedAdmin) return;

    setLoading(true);
    setError('');
    setMessage('');

    const payload = {
      title: noticeForm.title.trim(),
      published_at: noticeForm.date,
      category: noticeForm.category,
      summary: noticeForm.summary.trim(),
      audience: noticeForm.audience.trim(),
      pinned: Boolean(noticeForm.pinned),
      published: Boolean(noticeForm.published),
    };

    const result = selectedNoticeId
      ? await supabase.from('notices').update(payload).eq('id', selectedNoticeId)
      : await supabase.from('notices').insert(payload);

    if (result.error) {
      setError('Notice could not be saved. Check Supabase permissions and table setup.');
    } else {
      setMessage(selectedNoticeId ? 'Notice updated successfully.' : 'New notice saved.');
      setNoticeForm(emptyNotice);
      await loadContent();
    }

    setLoading(false);
  };

  const saveEvent = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase || !isAllowedAdmin) return;

    setLoading(true);
    setError('');
    setMessage('');

    const payload = {
      title: eventForm.title.trim(),
      category: eventForm.category,
      category_label: eventForm.categoryLabel.trim(),
      event_date: eventForm.date,
      event_time: eventForm.time.trim(),
      location: eventForm.location.trim(),
      description: eventForm.description.trim(),
      image_url: eventForm.imageUrl.trim(),
      published: Boolean(eventForm.published),
    };

    const result = selectedEventId
      ? await supabase.from('events').update(payload).eq('id', selectedEventId)
      : await supabase.from('events').insert(payload);

    if (result.error) {
      setError('Event could not be saved. Check Supabase permissions and table setup.');
    } else {
      setMessage(selectedEventId ? 'Event updated successfully.' : 'New event saved.');
      setEventForm(emptyEvent);
      await loadContent();
    }

    setLoading(false);
  };

  const deleteNotice = async (id: string) => {
    if (!supabase || !isAllowedAdmin || !window.confirm('Are you sure you want to delete this notice?')) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('notices').delete().eq('id', id);
    setLoading(false);
    if (deleteError) {
      setError('Notice could not be deleted.');
      return;
    }
    setMessage('Notice deleted.');
    setNoticeForm(emptyNotice);
    await loadContent();
  };

  const deleteEvent = async (id: string) => {
    if (!supabase || !isAllowedAdmin || !window.confirm('Are you sure you want to delete this event?')) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('events').delete().eq('id', id);
    setLoading(false);
    if (deleteError) {
      setError('Event could not be deleted.');
      return;
    }
    setMessage('Event deleted.');
    setEventForm(emptyEvent);
    await loadContent();
  };

  return (
    <section className="bg-[#F9F9F9] py-16" id="admin-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#ff2121]">
              <LockKeyhole className="h-4 w-4" />
              Supabase Administration
            </span>
            <h2 className="font-display text-3xl font-extrabold text-neutral-950 sm:text-4xl">Live School Management Portal</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Manage live school notices and calendar events stored in Supabase.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-700 shadow-sm">
            {isAllowedAdmin ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-[#ff2121]" />}
            <span>{statusText}</span>
          </div>
        </div>

        {!configured && (
          <div className="max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            <h3 className="mb-2 font-display text-xl font-extrabold">Supabase setup needed</h3>
            <p className="leading-relaxed">
              Add the Supabase URL and publishable key, run <strong>supabase/schema.sql</strong> in the Supabase SQL editor, then create the approved admin users in Supabase Auth.
            </p>
          </div>
        )}

        {configured && !sessionEmail && (
          <form onSubmit={handleLogin} className="max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#ff2121]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold text-neutral-950">School Admin Login</h3>
                <p className="text-xs text-neutral-500">Approved admins: <strong>{adminList}</strong></p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="admin-email">Admin email</label>
                <select id="admin-email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} className={`${fieldClass} mt-1`}>
                  {ADMIN_EMAILS.map((email) => (
                    <option key={email} value={email}>{email}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="admin-password">Password</label>
                <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={`${fieldClass} mt-1`} autoComplete="current-password" required />
              </div>

              <button type="submit" disabled={loading} className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#ff2121] px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
                <LockKeyhole className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </div>
          </form>
        )}

        {configured && sessionEmail && !isAllowedAdmin && (
          <div className="max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
            <h3 className="mb-2 font-display text-xl font-extrabold">Unauthorized Account</h3>
            <p className="leading-relaxed">
              Signed in as <strong>{sessionEmail}</strong>. Only <strong>{adminList}</strong> have administrator permissions for Phikiswayo Primary School.
            </p>
            <button type="button" onClick={handleSignOut} className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 text-xs font-extrabold text-white">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}

        {isAllowedAdmin && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <p className="text-xs font-bold text-neutral-500">Authorized Admin</p>
                    <p className="max-w-[180px] truncate text-sm font-extrabold text-neutral-950">{sessionEmail}</p>
                  </div>
                  <button type="button" onClick={handleSignOut} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => { setMode('notices'); setMessage(''); setError(''); }} className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-extrabold transition ${mode === 'notices' ? 'bg-[#ff2121] text-white shadow-sm' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                    <Megaphone className="h-4 w-4" />
                    Notices ({notices.length})
                  </button>
                  <button type="button" onClick={() => { setMode('events'); setMessage(''); setError(''); }} className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-extrabold transition ${mode === 'events' ? 'bg-[#ff2121] text-white shadow-sm' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                    <CalendarPlus className="h-4 w-4" />
                    Events ({events.length})
                  </button>
                </div>

                <div className="space-y-2 border-t border-neutral-100 pt-2">
                  <button type="button" onClick={loadContent} disabled={loading} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-extrabold text-neutral-700 hover:bg-neutral-50 disabled:opacity-60">
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Supabase Data
                  </button>

                  {notices.length === 0 && events.length === 0 && (
                    <button type="button" onClick={seedDefaultData} disabled={loading} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-extrabold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60">
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                      Seed Default School Content
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              {(message || error) && (
                <div className={`mb-5 flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold ${error ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                  <span>{error || message}</span>
                  <button type="button" onClick={() => { setMessage(''); setError(''); }} className="ml-3 text-xs font-bold underline">Dismiss</button>
                </div>
              )}

              {mode === 'notices' && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <form onSubmit={saveNotice} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-5 font-display text-2xl font-extrabold text-neutral-950">{selectedNoticeId ? 'Edit Notice' : 'New School Notice'}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass} htmlFor="notice-title">Notice Title</label>
                        <input id="notice-title" className={`${fieldClass} mt-1`} value={noticeForm.title} onChange={(event) => setNoticeForm({ ...noticeForm, title: event.target.value })} required minLength={3} maxLength={200} />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="notice-date">Date</label>
                          <input id="notice-date" type="date" className={`${fieldClass} mt-1`} value={noticeForm.date} onChange={(event) => setNoticeForm({ ...noticeForm, date: event.target.value })} required />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="notice-category">Category</label>
                          <select id="notice-category" className={`${fieldClass} mt-1`} value={noticeForm.category} onChange={(event) => setNoticeForm({ ...noticeForm, category: event.target.value as NoticeItem['category'] })}>
                            <option value="general">General</option>
                            <option value="admissions">Admissions</option>
                            <option value="academic">Academic</option>
                            <option value="events">Events</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="notice-audience">Target Audience</label>
                        <input id="notice-audience" className={`${fieldClass} mt-1`} value={noticeForm.audience} onChange={(event) => setNoticeForm({ ...noticeForm, audience: event.target.value })} required minLength={2} maxLength={100} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="notice-summary">Announcement Content</label>
                        <textarea id="notice-summary" className={`${fieldClass} mt-1 min-h-28`} value={noticeForm.summary} onChange={(event) => setNoticeForm({ ...noticeForm, summary: event.target.value })} required minLength={5} maxLength={2000} />
                      </div>
                      <div className="flex flex-wrap gap-5 text-sm font-semibold text-neutral-700">
                        <label className="inline-flex cursor-pointer items-center gap-2">
                          <input type="checkbox" checked={Boolean(noticeForm.pinned)} onChange={(event) => setNoticeForm({ ...noticeForm, pinned: event.target.checked })} />
                          Pin to top
                        </label>
                        <label className="inline-flex cursor-pointer items-center gap-2">
                          <input type="checkbox" checked={Boolean(noticeForm.published)} onChange={(event) => setNoticeForm({ ...noticeForm, published: event.target.checked })} />
                          Published
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button type="submit" disabled={loading} className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#ff2121] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60">
                          <Save className="h-4 w-4" />
                          Save Notice
                        </button>
                        <button type="button" onClick={() => setNoticeForm(emptyNotice)} className="cursor-pointer rounded-lg border border-neutral-200 px-5 py-3 text-sm font-extrabold text-neutral-700 hover:bg-neutral-50">
                          Clear Form
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">Live Supabase Notices ({notices.length})</h4>
                    {notices.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">No notices in Supabase yet. Use the form to create one or seed the default school content.</div>
                    ) : notices.map((notice) => (
                      <article key={notice.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-extrabold uppercase text-[#ff2121]">{notice.category}</p>
                            <h4 className="font-display text-base font-extrabold text-neutral-950">{notice.title}</h4>
                            <p className="text-xs text-neutral-500">{notice.date} | {notice.audience}</p>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${notice.published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'}`}>{notice.published ? 'Published' : 'Draft'}</span>
                        </div>
                        <p className="mb-3 text-xs text-neutral-600 line-clamp-2">{notice.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setNoticeForm(notice)} className="cursor-pointer rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-extrabold text-neutral-700 hover:bg-neutral-200">Edit</button>
                          <button type="button" onClick={() => deleteNotice(notice.id)} className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-extrabold text-red-700 hover:bg-red-100">
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'events' && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <form onSubmit={saveEvent} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-5 font-display text-2xl font-extrabold text-neutral-950">{selectedEventId ? 'Edit Event' : 'New School Event'}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass} htmlFor="event-title">Event Title</label>
                        <input id="event-title" className={`${fieldClass} mt-1`} value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} required minLength={3} maxLength={200} />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="event-date">Date</label>
                          <input id="event-date" type="date" className={`${fieldClass} mt-1`} value={eventForm.date} onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })} required />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="event-time">Time</label>
                          <input id="event-time" className={`${fieldClass} mt-1`} value={eventForm.time} onChange={(event) => setEventForm({ ...eventForm, time: event.target.value })} required maxLength={50} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="event-category">Category</label>
                          <select
                            id="event-category"
                            className={`${fieldClass} mt-1`}
                            value={eventForm.category}
                            onChange={(event) => {
                              const category = event.target.value as EventItem['category'];
                              const labels = { academic: 'Academic Assessment', sports: 'Sports & Athletics', meetings: 'Parent Meetings' };
                              setEventForm({ ...eventForm, category, categoryLabel: labels[category] });
                            }}
                          >
                            <option value="academic">Academic</option>
                            <option value="sports">Sports</option>
                            <option value="meetings">Parent Meetings</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="event-label">Display Badge</label>
                          <input id="event-label" className={`${fieldClass} mt-1`} value={eventForm.categoryLabel} onChange={(event) => setEventForm({ ...eventForm, categoryLabel: event.target.value })} required maxLength={100} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-location">Location / Venue</label>
                        <input id="event-location" className={`${fieldClass} mt-1`} value={eventForm.location} onChange={(event) => setEventForm({ ...eventForm, location: event.target.value })} required maxLength={200} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-image">Banner Image URL</label>
                        <input id="event-image" type="url" className={`${fieldClass} mt-1`} value={eventForm.imageUrl} onChange={(event) => setEventForm({ ...eventForm, imageUrl: event.target.value })} placeholder="https://..." required maxLength={1000} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-description">Event Details & Description</label>
                        <textarea id="event-description" className={`${fieldClass} mt-1 min-h-28`} value={eventForm.description} onChange={(event) => setEventForm({ ...eventForm, description: event.target.value })} required minLength={5} maxLength={3000} />
                      </div>
                      <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-neutral-700">
                        <input type="checkbox" checked={Boolean(eventForm.published)} onChange={(event) => setEventForm({ ...eventForm, published: event.target.checked })} />
                        Published
                      </label>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button type="submit" disabled={loading} className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#ff2121] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60">
                          <Save className="h-4 w-4" />
                          Save Event
                        </button>
                        <button type="button" onClick={() => setEventForm(emptyEvent)} className="cursor-pointer rounded-lg border border-neutral-200 px-5 py-3 text-sm font-extrabold text-neutral-700 hover:bg-neutral-50">
                          Clear Form
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">Live Supabase Events ({events.length})</h4>
                    {events.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">No events in Supabase yet. Use the form to create one or seed the default school content.</div>
                    ) : events.map((schoolEvent) => (
                      <article key={schoolEvent.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-extrabold uppercase text-[#ff2121]">{schoolEvent.categoryLabel || schoolEvent.category}</p>
                            <h4 className="font-display text-base font-extrabold text-neutral-950">{schoolEvent.title}</h4>
                            <p className="text-xs text-neutral-500">{schoolEvent.date} | {schoolEvent.time} | {schoolEvent.location}</p>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${schoolEvent.published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'}`}>{schoolEvent.published ? 'Published' : 'Draft'}</span>
                        </div>
                        <p className="mb-3 text-xs text-neutral-600 line-clamp-2">{schoolEvent.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setEventForm(schoolEvent)} className="cursor-pointer rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-extrabold text-neutral-700 hover:bg-neutral-200">Edit</button>
                          <button type="button" onClick={() => deleteEvent(schoolEvent.id)} className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-extrabold text-red-700 hover:bg-red-100">
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </article>
                    ))}
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
