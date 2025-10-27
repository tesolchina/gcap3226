-- Create enum for roles
create type public.app_role as enum ('teacher', 'student');

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

-- Enable RLS
alter table public.user_roles enable row level security;

-- Security definer function to check roles (bypasses RLS to prevent recursion)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS policies for user_roles
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Only admins can insert roles"
on public.user_roles
for insert
to authenticated
with check (false); -- Manual role assignment only via service role

-- Update messages table to link to auth.users
alter table public.messages
add column user_id uuid references auth.users(id) on delete set null;

-- Create index for performance
create index idx_messages_user_id on public.messages(user_id);

-- Update RLS for messages to use authentication
drop policy if exists "Anyone can create messages" on public.messages;
drop policy if exists "Anyone can view messages" on public.messages;

create policy "Authenticated users can view messages"
on public.messages
for select
to authenticated
using (true);

create policy "Authenticated users can create messages"
on public.messages
for insert
to authenticated
with check (auth.uid() = user_id);