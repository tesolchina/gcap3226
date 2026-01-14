/**
 * Library Utilities Index
 * 
 * This barrel file exports all utility functions and modules.
 * These are framework-agnostic helpers used throughout the application.
 * 
 * Usage:
 * ```ts
 * import { cn, handleError } from '@/lib';
 * ```
 * 
 * @module lib
 */

// CSS class name utilities (from shadcn)
export { cn } from './utils';

// Error handling and debugging utilities
export {
  createAppError,
  logError,
  showErrorToast,
  handleError,
  withErrorHandling,
  validateRequiredFields,
  type AppError,
  type ErrorSeverity,
} from './error-handler';

// AI chat streaming utilities
export { streamChat, streamProjectChat } from './ai-chat';
