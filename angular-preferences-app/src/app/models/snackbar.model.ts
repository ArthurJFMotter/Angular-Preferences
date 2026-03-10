import { NotificationPlacement } from './preferences.model';
import { SnackbarType } from '../providers/snackbar.provider';

export interface SnackbarData {
  message: string;
  type: SnackbarType;
  action?: string;
  icon?: string;
  placement?: NotificationPlacement;
  useLegacyStyle?: boolean;
  forceHighContrast?: boolean;
}

export interface SnackbarConfig {
  message: string;
  type?: SnackbarType;
  action?: string;
  duration?: number;
  icon?: string;
  placement?: NotificationPlacement;
  useLegacyStyle?: boolean;
  forceHighContrast?: boolean;
}

// Helper type for merged config with all required fields
export type RequiredSnackbarConfig = {
  message: string;
  type: SnackbarType;
  action?: string;
  duration: number;
  icon: string;
  placement: NotificationPlacement;
  useLegacyStyle: boolean;
  forceHighContrast: boolean;
};
