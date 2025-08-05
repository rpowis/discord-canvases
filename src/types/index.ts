/**
 * Shared TypeScript type definitions for Discord Canvases Bot
 */

// Re-export config types for convenience
export type { AppConfig, CanvasConfig, Config, DatabaseConfig, DiscordConfig } from '../../config/config';

/**
 * Canvas-related types
 */
export interface Canvas {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastEditedBy?: string;
  lastEditedAt?: Date;
}

export interface CanvasCreateData {
  title: string;
  content: string;
  createdBy: string;
}

export interface CanvasUpdateData {
  title?: string;
  content?: string;
  lastEditedBy: string;
}

/**
 * Edit session types
 */
export enum EditSessionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  SAVED = 'saved',
  CANCELLED = 'cancelled'
}

export interface EditSession {
  id: string;
  canvasId: string;
  userId: string;
  status: EditSessionStatus;
  startedAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  autoSaveInterval?: NodeJS.Timeout;
}

export interface EditSessionCreateData {
  canvasId: string;
  userId: string;
  timeoutMinutes: number;
}

/**
 * Discord interaction types
 */
export interface CanvasInteractionData {
  canvasId: string;
  action: 'create' | 'edit' | 'view' | 'save' | 'close';
  userId: string;
}

export interface ModalSubmitData {
  title?: string;
  content?: string;
  canvasId?: string;
}

/**
 * Error types
 */
export class CanvasError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'CanvasError';
  }
}

export class EditSessionError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'EditSessionError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Database types
 */
export interface DatabaseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationOptions {
  limit: number;
  offset: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

/**
 * Utility types
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Event types
 */
export interface CanvasEvent {
  type: 'created' | 'updated' | 'deleted' | 'edit_started' | 'edit_ended';
  canvasId: string;
  userId: string;
  timestamp: Date;
  data?: Record<string, any>;
}

/**
 * Validation types
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface FieldValidation {
  field: string;
  value: any;
  rules: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
} 