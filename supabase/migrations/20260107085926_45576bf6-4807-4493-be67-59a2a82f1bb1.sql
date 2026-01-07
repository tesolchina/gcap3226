-- Create session messages table for ProjectSessions chat
CREATE TABLE IF NOT EXISTS public.session_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  member_id uuid,
  content text NOT NULL,
  is_ai boolean NOT NULL DEFAULT false,
  is_teacher boolean NOT NULL DEFAULT false,
  is_voice_transcription boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- FK to sessions
DO $$ BEGIN
  ALTER TABLE public.session_messages
    ADD CONSTRAINT session_messages_session_id_fkey
    FOREIGN KEY (session_id) REFERENCES public.project_sessions(id)
    ON DELETE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_session_messages_session_created_at
  ON public.session_messages (session_id, created_at);

-- Enable Row Level Security
ALTER TABLE public.session_messages ENABLE ROW LEVEL SECURITY;

-- Policies (public classroom app)
DO $$ BEGIN
  CREATE POLICY "Anyone can create session messages"
  ON public.session_messages
  FOR INSERT
  WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can view session messages"
  ON public.session_messages
  FOR SELECT
  USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.session_messages;