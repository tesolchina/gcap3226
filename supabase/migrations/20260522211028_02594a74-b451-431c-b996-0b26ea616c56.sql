-- Shared discussion thread for the unlisted traffic safety research page.
-- Access is gated at the application layer via password (traffic2027) and the page
-- is not linked from the public site, so reads/inserts are open to anyone who
-- has the URL + password.

CREATE TABLE public.traffic_safety_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  author_name TEXT,
  content TEXT NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 10000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_traffic_safety_messages_created_at
  ON public.traffic_safety_messages (created_at);

ALTER TABLE public.traffic_safety_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read traffic safety messages"
  ON public.traffic_safety_messages
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert traffic safety messages"
  ON public.traffic_safety_messages
  FOR INSERT
  WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.traffic_safety_messages;
ALTER TABLE public.traffic_safety_messages REPLICA IDENTITY FULL;
