create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('patient', 'admin', 'ops', 'doctor', 'support');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.case_vertical as enum ('hair_care', 'health_tracking', 'mens_health', 'womens_health');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.case_status as enum (
    'new',
    'awaiting_payment',
    'awaiting_assignment',
    'awaiting_review',
    'in_review',
    'needs_follow_up',
    'approved',
    'declined',
    'referred',
    'order_created',
    'closed'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.audit_event_type as enum (
    'case_created',
    'consent_accepted',
    'media_uploaded',
    'media_viewed',
    'ai_summary_generated',
    'doctor_assigned',
    'doctor_reassigned',
    'doctor_decision_submitted',
    'prescription_status_changed',
    'lab_status_changed',
    'referral_status_changed',
    'support_note_created',
    'fulfilment_status_changed'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role public.app_role not null default 'patient',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.doctor_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  display_name text not null,
  registration_number text,
  supported_verticals public.case_vertical[] not null default array['hair_care']::public.case_vertical[],
  daily_capacity integer not null default 15,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  case_number text not null unique,
  patient_user_id uuid references public.profiles(id),
  vertical public.case_vertical not null,
  status public.case_status not null default 'new',
  priority text not null default 'routine',
  contact_full_name text not null,
  contact_phone text not null,
  contact_email text not null,
  source text not null default 'direct',
  consult_fee integer not null default 0,
  payment_status text not null default 'pending',
  assigned_doctor_id uuid references public.doctor_profiles(user_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_intakes (
  case_id uuid primary key references public.cases(id) on delete cascade,
  eligibility_outcome text,
  consent_accepted boolean not null default false,
  adult_confirmed boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.case_media (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  bucket text not null default 'case-media',
  object_path text not null unique,
  media_kind text not null,
  required_angle text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.ai_summaries (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  transcript text not null,
  flags jsonb not null default '[]'::jsonb,
  model_name text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.doctor_reviews (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  doctor_id uuid not null references public.doctor_profiles(user_id),
  decision text not null,
  notes text not null default '',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  order_type text not null,
  status text not null default 'created',
  partner_name text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_notes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  author_id uuid references public.profiles(id),
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.assignment_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  assigned_doctor_id uuid references public.doctor_profiles(user_id),
  assigned_by uuid references public.profiles(id),
  reason text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.cases(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  event_type public.audit_event_type not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists cases_assigned_doctor_idx on public.cases (assigned_doctor_id);
create index if not exists cases_status_idx on public.cases (status);
create index if not exists audit_events_case_idx on public.audit_events (case_id, created_at desc);

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and active = true
$$;

create or replace function public.is_admin_or_ops()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('admin', 'ops')
$$;

create or replace function public.is_support_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('admin', 'ops', 'support')
$$;

create or replace function public.is_assigned_doctor(target_case_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cases c
    join public.doctor_profiles d on d.user_id = c.assigned_doctor_id
    where c.id = target_case_id
      and d.user_id = auth.uid()
      and d.active = true
  )
$$;

alter table public.profiles enable row level security;
alter table public.doctor_profiles enable row level security;
alter table public.cases enable row level security;
alter table public.case_intakes enable row level security;
alter table public.case_media enable row level security;
alter table public.ai_summaries enable row level security;
alter table public.doctor_reviews enable row level security;
alter table public.orders enable row level security;
alter table public.support_notes enable row level security;
alter table public.assignment_events enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
using (id = auth.uid() or public.is_admin_or_ops());

drop policy if exists "profiles_update_admin_ops" on public.profiles;
create policy "profiles_update_admin_ops"
on public.profiles for update
using (public.is_admin_or_ops())
with check (public.is_admin_or_ops());

drop policy if exists "doctor_profiles_select_staff" on public.doctor_profiles;
create policy "doctor_profiles_select_staff"
on public.doctor_profiles for select
using (user_id = auth.uid() or public.is_admin_or_ops());

drop policy if exists "doctor_profiles_admin_ops" on public.doctor_profiles;
create policy "doctor_profiles_admin_ops"
on public.doctor_profiles for all
using (public.is_admin_or_ops())
with check (public.is_admin_or_ops());

drop policy if exists "cases_staff_select" on public.cases;
create policy "cases_staff_select"
on public.cases for select
using (
  public.is_admin_or_ops()
  or assigned_doctor_id = auth.uid()
  or patient_user_id = auth.uid()
);

drop policy if exists "cases_admin_ops_update" on public.cases;
create policy "cases_admin_ops_update"
on public.cases for update
using (public.is_admin_or_ops())
with check (public.is_admin_or_ops());

drop policy if exists "case_intakes_staff_select" on public.case_intakes;
create policy "case_intakes_staff_select"
on public.case_intakes for select
using (public.is_admin_or_ops() or public.is_assigned_doctor(case_id));

drop policy if exists "case_media_staff_select" on public.case_media;
create policy "case_media_staff_select"
on public.case_media for select
using (public.is_admin_or_ops() or public.is_assigned_doctor(case_id));

drop policy if exists "ai_summaries_staff_select" on public.ai_summaries;
create policy "ai_summaries_staff_select"
on public.ai_summaries for select
using (public.is_admin_or_ops() or public.is_assigned_doctor(case_id));

drop policy if exists "doctor_reviews_staff_select" on public.doctor_reviews;
create policy "doctor_reviews_staff_select"
on public.doctor_reviews for select
using (public.is_admin_or_ops() or doctor_id = auth.uid() or public.is_assigned_doctor(case_id));

drop policy if exists "doctor_reviews_doctor_insert" on public.doctor_reviews;
create policy "doctor_reviews_doctor_insert"
on public.doctor_reviews for insert
with check (doctor_id = auth.uid() and public.is_assigned_doctor(case_id));

drop policy if exists "orders_staff_select" on public.orders;
create policy "orders_staff_select"
on public.orders for select
using (public.is_support_staff() or public.is_assigned_doctor(case_id));

drop policy if exists "support_notes_staff_select" on public.support_notes;
create policy "support_notes_staff_select"
on public.support_notes for select
using (public.is_support_staff() or public.is_assigned_doctor(case_id));

drop policy if exists "support_notes_staff_insert" on public.support_notes;
create policy "support_notes_staff_insert"
on public.support_notes for insert
with check (public.is_support_staff());

drop policy if exists "assignment_events_staff_select" on public.assignment_events;
create policy "assignment_events_staff_select"
on public.assignment_events for select
using (public.is_admin_or_ops() or assigned_doctor_id = auth.uid());

drop policy if exists "audit_events_staff_select" on public.audit_events;
create policy "audit_events_staff_select"
on public.audit_events for select
using (public.is_admin_or_ops() or public.is_assigned_doctor(case_id));

insert into storage.buckets (id, name, public)
values ('case-media', 'case-media', false)
on conflict (id) do update set public = false;

drop policy if exists "case_media_storage_read_staff" on storage.objects;
create policy "case_media_storage_read_staff"
on storage.objects for select
using (
  bucket_id = 'case-media'
  and exists (
    select 1
    from public.case_media cm
    where cm.object_path = storage.objects.name
      and (public.is_admin_or_ops() or public.is_assigned_doctor(cm.case_id))
  )
);
