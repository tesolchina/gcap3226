-- Create project_sessions table for group meetings
CREATE TABLE public.project_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_group_id UUID REFERENCES public.project_groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.project_members(id) ON DELETE SET NULL
);

-- Create project_milestones table for tracking project progress
CREATE TABLE public.project_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_group_id UUID REFERENCES public.project_groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_custom BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.project_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;

-- RLS policies for project_sessions
CREATE POLICY "Anyone can view project sessions" 
ON public.project_sessions FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create project sessions" 
ON public.project_sessions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update project sessions" 
ON public.project_sessions FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete project sessions" 
ON public.project_sessions FOR DELETE 
USING (true);

-- RLS policies for project_milestones
CREATE POLICY "Anyone can view project milestones" 
ON public.project_milestones FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create project milestones" 
ON public.project_milestones FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update project milestones" 
ON public.project_milestones FOR UPDATE 
USING (true);

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_milestones;