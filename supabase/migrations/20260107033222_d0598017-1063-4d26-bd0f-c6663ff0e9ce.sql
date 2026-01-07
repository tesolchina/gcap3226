-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Project Knowledge Base for RAG (using extensions.vector)
CREATE TABLE public.project_knowledge (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_group_id uuid REFERENCES public.project_groups(id) ON DELETE CASCADE,
  source_type text NOT NULL CHECK (source_type IN ('session_notes', 'uploaded_file', 'curated_source', 'meeting_summary')),
  source_id uuid,
  title text NOT NULL,
  content text NOT NULL,
  embedding extensions.vector(1536),
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_knowledge ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_knowledge
CREATE POLICY "Anyone can view project knowledge"
ON public.project_knowledge FOR SELECT USING (true);

CREATE POLICY "Anyone can create project knowledge"
ON public.project_knowledge FOR INSERT WITH CHECK (true);

-- Create index for knowledge base vector search
CREATE INDEX IF NOT EXISTS idx_project_knowledge_embedding ON public.project_knowledge USING ivfflat (embedding extensions.vector_cosine_ops) WITH (lists = 100);

-- Insert default milestones function
CREATE OR REPLACE FUNCTION public.create_default_milestones(p_project_group_id uuid)
RETURNS void AS $$
BEGIN
  INSERT INTO public.project_milestones (project_group_id, title, description, display_order, is_custom)
  VALUES
    (p_project_group_id, 'Topic Finalized', 'Confirm research topic and scope with teacher approval', 1, false),
    (p_project_group_id, 'Data Collection Complete', 'Gather all primary and secondary data sources', 2, false),
    (p_project_group_id, 'Analysis Framework Ready', 'Complete data analysis using agreed methodology', 3, false),
    (p_project_group_id, 'Draft Report Submitted', 'Submit draft report outline for feedback', 4, false),
    (p_project_group_id, 'Presentation Prepared', 'Complete presentation slides and rehearse', 5, false),
    (p_project_group_id, 'Final Report Submitted', 'Submit final group report', 6, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;