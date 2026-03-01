-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- BLOG POSTS
-- ─────────────────────────────────────────────
create table blog_posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  content      text,
  cover_image  text,
  tags         text[] default '{}',
  published    boolean default false,
  published_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ─────────────────────────────────────────────
-- PROJECTS
-- ─────────────────────────────────────────────
create table projects (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  description      text,
  long_description text,
  cover_image      text,
  demo_url         text,
  github_url       text,
  tech_stack       text[] default '{}',
  featured         boolean default false,
  display_order    integer default 0,
  published        boolean default false,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ─────────────────────────────────────────────
-- SOCIAL MEDIA LINKS
-- ─────────────────────────────────────────────
create table social_links (
  id            uuid primary key default gen_random_uuid(),
  platform      text not null,          -- e.g. "Twitter", "GitHub", "LinkedIn"
  url           text not null,
  icon          text,                   -- icon name/class for your frontend
  display_order integer default 0,
  created_at    timestamptz default now()
);

-- ─────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────
create table newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  confirmed   boolean default false,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────
-- SPOTIFY PLAYLISTS
-- ─────────────────────────────────────────────
create table spotify_playlists (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  playlist_id   text not null unique,   -- Spotify playlist ID from the URL
  description   text,
  cover_image   text,                   -- optional custom thumbnail
  display_order integer default 0,
  created_at    timestamptz default now()
);

-- ─────────────────────────────────────────────
-- AUTO-UPDATE updated_at ON BLOG POSTS & PROJECTS
-- ─────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
alter table blog_posts             enable row level security;
alter table projects               enable row level security;
alter table social_links           enable row level security;
alter table newsletter_subscribers enable row level security;
alter table spotify_playlists      enable row level security;

-- Public read access for published content
create policy "Public can read published posts"
  on blog_posts for select
  using (published = true);

create policy "Public can read published projects"
  on projects for select
  using (published = true);

create policy "Public can read social links"
  on social_links for select
  using (true);

create policy "Public can read spotify playlists"
  on spotify_playlists for select
  using (true);

-- Anyone can subscribe to newsletter
create policy "Anyone can subscribe"
  on newsletter_subscribers for insert
  with check (true);
