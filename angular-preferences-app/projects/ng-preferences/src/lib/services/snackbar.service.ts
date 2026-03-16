import { inject, Injectable, Type } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  SnackbarData,
  SnackbarConfig,
  RequiredSnackbarConfig,
} from '../models/snackbar.model';
import { NotificationPlacement } from '../models/preferences.model';
import {
  SnackbarConfigService,
  SnackbarType,
} from '../providers/snackbar.provider';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);
  private configService = inject(SnackbarConfigService);

  public show<T>(
    component: Type<T>,
    config: SnackbarConfig | string,
    type?: SnackbarType,
    action?: string,
    duration?: number,
  ): void {
    const finalConfig = this.normalizeConfig(config, type, action, duration);
    const mergedConfig = this.mergeWithDefaults(finalConfig);

    const data: SnackbarData = {
      message: mergedConfig.message,
      type: mergedConfig.type,
      action: mergedConfig.action,
      icon: mergedConfig.icon,
      placement: mergedConfig.placement,
      useLegacyStyle: mergedConfig.useLegacyStyle,
      forceHighContrast: mergedConfig.forceHighContrast,
    };

    const { vertical, horizontal } = this.getMaterialPosition(
      mergedConfig.placement,
    );

    const matConfig: MatSnackBarConfig = {
      duration: mergedConfig.duration,
      data: data,
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: ['app-notification-panel', `pos-${mergedConfig.placement}`],
    };

    this.snackBar.openFromComponent(component, matConfig);
  }

  private normalizeConfig(
    config: SnackbarConfig | string,
    type?: SnackbarType,
    action?: string,
    duration?: number,
  ): SnackbarConfig {
    if (typeof config === 'string') {
      return { message: config, type: type || 'info', action, duration };
    }
    return config;
  }

  private mergeWithDefaults(config: SnackbarConfig): RequiredSnackbarConfig {
    return {
      message: config.message,
      type: config.type || 'info',
      action: config.action,
      duration: config.duration ?? this.configService.getDuration(config.type),
      icon: config.icon || this.configService.getIcon(config.type || 'info'),
      placement: config.placement ?? this.configService.getDefaultPlacement(),
      useLegacyStyle:
        config.useLegacyStyle ?? this.configService.shouldUseLegacyStyle(),
      forceHighContrast:
        config.forceHighContrast ??
        this.configService.shouldForceHighContrast(),
    };
  }

  private getMaterialPosition(placement: NotificationPlacement): {
    vertical: MatSnackBarVerticalPosition;
    horizontal: MatSnackBarHorizontalPosition;
  } {
    const parts = placement.split('-');
    return {
      vertical: parts[0] as MatSnackBarVerticalPosition,
      horizontal: parts[1] as MatSnackBarHorizontalPosition,
    };
  }

  // Wrappers
  public success<T>(
    component: Type<T>,
    message: string,
    action?: string,
    duration?: number,
  ): void {
    this.show(component, { message, type: 'success', action, duration });
  }

  public error<T>(
    component: Type<T>,
    message: string,
    action?: string,
    duration?: number,
  ): void {
    this.show(component, { message, type: 'error', action, duration });
  }

  public warning<T>(
    component: Type<T>,
    message: string,
    action?: string,
    duration?: number,
  ): void {
    this.show(component, { message, type: 'warning', action, duration });
  }

  public info<T>(
    component: Type<T>,
    message: string,
    action?: string,
    duration?: number,
  ): void {
    this.show(component, { message, type: 'info', action, duration });
  }
}
