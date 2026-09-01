create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_users (email)
values ('blanknava205@gmail.com')
on conflict (email) do nothing;

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  published_at date not null default current_date,
  category text not null default 'general' check (category in ('general', 'admissions', 'academic', 'events')),
  summary text not null,
  audience text not null default 'School community',
  pinned boolean not null default false,
  published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'academic' check (category in ('academic', 'sports', 'meetings')),
  category_label text not null default 'Academic',
  event_date date not null,
  event_time text not null,
  location text not null,
  description text not null,
  image_url text not null,
  published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_school_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_notices_updated_at on public.notices;
create trigger set_notices_updated_at
before update on public.notices
for each row execute function public.set_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.notices enable row level security;
alter table public.events enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users for select
using (public.is_school_admin());

drop policy if exists "Published notices are public" on public.notices;
create policy "Published notices are public"
on public.notices for select
using (published = true);

drop policy if exists "Admins can read all notices" on public.notices;
create policy "Admins can read all notices"
on public.notices for select
using (public.is_school_admin());

drop policy if exists "Admins can create notices" on public.notices;
create policy "Admins can create notices"
on public.notices for insert
with check (public.is_school_admin());

drop policy if exists "Admins can update notices" on public.notices;
create policy "Admins can update notices"
on public.notices for update
using (public.is_school_admin())
with check (public.is_school_admin());

drop policy if exists "Admins can delete notices" on public.notices;
create policy "Admins can delete notices"
on public.notices for delete
using (public.is_school_admin());

drop policy if exists "Published events are public" on public.events;
create policy "Published events are public"
on public.events for select
using (published = true);

drop policy if exists "Admins can read all events" on public.events;
create policy "Admins can read all events"
on public.events for select
using (public.is_school_admin());

drop policy if exists "Admins can create events" on public.events;
create policy "Admins can create events"
on public.events for insert
with check (public.is_school_admin());

drop policy if exists "Admins can update events" on public.events;
create policy "Admins can update events"
on public.events for update
using (public.is_school_admin())
with check (public.is_school_admin());

drop policy if exists "Admins can delete events" on public.events;
create policy "Admins can delete events"
on public.events for delete
using (public.is_school_admin());

insert into public.notices (title, published_at, category, summary, audience, pinned, published)
values
  ('2027 Admission Applications', '2026-09-15', 'admissions', 'Parents and guardians can download the official admission form and submit completed applications at the school administration office.', 'Parents and guardians', true, true),
  ('Certified Documents Required', '2026-09-15', 'general', 'Please bring certified copies of parent or guardian ID, learner birth certificate, clinic card, proof of address, latest report, and transfer card where applicable.', 'New applicants', false, true),
  ('Office Hours for Enquiries', '2026-09-01', 'general', 'The school office is open Monday to Friday from 07:30 to 15:30 during term time for admission and general enquiries.', 'School community', false, true)
on conflict do nothing;
