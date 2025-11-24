-- Add presentation schedule columns to teams table
ALTER TABLE public.teams 
ADD COLUMN presentation_time TEXT,
ADD COLUMN presentation_end_time TEXT,
ADD COLUMN presentation_date DATE;