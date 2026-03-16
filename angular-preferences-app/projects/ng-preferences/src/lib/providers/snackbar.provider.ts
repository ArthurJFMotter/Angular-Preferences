import { InjectionToken, Provider } from '@angular/core';
import { NotificationPlacement } from '../models/preferences.model';

// ============= CONSTANTS =============
export const SNACKBAR_TYPES = ['success', 'error', 'warning', 'info'] as const;
export type SnackbarType = (typeof SNACKBAR_TYPES)[number];

export const SNACKBAR_ICONS: Record<SnackbarType, string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

export const SNACKBAR_DEFAULT_DURATION = 4000;
export const SNACKBAR_ERROR_DURATION = 6000;

// ============= CONFIG INTERFACE =============
export interface SnackbarGlobalConfig {
  defaultDuration?: number;
  errorDuration?: number;
  defaultPlacement?: NotificationPlacement;
  defaultUseLegacyStyle?: boolean;
  defaultForceHighContrast?: boolean;
  icons?: Partial<Record<SnackbarType, string>>;
}

// ============= DEFAULT CONFIG =============
export const DEFAULT_SNACKBAR_CONFIG: SnackbarGlobalConfig = {
  defaultDuration: SNACKBAR_DEFAULT_DURATION,
  errorDuration: SNACKBAR_ERROR_DURATION,
  defaultPlacement: 'bottom-center',
  defaultUseLegacyStyle: false,
  defaultForceHighContrast: false,
  icons: SNACKBAR_ICONS,
};

// ============= INJECTION TOKEN =============
export const SNACKBAR_CONFIG = new InjectionToken<SnackbarGlobalConfig>(
  'SNACKBAR_CONFIG',
);

// ============= CONFIG PROVIDER FACTORY =============
export function provideSnackbarConfig(
  config: Partial<SnackbarGlobalConfig> = {},
): Provider {
  return {
    provide: SNACKBAR_CONFIG,
    useValue: { ...DEFAULT_SNACKBAR_CONFIG, ...config },
  };
}

// ============= CONFIG SERVICE =============
import { Injectable, Inject, Optional, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SnackbarConfigService {
  
  public globalPlacementOverride = signal<NotificationPlacement | null>(null);
  public globalLegacyStyleOverride = signal<boolean | null>(null);
  public globalHighContrastOverride = signal<boolean | null>(null);

  constructor(
    @Optional()
    @Inject(SNACKBAR_CONFIG)
    private config: SnackbarGlobalConfig | null,
  ) {}

  private getConfig(): SnackbarGlobalConfig {
    return this.config || DEFAULT_SNACKBAR_CONFIG;
  }

  getIcon(type: SnackbarType): string {
    return this.getConfig().icons?.[type] || SNACKBAR_ICONS[type] || 'info';
  }

  getDuration(type?: SnackbarType): number {
    if (type === 'error') return this.getConfig().errorDuration || SNACKBAR_ERROR_DURATION;
    return this.getConfig().defaultDuration || SNACKBAR_DEFAULT_DURATION;
  }

  getDefaultPlacement(): NotificationPlacement {
    return this.globalPlacementOverride() ?? this.getConfig().defaultPlacement ?? 'bottom-center';
  }

  shouldUseLegacyStyle(): boolean {
    return this.globalLegacyStyleOverride() ?? this.getConfig().defaultUseLegacyStyle ?? false;
  }

  shouldForceHighContrast(): boolean {
    return this.globalHighContrastOverride() ?? this.getConfig().defaultForceHighContrast ?? false;
  }
}