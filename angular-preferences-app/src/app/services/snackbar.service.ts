import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component'; 
import { SnackbarData, SnackbarType } from '../models/snackbar.model';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  private readonly defaultDuration = 4000; 

  public show(
    message: string, 
    type: SnackbarType = 'info', 
    action?: string, 
    duration?: number
  ) {
    const data: SnackbarData = { message, type, action };

    const config: MatSnackBarConfig = {
      duration: duration || this.defaultDuration,
      data: data,
      horizontalPosition: 'center', 
      verticalPosition: 'bottom',
      panelClass: ['app-notification-panel'] 
    };

    this.snackBar.openFromComponent(CustomSnackbarComponent, config);
  }

  // --- Helper Methods ---
  public success(message: string, action?: string, duration?: number) {
    this.show(message, 'success', action, duration);
  }

  public error(message: string, action?: string, duration?: number) {
    this.show(message, 'error', action, duration || 6000); 
  }

  public warning(message: string, action?: string, duration?: number) {
    this.show(message, 'warning', action, duration);
  }

  public info(message: string, action?: string, duration?: number) {
    this.show(message, 'info', action, duration);
  }
}