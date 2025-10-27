-- Create teams table for reference
CREATE TABLE public.teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Insert the 6 teams
INSERT INTO public.teams (name, slug, description) VALUES
  ('Flu Shot Campaign', 'flu-shot', 'Mathematical Models and Data Governance for School Vaccination Decision-Making'),
  ('Bus Route Coordination', 'bus-route', 'Analysis of coordination opportunities between overlapping bus routes'),
  ('Typhoon Signal Analysis', 'typhoon-signals', 'Data-Driven Signal 8 Accuracy Assessment with Real-Time Wind Analysis'),
  ('Food Waste Management', 'food-waste', 'Municipal Solid Waste Charging Scheme Analysis'),
  ('Green Community Recycling', 'green-recycling', 'Resource Allocation Decisions and App Usage Data Visualization'),
  ('Bus Stop Merge', 'bus-stop-merge', 'Real-Time API Data Analysis and Bus Stop Placement Optimization');

-- Create messages table for message boards
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id INTEGER REFERENCES public.teams(id) ON DELETE CASCADE,
  tab_name TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_teacher BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create government messages table
CREATE TABLE public.government_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id INTEGER REFERENCES public.teams(id) ON DELETE CASCADE,
  tab_name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id INTEGER REFERENCES public.teams(id) ON DELETE CASCADE,
  tab_name TEXT NOT NULL,
  government_message_id UUID REFERENCES public.government_messages(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create student submissions table
CREATE TABLE public.student_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id INTEGER REFERENCES public.teams(id) ON DELETE CASCADE,
  tab_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  submission_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (course portal is public)
CREATE POLICY "Anyone can view teams"
  ON public.teams FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view messages"
  ON public.messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create messages"
  ON public.messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view government messages"
  ON public.government_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create government messages"
  ON public.government_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view comments"
  ON public.comments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view submissions"
  ON public.student_submissions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create submissions"
  ON public.student_submissions FOR INSERT
  WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;