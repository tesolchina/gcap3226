/**
 * Error Handling & Debugging Utilities
 * 
 * This module provides a consistent error tracking system across the application.
 * It includes logging, error formatting, and user-friendly error message generation.
 * 
 * @module error-handler
 */

import { toast } from "sonner";

/**
 * Error severity levels for categorizing issues
 */
export type ErrorSeverity = "info" | "warning" | "error" | "critical";

/**
 * Structured error object for consistent error handling
 */
export interface AppError {
  message: string;
  code?: string;
  severity: ErrorSeverity;
  context?: Record<string, unknown>;
  originalError?: Error;
  timestamp: Date;
}

/**
 * Creates a structured AppError from any error type
 * 
 * @param error - The original error (can be Error, string, or unknown)
 * @param context - Additional context about where/why the error occurred
 * @param severity - How severe the error is
 * @returns Structured AppError object
 * 
 * @example
 * ```ts
 * try {
 *   await fetchData();
 * } catch (err) {
 *   const appError = createAppError(err, { component: 'DataLoader' }, 'error');
 *   logError(appError);
 * }
 * ```
 */
export function createAppError(
  error: unknown,
  context?: Record<string, unknown>,
  severity: ErrorSeverity = "error"
): AppError {
  const timestamp = new Date();
  
  // Handle different error types
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      severity,
      context,
      originalError: error,
      timestamp,
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      severity,
      context,
      timestamp,
    };
  }
  
  return {
    message: "An unexpected error occurred",
    severity,
    context: { ...context, rawError: error },
    timestamp,
  };
}

/**
 * Logs an error to the console with structured formatting
 * Useful for debugging during development
 * 
 * @param error - The AppError to log
 */
export function logError(error: AppError): void {
  const logMethod = error.severity === "critical" || error.severity === "error" 
    ? console.error 
    : error.severity === "warning" 
      ? console.warn 
      : console.info;
  
  logMethod(
    `[${error.severity.toUpperCase()}] ${error.timestamp.toISOString()}`,
    "\nMessage:", error.message,
    error.code ? `\nCode: ${error.code}` : "",
    error.context ? "\nContext:" : "",
    error.context || "",
    error.originalError ? "\nStack:" : "",
    error.originalError?.stack || ""
  );
}

/**
 * Shows a user-friendly toast notification for an error
 * Abstracts away the error details from end users
 * 
 * @param error - The AppError or string message to display
 * @param title - Optional custom title for the toast
 */
export function showErrorToast(
  error: AppError | string,
  title: string = "Error"
): void {
  const message = typeof error === "string" ? error : error.message;
  
  toast.error(title, {
    description: message,
  });
}

/**
 * Combined error handler that logs and shows toast
 * Use this as the primary error handling function
 * 
 * @param error - The error to handle
 * @param context - Additional context for logging
 * @param userMessage - Optional user-friendly message (defaults to error message)
 * 
 * @example
 * ```ts
 * try {
 *   await supabase.from('users').insert(data);
 * } catch (err) {
 *   handleError(err, { action: 'createUser' }, 'Failed to create user');
 * }
 * ```
 */
export function handleError(
  error: unknown,
  context?: Record<string, unknown>,
  userMessage?: string
): AppError {
  const appError = createAppError(error, context);
  
  // Log for debugging
  logError(appError);
  
  // Show user-friendly message
  showErrorToast(userMessage || appError.message);
  
  return appError;
}

/**
 * Wraps an async function with error handling
 * Useful for event handlers and callbacks
 * 
 * @param fn - The async function to wrap
 * @param context - Context to include in error logs
 * @returns Wrapped function that handles errors
 * 
 * @example
 * ```ts
 * const handleSubmit = withErrorHandling(
 *   async (data) => {
 *     await saveData(data);
 *   },
 *   { component: 'SubmitForm' }
 * );
 * ```
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: Record<string, unknown>
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, context);
      return undefined;
    }
  };
}

/**
 * Validates that required fields are present in an object
 * Throws a descriptive error if any are missing
 * 
 * @param obj - The object to validate
 * @param requiredFields - Array of required field names
 * @param entityName - Name of the entity for error messages
 * 
 * @example
 * ```ts
 * validateRequiredFields(
 *   { name: 'John' },
 *   ['name', 'email'],
 *   'User'
 * );
 * // Throws: "User is missing required fields: email"
 * ```
 */
export function validateRequiredFields(
  obj: Record<string, unknown>,
  requiredFields: string[],
  entityName: string = "Object"
): void {
  const missing = requiredFields.filter(field => {
    const value = obj[field];
    return value === undefined || value === null || value === "";
  });
  
  if (missing.length > 0) {
    throw new Error(
      `${entityName} is missing required fields: ${missing.join(", ")}`
    );
  }
}
