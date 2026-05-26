do $$ begin
  create type public.biomarker_status as enum ('low', 'normal', 'high', 'critical', 'borderline');
exception when duplicate_object then null;
end $$;

insert into storage.buckets (id, name, public)
values ('case-media', 'case-media', false)
on conflict (id) do update set public = excluded.public;

create table if not exists public.partner_labs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.health_tracking_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  contact_full_name text not null default '',
  contact_phone text not null default '',
  contact_email text not null default '',
  age integer,
  gender text,
  height_cm numeric,
  weight_kg numeric,
  bmi numeric,
  goals text[] not null default '{}'::text[],
  intake_payload jsonb not null default '{}'::jsonb,
  consent_accepted boolean not null default false,
  adult_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lab_orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.health_tracking_profiles(id) on delete cascade,
  partner_lab_id uuid references public.partner_labs(id),
  package_name text not null,
  status text not null default 'requested',
  preferred_slot text,
  collection_address text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lab_reports (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.health_tracking_profiles(id) on delete cascade,
  lab_order_id uuid references public.lab_orders(id) on delete set null,
  partner_lab_id uuid references public.partner_labs(id),
  report_date date not null,
  lab_name text not null default '',
  report_file_path text,
  ai_summary text,
  doctor_review_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.biomarkers (
  id uuid primary key default gen_random_uuid(),
  marker_name text not null unique,
  marker_category text not null,
  default_unit text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.biomarker_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  lab_report_id uuid references public.lab_reports(id) on delete cascade,
  marker_name text not null,
  marker_category text not null,
  value numeric not null,
  unit text not null,
  reference_min numeric,
  reference_max numeric,
  status public.biomarker_status not null,
  report_date date not null,
  lab_name text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.health_insights (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.health_tracking_profiles(id) on delete cascade,
  lab_report_id uuid references public.lab_reports(id) on delete cascade,
  insight_type text not null default 'ai_assisted',
  title text not null,
  body text not null,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.health_plans (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.health_tracking_profiles(id) on delete cascade,
  created_by uuid references public.profiles(id),
  title text not null,
  status text not null default 'draft',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tracking_reminders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.health_tracking_profiles(id) on delete cascade,
  marker_name text,
  reminder_type text not null,
  due_at timestamptz not null,
  status text not null default 'scheduled',
  created_at timestamptz not null default now()
);

create index if not exists health_tracking_profiles_user_idx on public.health_tracking_profiles (user_id);
create index if not exists lab_orders_profile_idx on public.lab_orders (profile_id, created_at desc);
create index if not exists lab_reports_profile_idx on public.lab_reports (profile_id, report_date desc);
create index if not exists biomarker_results_user_marker_idx on public.biomarker_results (user_id, marker_name, report_date desc);
create index if not exists tracking_reminders_profile_due_idx on public.tracking_reminders (profile_id, due_at);

alter table public.partner_labs enable row level security;
alter table public.health_tracking_profiles enable row level security;
alter table public.lab_orders enable row level security;
alter table public.lab_reports enable row level security;
alter table public.biomarkers enable row level security;
alter table public.biomarker_results enable row level security;
alter table public.health_insights enable row level security;
alter table public.health_plans enable row level security;
alter table public.tracking_reminders enable row level security;

drop policy if exists "partner_labs_staff_select" on public.partner_labs;
create policy "partner_labs_staff_select"
on public.partner_labs for select
using (public.is_support_staff() or public.current_app_role() = 'doctor');

drop policy if exists "health_profiles_staff_or_owner_select" on public.health_tracking_profiles;
create policy "health_profiles_staff_or_owner_select"
on public.health_tracking_profiles for select
using (user_id = auth.uid() or public.is_support_staff() or public.current_app_role() = 'doctor');

drop policy if exists "health_profiles_staff_update" on public.health_tracking_profiles;
create policy "health_profiles_staff_update"
on public.health_tracking_profiles for update
using (public.is_support_staff())
with check (public.is_support_staff());

drop policy if exists "lab_orders_staff_or_owner_select" on public.lab_orders;
create policy "lab_orders_staff_or_owner_select"
on public.lab_orders for select
using (
  public.is_support_staff()
  or exists (
    select 1 from public.health_tracking_profiles p
    where p.id = lab_orders.profile_id and p.user_id = auth.uid()
  )
);

drop policy if exists "lab_reports_staff_or_owner_select" on public.lab_reports;
create policy "lab_reports_staff_or_owner_select"
on public.lab_reports for select
using (
  public.is_support_staff()
  or public.current_app_role() = 'doctor'
  or exists (
    select 1 from public.health_tracking_profiles p
    where p.id = lab_reports.profile_id and p.user_id = auth.uid()
  )
);

drop policy if exists "biomarkers_staff_select" on public.biomarkers;
create policy "biomarkers_staff_select"
on public.biomarkers for select
using (public.is_support_staff() or public.current_app_role() = 'doctor');

drop policy if exists "biomarker_results_staff_or_owner_select" on public.biomarker_results;
create policy "biomarker_results_staff_or_owner_select"
on public.biomarker_results for select
using (user_id = auth.uid() or public.is_support_staff() or public.current_app_role() = 'doctor');

drop policy if exists "health_insights_staff_or_owner_select" on public.health_insights;
create policy "health_insights_staff_or_owner_select"
on public.health_insights for select
using (
  public.is_support_staff()
  or public.current_app_role() = 'doctor'
  or exists (
    select 1 from public.health_tracking_profiles p
    where p.id = health_insights.profile_id and p.user_id = auth.uid()
  )
);

drop policy if exists "health_plans_staff_or_owner_select" on public.health_plans;
create policy "health_plans_staff_or_owner_select"
on public.health_plans for select
using (
  public.is_support_staff()
  or public.current_app_role() = 'doctor'
  or exists (
    select 1 from public.health_tracking_profiles p
    where p.id = health_plans.profile_id and p.user_id = auth.uid()
  )
);

drop policy if exists "tracking_reminders_staff_or_owner_select" on public.tracking_reminders;
create policy "tracking_reminders_staff_or_owner_select"
on public.tracking_reminders for select
using (
  public.is_support_staff()
  or exists (
    select 1 from public.health_tracking_profiles p
    where p.id = tracking_reminders.profile_id and p.user_id = auth.uid()
  )
);
