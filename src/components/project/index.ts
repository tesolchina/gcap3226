/**
 * Project Module Components Index
 * 
 * This barrel file exports all project management related components.
 * These components handle team collaboration, milestones, sessions, and files.
 * 
 * Usage:
 * ```ts
 * import { 
 *   ProjectMembership, 
 *   ProjectMilestones,
 *   ProjectSessions 
 * } from '@/components/project';
 * ```
 * 
 * @module project
 */

// Re-export existing components for organized imports
export { default as ProjectMembership } from '../ProjectMembership';
export { default as ProjectMilestones } from '../ProjectMilestones';
export { default as ProjectSessions } from '../ProjectSessions';
export { default as ProjectMessageBoard } from '../ProjectMessageBoard';
export { default as ProjectFileUpload } from '../ProjectFileUpload';
export { default as TopicLayout } from '../TopicLayout';

// Utility types for project components
export interface ProjectMember {
  id: string;
  student_id_last4: string;
  display_name: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  is_custom: boolean;
  display_order: number;
  due_date: string | null;
  completed_at: string | null;
}

export interface ProjectSession {
  id: string;
  title: string;
  description: string | null;
  scheduled_at: string | null;
  created_by: string | null;
  created_at: string;
}

export interface ProjectFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
  member_id: string | null;
}
