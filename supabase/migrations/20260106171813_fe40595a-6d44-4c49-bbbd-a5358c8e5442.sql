-- Create table for project groups (one per topic)
CREATE TABLE public.project_groups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_slug text NOT NULL UNIQUE,
  topic_name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_groups ENABLE ROW LEVEL SECURITY;

-- Anyone can view project groups
CREATE POLICY "Anyone can view project groups" 
ON public.project_groups 
FOR SELECT 
USING (true);

-- Create table for student identification within project groups
CREATE TABLE public.project_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_group_id uuid REFERENCES public.project_groups(id) ON DELETE CASCADE,
  student_id_last4 text NOT NULL CHECK (char_length(student_id_last4) = 4),
  display_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(project_group_id, student_id_last4)
);

-- Enable RLS
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

-- Anyone can view and create project members
CREATE POLICY "Anyone can view project members" 
ON public.project_members 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can register as project member" 
ON public.project_members 
FOR INSERT 
WITH CHECK (true);

-- Create table for project messages (chat with AI, peers, teacher)
CREATE TABLE public.project_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_group_id uuid REFERENCES public.project_groups(id) ON DELETE CASCADE,
  member_id uuid REFERENCES public.project_members(id) ON DELETE SET NULL,
  content text NOT NULL,
  is_ai boolean NOT NULL DEFAULT false,
  is_teacher boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can view and create messages
CREATE POLICY "Anyone can view project messages" 
ON public.project_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create project messages" 
ON public.project_messages 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);

-- Create table to track project file metadata
CREATE TABLE public.project_files (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_group_id uuid REFERENCES public.project_groups(id) ON DELETE CASCADE,
  member_id uuid REFERENCES public.project_members(id) ON DELETE SET NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer,
  mime_type text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- Anyone can view and upload files
CREATE POLICY "Anyone can view project files" 
ON public.project_files 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can upload project files" 
ON public.project_files 
FOR INSERT 
WITH CHECK (true);

-- Storage policies for project-files bucket
CREATE POLICY "Anyone can view project files storage" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-files');

CREATE POLICY "Anyone can upload project files storage" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-files');

-- Enable realtime for project messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_messages;

-- Seed the project groups with topics
INSERT INTO public.project_groups (topic_slug, topic_name) VALUES
  ('flu-shot', 'Flu Shot'),
  ('colorectal-cancer-screening', 'Colorectal Cancer Screening Programme'),
  ('road-safety', 'Road Safety'),
  ('empf', 'eMPF'),
  ('cdcc', 'Chronic Disease Co-Care (CDCC) Pilot Scheme');