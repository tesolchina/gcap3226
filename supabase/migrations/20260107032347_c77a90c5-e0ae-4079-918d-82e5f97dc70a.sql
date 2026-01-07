-- Add membership status to project_members table
ALTER TABLE public.project_members 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Add index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_project_members_status ON public.project_members(status);

-- Update existing members to approved status (they were already in the system)
UPDATE public.project_members SET status = 'approved' WHERE status IS NULL;

-- Allow teachers to update membership status
CREATE POLICY "Teachers can update member status"
ON public.project_members
FOR UPDATE
USING (true)
WITH CHECK (true);