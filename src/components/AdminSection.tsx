import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, CalendarPlus, CheckCircle2, LockKeyhole, LogOut, Megaphone, RefreshCw, Save, Trash2 } from 'lucide-react';
import { EventItem, NoticeItem } from '../types';
import { ADMIN_EMAIL, supabase } from '../utils/supabase';

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

const fieldClass = 'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-[#ff2121] focus:ring-2 focus:ring-red-100';
const labelClass = 'text-xs font-extrabold uppercase tracking-wider text-neutral-600';

export const AdminSection: React.FC = () => {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AdminMode>('notices');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState<AdminNotice[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [noticeForm, setNoticeForm] = useState<AdminNotice | Omit<AdminNotice, 'id'>>(emptyNotice);
  const [eventForm, setEventForm] = useState<AdminEvent | Omit<AdminEvent, 'id'>>(emptyEvent);

  const isConfigured = Boolean(supabase);
  const isAllowedAdmin = sessionEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const loadContent = useCallback(async () => {
    if (!supabase || !isAllowedAdmin) {
      return;
    }

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
      setError('The live admin tables are not ready yet. Run the Supabase setup file, then refresh.');
      setLoading(false);
      return;
    }

    setNotices((noticeResult.data ?? []).map((notice) => ({
      id: notice.id,
      title: notice.title,
      date: notice.published_at,
      category: notice.category,
      summary: notice.summary,
      audience: notice.audience,
      pinned: notice.pinned,
      published: notice.published,
    })));

    setEvents((eventResult.data ?? []).map((event) => ({
      id: event.id,
      title: event.title,
      category: event.category,
      categoryLabel: event.category_label,
      date: event.event_date,
      time: event.event_time,
      location: event.location,
      description: event.description,
      imageUrl: event.image_url,
      published: event.published,
    })));

    setLoading(false);
  }, [isAllowedAdmin]);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const selectedNoticeId = 'id' in noticeForm ? noticeForm.id : null;
  const selectedEventId = 'id' in eventForm ? eventForm.id : null;

  const statusText = useMemo(() => {
    if (!isConfigured) return 'Database not connected';
    if (!sessionEmail) return 'Admin login required';
    if (!isAllowedAdmin) return 'Signed in email is not approved';
    return 'Live admin connected';
  }, [isAllowedAdmin, isConfigured, sessionEmail]);

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
      setError('Login failed. Check that the admin user exists in Supabase and that the password is correct.');
    } else {
      setMessage('Admin login successful.');
      setPassword('');
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
      setError('Notice could not be saved. Please check the database permissions.');
    } else {
      setMessage('Notice saved and ready for the website.');
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
      setError('Event could not be saved. Please check the database permissions.');
    } else {
      setMessage('Event saved and ready for the website.');
      setEventForm(emptyEvent);
      await loadContent();
    }

    setLoading(false);
  };

  const deleteNotice = async (id: string) => {
    if (!supabase || !isAllowedAdmin) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('notices').delete().eq('id', id);
    setLoading(false);
    if (deleteError) {
      setError('Notice could not be deleted.');
      return;
    }
    setNoticeForm(emptyNotice);
    await loadContent();
  };

  const deleteEvent = async (id: string) => {
    if (!supabase || !isAllowedAdmin) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('events').delete().eq('id', id);
    setLoading(false);
    if (deleteError) {
      setError('Event could not be deleted.');
      return;
    }
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
              Live Admin
            </span>
            <h2 className="font-display text-3xl font-extrabold text-neutral-950 sm:text-4xl">
              Update News and Events
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Add school notices and events from a secure admin login. Published items appear on the live website automatically after Supabase is connected.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-700 shadow-sm">
            {isAllowedAdmin ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-[#ff2121]" />}
            <span>{statusText}</span>
          </div>
        </div>

        {!isConfigured && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            <h3 className="mb-2 font-display text-xl font-extrabold">Database setup needed</h3>
            <p className="leading-relaxed">
              Create a Supabase project, run the setup file in <strong>supabase/schema.sql</strong>, create the admin user <strong>{ADMIN_EMAIL}</strong>, then add the Supabase URL and anon key to the website environment variables.
            </p>
          </div>
        )}

        {isConfigured && !sessionEmail && (
          <form onSubmit={handleLogin} className="max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="admin-email">Admin email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  className={`${fieldClass} mt-1`}
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={`${fieldClass} mt-1`}
                  autoComplete="current-password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff2121] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LockKeyhole className="h-4 w-4" />
                Sign In
              </button>
            </div>
          </form>
        )}

        {isConfigured && sessionEmail && !isAllowedAdmin && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
            <h3 className="mb-2 font-display text-xl font-extrabold">Access blocked</h3>
            <p className="leading-relaxed">
              This login is not approved for school updates. Sign in with <strong>{ADMIN_EMAIL}</strong>.
            </p>
            <button
              type="button"
              onClick={() => supabase?.auth.signOut()}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 text-xs font-extrabold text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}

        {isAllowedAdmin && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-neutral-500">Signed in as</p>
                    <p className="text-sm font-extrabold text-neutral-950">{sessionEmail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => supabase?.auth.signOut()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('notices')}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold ${mode === 'notices' ? 'bg-[#ff2121] text-white' : 'bg-neutral-100 text-neutral-700'}`}
                  >
                    <Megaphone className="h-4 w-4" />
                    Notices
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('events')}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold ${mode === 'events' ? 'bg-[#ff2121] text-white' : 'bg-neutral-100 text-neutral-700'}`}
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Events
                  </button>
                </div>

                <button
                  type="button"
                  onClick={loadContent}
                  disabled={loading}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-xs font-extrabold text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Live Content
                </button>
              </div>
            </div>

            <div className="lg:col-span-8">
              {(message || error) && (
                <div className={`mb-5 rounded-lg border px-4 py-3 text-sm font-semibold ${error ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                  {error || message}
                </div>
              )}

              {mode === 'notices' && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <form onSubmit={saveNotice} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-5 font-display text-2xl font-extrabold text-neutral-950">
                      {selectedNoticeId ? 'Edit Notice' : 'New Notice'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass} htmlFor="notice-title">Title</label>
                        <input id="notice-title" className={`${fieldClass} mt-1`} value={noticeForm.title} onChange={(event) => setNoticeForm({ ...noticeForm, title: event.target.value })} required />
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
                        <label className={labelClass} htmlFor="notice-audience">Audience</label>
                        <input id="notice-audience" className={`${fieldClass} mt-1`} value={noticeForm.audience} onChange={(event) => setNoticeForm({ ...noticeForm, audience: event.target.value })} required />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="notice-summary">Message</label>
                        <textarea id="notice-summary" className={`${fieldClass} mt-1 min-h-28`} value={noticeForm.summary} onChange={(event) => setNoticeForm({ ...noticeForm, summary: event.target.value })} required />
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm font-semibold text-neutral-700">
                        <label className="inline-flex items-center gap-2">
                          <input type="checkbox" checked={Boolean(noticeForm.pinned)} onChange={(event) => setNoticeForm({ ...noticeForm, pinned: event.target.checked })} />
                          Pin notice
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input type="checkbox" checked={Boolean(noticeForm.published)} onChange={(event) => setNoticeForm({ ...noticeForm, published: event.target.checked })} />
                          Published
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-[#ff2121] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60">
                          <Save className="h-4 w-4" />
                          Save Notice
                        </button>
                        <button type="button" onClick={() => setNoticeForm(emptyNotice)} className="rounded-lg border border-neutral-200 px-5 py-3 text-sm font-extrabold text-neutral-700">
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-3">
                    {notices.map((notice) => (
                      <article key={notice.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase text-[#ff2121]">{notice.category}</p>
                            <h4 className="font-display text-lg font-extrabold text-neutral-950">{notice.title}</h4>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${notice.published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'}`}>
                            {notice.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="mb-3 text-sm text-neutral-600">{notice.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setNoticeForm(notice)} className="rounded-lg bg-neutral-100 px-3 py-2 text-xs font-extrabold text-neutral-700">Edit</button>
                          <button type="button" onClick={() => deleteNotice(notice.id)} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-extrabold text-red-700">
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
                    <h3 className="mb-5 font-display text-2xl font-extrabold text-neutral-950">
                      {selectedEventId ? 'Edit Event' : 'New Event'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass} htmlFor="event-title">Title</label>
                        <input id="event-title" className={`${fieldClass} mt-1`} value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} required />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="event-date">Date</label>
                          <input id="event-date" type="date" className={`${fieldClass} mt-1`} value={eventForm.date} onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })} required />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="event-time">Time</label>
                          <input id="event-time" className={`${fieldClass} mt-1`} value={eventForm.time} onChange={(event) => setEventForm({ ...eventForm, time: event.target.value })} required />
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
                              const labels = { academic: 'Academic', sports: 'Sports', meetings: 'Parent Meetings' };
                              setEventForm({ ...eventForm, category, categoryLabel: labels[category] });
                            }}
                          >
                            <option value="academic">Academic</option>
                            <option value="sports">Sports</option>
                            <option value="meetings">Parent Meetings</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="event-label">Display label</label>
                          <input id="event-label" className={`${fieldClass} mt-1`} value={eventForm.categoryLabel} onChange={(event) => setEventForm({ ...eventForm, categoryLabel: event.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-location">Location</label>
                        <input id="event-location" className={`${fieldClass} mt-1`} value={eventForm.location} onChange={(event) => setEventForm({ ...eventForm, location: event.target.value })} required />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-image">Image URL</label>
                        <input id="event-image" type="url" className={`${fieldClass} mt-1`} value={eventForm.imageUrl} onChange={(event) => setEventForm({ ...eventForm, imageUrl: event.target.value })} placeholder="https://..." required />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="event-description">Description</label>
                        <textarea id="event-description" className={`${fieldClass} mt-1 min-h-28`} value={eventForm.description} onChange={(event) => setEventForm({ ...eventForm, description: event.target.value })} required />
                      </div>
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <input type="checkbox" checked={Boolean(eventForm.published)} onChange={(event) => setEventForm({ ...eventForm, published: event.target.checked })} />
                        Published
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-[#ff2121] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60">
                          <Save className="h-4 w-4" />
                          Save Event
                        </button>
                        <button type="button" onClick={() => setEventForm(emptyEvent)} className="rounded-lg border border-neutral-200 px-5 py-3 text-sm font-extrabold text-neutral-700">
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-3">
                    {events.map((schoolEvent) => (
                      <article key={schoolEvent.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase text-[#ff2121]">{schoolEvent.date}</p>
                            <h4 className="font-display text-lg font-extrabold text-neutral-950">{schoolEvent.title}</h4>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${schoolEvent.published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'}`}>
                            {schoolEvent.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="mb-3 text-sm text-neutral-600">{schoolEvent.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setEventForm(schoolEvent)} className="rounded-lg bg-neutral-100 px-3 py-2 text-xs font-extrabold text-neutral-700">Edit</button>
                          <button type="button" onClick={() => deleteEvent(schoolEvent.id)} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-extrabold text-red-700">
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
