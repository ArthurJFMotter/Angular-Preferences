import { NotificationPlacement } from './preferences.model';
import { SnackbarType } from '../providers/snackbar.provider';

export interface SnackbarData {
  message: string;
  type: SnackbarType;
  action?: string;
  icon: string;
  placement: NotificationPlacement;
  useLegacyStyle: boolean;
  forceHighContrast: boolean;
}

export interface SnackbarConfig extends Partial<Omit<SnackbarData, 'message'>> {
  message: string; 
  duration?: number;
}

export interface RequiredSnackbarConfig extends SnackbarData {
  duration: number;
}