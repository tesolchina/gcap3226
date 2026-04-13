
-- Check if teacher_registrations is in the publication and remove it
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'teacher_registrations'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.teacher_registrations;
  END IF;
END $$;

-- Drop unused SECURITY DEFINER function
DROP FUNCTION IF EXISTS public.create_default_milestones(uuid);
