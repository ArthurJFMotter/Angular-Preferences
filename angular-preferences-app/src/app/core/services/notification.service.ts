import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreferencesService } from 'ng-material-preferences';

export type NotificationType = 'default' | 'success' | 'warning' | 'info' | 'error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  private prefs = inject(PreferencesService);

  show(type: NotificationType, message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
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