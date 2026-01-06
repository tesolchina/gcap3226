-- Create table for MC questions
CREATE TABLE public.mc_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  question_text text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  correct_option integer,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Create table for anonymous student responses
CREATE TABLE public.mc_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES public.mc_questions(id) ON DELETE CASCADE NOT NULL,
  selected_option integer NOT NULL,
  session_id text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(question_id, session_id)
);

-- Enable RLS
ALTER TABLE public.mc_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mc_responses ENABLE ROW LEVEL SECURITY;

-- RLS policies for mc_questions
CREATE POLICY "Anyone can view active questions"
ON public.mc_questions
FOR SELECT
USING (is_active = true);

CREATE POLICY "Teachers can manage questions"
ON public.mc_questions
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'teacher'))
WITH CHECK (public.has_role(auth.uid(), 'teacher'));

-- RLS policies for mc_responses
CREATE POLICY "Anyone can submit responses"
ON public.mc_responses
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view responses"
ON public.mc_responses
FOR SELECT
USING (true);

-- Index for faster queries
CREATE INDEX idx_mc_questions_page ON public.mc_questions(page_slug);
CREATE INDEX idx_mc_responses_question ON public.mc_responses(question_id);