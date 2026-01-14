/**
 * Hooks Module Index
 * 
 * This barrel file exports all custom React hooks used in the application.
 * Hooks encapsulate reusable stateful logic for components.
 * 
 * Usage:
 * ```ts
 * import { useToast, usePyodide, useIsMobile } from '@/hooks';
 * ```
 * 
 * @module hooks
 */

// Toast notifications
export { useToast, toast } from './use-toast';

// Mobile detection
export { useIsMobile } from './use-mobile';

// Python runtime for notebook execution
export { usePyodide } from './usePyodide';
