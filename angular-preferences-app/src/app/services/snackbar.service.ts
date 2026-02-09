import { inject, Injectable } from '@angular/core';
import { 
  MatSnackBar, 
  MatSnackBarConfig, 
  MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition 
} from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component'; 
import { SnackbarData, SnackbarType } from '../models/snackbar.model';
import { ThemeService } from './theme.service';
import { NotificationPlacement } from '../models/preferences.model';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);
  private themeService = inject(ThemeService);

  private readonly defaultDuration = 4000; 

  public show(
    message: string, 
    type: SnackbarType = 'info', 
    action?: string, 
    duration?: number,
    placementOverride?: NotificationPlacement
  ) {
    // Determine Position
    const effectivePlacement = 
      placementOverride ?? 
      this.themeService.notificationPlacement() ?? 
      'bottom-center';

    const { vertical, horizontal } = this.getMaterialPosition(effectivePlacement);

    const data: SnackbarData = { 
      message, 
      type, 
      action,
      placement: effectivePlacement
    };

    const config: MatSnackBarConfig = {
      duration: duration || this.defaultDuration,
      data: data,
      horizontalPosition: horizontal, 
      verticalPosition: vertical,
      panelClass: ['app-notification-panel', `pos-${effectivePlacement}`] 
    };

    this.snackBar.openFromComponent(CustomSnackbarComponent, config);
  }

  // --- Helpers ---
  private getMaterialPosition(placement: NotificationPlacement): { 
    vertical: MatSnackBarVerticalPosition, 
    horizontal: MatSnackBarHorizontalPosition 
  } {
    const parts = placement.split('-'); 
    const vert = parts[0] as MatSnackBarVerticalPosition; // 'top' | 'bottom'
    const horiz = parts[1] as MatSnackBarHorizontalPosition; // 'left' | 'center' | 'right'
    
    return { vertical: vert, horizontal: horiz };
  }

  // --- Wrappers ---
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