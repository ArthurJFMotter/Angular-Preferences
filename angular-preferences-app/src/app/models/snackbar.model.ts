import { NotificationPlacement } from './preferences.model';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarData {
  message: string;
  type: SnackbarType;
  action?: string;
  icon?: string;
  placement?: NotificationPlacement;
}