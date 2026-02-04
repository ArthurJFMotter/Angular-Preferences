export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarData {
  message: string;
  type: SnackbarType;
  action?: string; // Optional button text
  icon?: string;   // Optional override icon
}