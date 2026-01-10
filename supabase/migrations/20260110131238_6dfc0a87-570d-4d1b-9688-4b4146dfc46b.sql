-- Create semantic search function for course knowledge with proper casting
CREATE OR REPLACE FUNCTION public.search_course_knowledge(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5,
  filter_content_type text DEFAULT NULL
) RETURNS TABLE (
  id UUID,
  page_path TEXT,
  page_title TEXT,
  content TEXT,
  content_type TEXT,
  metadata JSONB,
  similarity float
) 
LANGUAGE plpgsql STABLE
SET search_path = public, extensions
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ck.id,
    ck.page_path,
    ck.page_title,
    ck.content,
    ck.content_type,
    ck.metadata,
    (1 - (ck.embedding <=> query_embedding))::float AS similarity
  FROM public.course_knowledge ck
  WHERE 
    ck.embedding IS NOT NULL
    AND (1 - (ck.embedding <=> query_embedding)) > match_threshold
    AND (filter_content_type IS NULL OR ck.content_type = filter_content_type)
  ORDER BY ck.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create semantic search function for project knowledge
CREATE OR REPLACE FUNCTION public.search_project_knowledge(
  query_embedding vector(1536),
  p_project_group_id UUID,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
) RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  source_type TEXT,
  metadata JSONB,
  similarity float
) 
LANGUAGE plpgsql STABLE
SET search_path = public, extensions
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pk.id,
    pk.title,
    pk.content,
    pk.source_type,
    pk.metadata,
    (1 - (pk.embedding <=> query_embedding))::float AS similarity
  FROM public.project_knowledge pk
  WHERE 
    pk.project_group_id = p_project_group_id
    AND pk.embedding IS NOT NULL
    AND (1 - (pk.embedding <=> query_embedding)) > match_threshold
  ORDER BY pk.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create combined search function for both course and project knowledge
CREATE OR REPLACE FUNCTION public.search_all_knowledge(
  query_embedding vector(1536),
  p_project_group_id UUID DEFAULT NULL,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
) RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  source TEXT,
  source_type TEXT,
  similarity float
) 
LANGUAGE plpgsql STABLE
SET search_path = public, extensions
AS $$
BEGIN
  RETURN QUERY
  WITH combined AS (
    -- Search course knowledge
    SELECT 
      ck.id,
      ck.page_title AS title,
      ck.content,
      'course'::text AS source,
      ck.content_type AS source_type,
      (1 - (ck.embedding <=> query_embedding))::float AS similarity
    FROM public.course_knowledge ck
    WHERE 
      ck.embedding IS NOT NULL
      AND (1 - (ck.embedding <=> query_embedding)) > match_threshold
    
    UNION ALL
    
    -- Search project knowledge (if project_group_id provided)
    SELECT 
      pk.id,
      pk.title,
      pk.content,
      'project'::text AS source,
      pk.source_type,
      (1 - (pk.embedding <=> query_embedding))::float AS similarity
    FROM public.project_knowledge pk
    WHERE 
      p_project_group_id IS NOT NULL
      AND pk.project_group_id = p_project_group_id
      AND pk.embedding IS NOT NULL
      AND (1 - (pk.embedding <=> query_embedding)) > match_threshold
  )
  SELECT * FROM combined
  ORDER BY combined.similarity DESC
  LIMIT match_count;
END;
$$;