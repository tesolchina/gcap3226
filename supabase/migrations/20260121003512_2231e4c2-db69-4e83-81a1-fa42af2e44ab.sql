-- Create student_sessions table for lightweight student identity
CREATE TABLE public.student_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id_last4 TEXT NOT NULL CHECK (length(student_id_last4) = 4),
  first_name TEXT NOT NULL,
  last_name_initial CHAR(1) NOT NULL,
  unique_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can create student sessions
CREATE POLICY "Anyone can create student sessions"
ON public.student_sessions
FOR INSERT
WITH CHECK (true);

-- Anyone can view student sessions (to check existing)
CREATE POLICY "Anyone can view student sessions"
ON public.student_sessions
FOR SELECT
USING (true);

-- Create teacher_registrations table for approval workflow
CREATE TABLE public.teacher_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  section_numbers TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID
);

-- Enable RLS
ALTER TABLE public.teacher_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can create registrations (during signup)
CREATE POLICY "Anyone can create teacher registrations"
ON public.teacher_registrations
FOR INSERT
WITH CHECK (true);

-- Users can view their own registration
CREATE POLICY "Users can view own registration"
ON public.teacher_registrations
FOR SELECT
USING (auth.uid() = user_id OR has_role(auth.uid(), 'teacher'));

-- Only teachers can update registrations (for approval)
CREATE POLICY "Teachers can update registrations"
ON public.teacher_registrations
FOR UPDATE
USING (has_role(auth.uid(), 'teacher'))
WITH CHECK (has_role(auth.uid(), 'teacher'));

-- Enable realtime for teacher_registrations
ALTER PUBLICATION supabase_realtime ADD TABLE public.teacher_registrations;