
-- Chat messages for Fall 2026 (global tutor + per-topic discussions)
CREATE TABLE public.fall2026_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope text NOT NULL CHECK (scope IN ('global','topic')),
  topic_slug text,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  author_name text,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT topic_slug_required CHECK (
    (scope = 'global' AND topic_slug IS NULL) OR
    (scope = 'topic' AND topic_slug IS NOT NULL)
  )
);

CREATE INDEX idx_fall2026_chat_scope_topic ON public.fall2026_chat_messages(scope, topic_slug, created_at);

GRANT SELECT, INSERT ON public.fall2026_chat_messages TO anon, authenticated;
GRANT ALL ON public.fall2026_chat_messages TO service_role;

ALTER TABLE public.fall2026_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fall2026 chat"
  ON public.fall2026_chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert user messages"
  ON public.fall2026_chat_messages FOR INSERT
  WITH CHECK (role = 'user');

-- Validation + limits trigger
CREATE OR REPLACE FUNCTION public.validate_fall2026_chat()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(NEW.content) > 8000 THEN
    RAISE EXCEPTION 'Message too long (max 8000 chars)';
  END IF;
  IF NEW.author_name IS NOT NULL AND length(NEW.author_name) > 60 THEN
    RAISE EXCEPTION 'Author name too long (max 60 chars)';
  END IF;
  -- Cap messages per scope/topic to 500
  IF (
    SELECT count(*) FROM public.fall2026_chat_messages
    WHERE scope = NEW.scope
      AND ((NEW.topic_slug IS NULL AND topic_slug IS NULL) OR topic_slug = NEW.topic_slug)
  ) >= 500 THEN
    RAISE EXCEPTION 'Message limit reached for this thread';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_fall2026_chat
  BEFORE INSERT ON public.fall2026_chat_messages
  FOR EACH ROW EXECUTE FUNCTION public.validate_fall2026_chat();

ALTER PUBLICATION supabase_realtime ADD TABLE public.fall2026_chat_messages;
ALTER TABLE public.fall2026_chat_messages REPLICA IDENTITY FULL;
