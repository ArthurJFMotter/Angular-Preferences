import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreferencesService } from 'ng-material-preferences';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';

export type NotificationType =
  | 'default'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

export interface NotificationAction {
  label: string;
  actionFn: () => void;
}

export interface NotificationData {
  message: string;
  type: NotificationType;
  icon?: string;
  action?: NotificationAction;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  private prefs = inject(PreferencesService);

  show(
    type: NotificationType,
    message: string,
    action?: NotificationAction,
    customDuration?: number,
  ): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type, action } as NotificationData,
      duration: customDuration ?? 4000,

      // Fallback safely if notifications domain is omitted
      horizontalPosition: this.prefs.hasNotifications
        ? this.prefs.snackbarHPosition()
        : 'center',
      verticalPosition: this.prefs.hasNotifications
        ? this.prefs.snackbarVPosition()
        : 'bottom',

      panelClass: type !== 'default' ? [`snackbar-${type}`] : undefined,
    });
  }
}
