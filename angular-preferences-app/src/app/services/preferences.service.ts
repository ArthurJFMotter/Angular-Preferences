import { effect, Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// Services
import { DensityService } from './density.service';
import { ThemeService } from './theme.service';
import { TypographyService } from './typography.service';
import { ShapeService } from './shape.service';

// Models
import { DaltonicFilterType } from '../models/filter.model';
import {
  NotificationPlacement,
  UserPreferences,
  ThemeMode,
  ContrastMode,
} from '../models/preferences.model';

const STORAGE_KEY = 'user-app-preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  private densityService = inject(DensityService);
  public themeService = inject(ThemeService);
  private typographyService = inject(TypographyService);
  private shapeService = inject(ShapeService);

  // --- PREFERENCE STATE (Tri-State) ---
  themeMode = signal<ThemeMode>('auto');
  contrastMode = signal<ContrastMode>('auto');

  // --- SYSTEM STATE ---
  private systemDarkMode = signal<boolean>(false);
  private systemHighContrast = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSystemListeners();
      this.loadPreferences();
    }
  }

  // --- System Listeners (Media Queries) ---
  private initSystemListeners() {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    this.systemDarkMode.set(darkQuery.matches);
    this.systemHighContrast.set(contrastQuery.matches);

    darkQuery.addEventListener('change', (e) => {
      this.systemDarkMode.set(e.matches);
    });

    contrastQuery.addEventListener('change', (e) => {
      this.systemHighContrast.set(e.matches);
    });
  }

  // --- Core Preference Management ---
  private loadPreferences(): void {
    try {
      const savedPrefs = localStorage.getItem(STORAGE_KEY);
      if (savedPrefs) {
        const prefs: any = JSON.parse(savedPrefs);

        // 1. Load Visuals
        this.themeService.setTheme(
          prefs.themeId ?? this.themeService.getThemes()[0].id,
        );

        if (prefs.themeMode) {
          this.themeMode.set(prefs.themeMode);
        } else {
          this.themeMode.set(prefs.isDarkMode ? 'dark' : 'light');
        }

        if (prefs.contrastMode) {
          this.contrastMode.set(prefs.contrastMode);
        } else {
          this.contrastMode.set(prefs.isHighContrastMode ? 'high' : 'normal');
        }

        this.themeService.isReducedMotion.set(prefs.isReducedMotion ?? false);
        this.themeService.activeColorFilter.set(
          prefs.activeColorFilter ?? 'none',
        );

        // 2. Load Notifications
        const notifPrefs = prefs.notifications || {};

        this.themeService.useLegacyNotifications.set(
          notifPrefs.useLegacy ?? prefs.useLegacyNotifications ?? false,
        );
        this.themeService.forceHighContrastNotifications.set(
          notifPrefs.forceHighContrast ??
            prefs.forceHighContrastNotifications ??
            false,
        );
        this.themeService.notificationPlacement.set(
          notifPrefs.placement ?? 'bottom-center',
        );

        // 3. Load Components
        this.typographyService.setFont(
          prefs.fontId ?? this.typographyService.defaultFont.id,
        );
        this.typographyService.setFontSize(
          prefs.fontSizeId ?? this.typographyService.defaultFontSize.id,
        );
        this.densityService.setDensity(prefs.densityValue ?? 0);
        this.shapeService.setShape(
          prefs.borderRadiusId ?? this.shapeService.defaultShape.id,
        );
      }
    } catch (e) {
      console.error('Failed to load preferences.', e);
    }
  }

  private savePreferences(): void {
    if (isPlatformBrowser(this.platformId)) {
      const prefs: UserPreferences = {
        // Visuals
        themeId: this.themeService.currentTheme().id,
        themeMode: this.themeMode(),
        contrastMode: this.contrastMode(),
        isReducedMotion: this.themeService.isReducedMotion(),
        activeColorFilter: this.themeService.activeColorFilter(),

        // Notifications
        notifications: {
          useLegacy: this.themeService.useLegacyNotifications(),
          forceHighContrast: this.themeService.forceHighContrastNotifications(),
          placement: this.themeService.notificationPlacement(),
        },

        // Components
        fontId: this.typographyService.activeFont().id,
        fontSizeId: this.typographyService.activeFontSize().id,
        densityValue: this.densityService.currentDensity().value,
        borderRadiusId: this.shapeService.activeShape().id,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }
  }

  // --- Public Actions ---
  public setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    this.savePreferences();
  }

  public setContrastMode(mode: ContrastMode): void {
    this.contrastMode.set(mode);
    this.savePreferences();
  }

  // --- Legacy Boolean Toggles (Optional Wrapper) ---
  public toggleDarkMode(): void {
    const current = this.themeMode();
    if (current === 'light') this.setThemeMode('dark');
    else if (current === 'dark') this.setThemeMode('auto');
    else this.setThemeMode('light');
  }

  public toggleHighContrastMode(): void {
    const current = this.contrastMode();
    if (current === 'normal') this.setContrastMode('high');
    else if (current === 'high') this.setContrastMode('auto');
    else this.setContrastMode('normal');
  }

  // --- Public Actions ---
  public toggleLegacyNotifications(): void {
    const current = this.themeService.useLegacyNotifications();
    this.themeService.useLegacyNotifications.set(!current);
    this.savePreferences();
  }

  public toggleForceHighContrastNotifications(): void {
    const current = this.themeService.forceHighContrastNotifications();
    this.themeService.forceHighContrastNotifications.set(!current);
    this.savePreferences();
  }

  public setNotificationPlacement(placement: NotificationPlacement): void {
    this.themeService.setNotificationPlacement(placement);
    this.savePreferences();
  }

  public setTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
    this.savePreferences();
  }

  public toggleReducedMotion(): void {
    this.themeService.toggleReducedMotion();
    this.savePreferences();
  }

  public setColorFilter(filterId: DaltonicFilterType): void {
    this.themeService.setColorFilter(filterId);
    this.savePreferences();
  }

  public setDensity(value: number): void {
    this.densityService.setDensity(value);
    this.savePreferences();
  }

  public setFont(fontId: string): void {
    this.typographyService.setFont(fontId);
    this.savePreferences();
  }

  public setFontSize(sizeId: string): void {
    this.typographyService.setFontSize(sizeId);
    this.savePreferences();
  }

  public setShape(shapeId: string): void {
    this.shapeService.setShape(shapeId);
    this.savePreferences();
  }

  public resetToDefaults(): void {
    // Reset Visuals
    this.themeService.setTheme(this.themeService.getThemes()[0].id);
    this.themeMode.set('auto');
    this.contrastMode.set('auto');

    this.themeService.isReducedMotion.set(false);
    this.themeService.activeColorFilter.set('none');

    // Reset Notifications
    this.themeService.useLegacyNotifications.set(false);
    this.themeService.forceHighContrastNotifications.set(false);
    this.themeService.notificationPlacement.set('bottom-center');

    // Reset Components
    this.typographyService.setFont(this.typographyService.defaultFont.id);
    this.typographyService.setFontSize(
      this.typographyService.defaultFontSize.id,
    );
    this.densityService.setDensity(0);
    this.shapeService.setShape(this.shapeService.defaultShape.id);

    this.savePreferences();
  }

  // --- Effects ---
  private updateDarkModeClass = effect(
    () => {
      const mode = this.themeMode();
      const systemIsDark = this.systemDarkMode();

      const isActive = mode === 'dark' || (mode === 'auto' && systemIsDark);

      this.themeService.isDarkMode.set(isActive);

      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.classList.toggle('dark-mode', isActive);
      }
    },
    { allowSignalWrites: true },
  );

  private updateHighContrastClass = effect(
    () => {
      const mode = this.contrastMode();
      const systemIsContrast = this.systemHighContrast();

      const isActive = mode === 'high' || (mode === 'auto' && systemIsContrast);

      this.themeService.isHighContrastMode.set(isActive);

      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.classList.toggle(
          'high-contrast-mode',
          isActive,
        );
      }
    },
    { allowSignalWrites: true },
  );

  private updateColorThemeClass = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const theme = this.themeService.currentTheme();
    const allThemeClasses = this.themeService
      .getThemes()
      .map((t) => `${t.id}-theme`);
    this.document.documentElement.classList.remove(...allThemeClasses);
    this.document.documentElement.classList.add(`${theme.id}-theme`);
  });

  private updateColorFilterClass = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const activeFilter = this.themeService.activeColorFilter();
    const allFilterClasses = this.themeService
      .getDaltonicFilters()
      .map((f) => `filter-${f.id}`);
    this.document.documentElement.classList.remove(...allFilterClasses);
    if (activeFilter !== 'none') {
      this.document.documentElement.classList.add(`filter-${activeFilter}`);
    }
  });

  private updateDensityClass = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const density = this.densityService.currentDensity();
    [0, 1, 2, 3, 4, 5].forEach((i) => {
      this.document.documentElement.classList.remove(`density-${i}`);
      this.document.documentElement.classList.remove(`density--${i}`);
    });
    this.document.documentElement.classList.add(density.id);
  });

  private updateFontSize = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const newSize = this.typographyService.activeFontSize();
    this.document.documentElement.style.setProperty(
      '--app-typography',
      `${newSize.pixelValue}px`,
    );
  });

  private updateFontFamily = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const newFont = this.typographyService.activeFont();
    this.typographyService.getFonts().forEach((font) => {
      this.document.documentElement.classList.remove(font.cssClass);
    });
    this.document.documentElement.classList.add(newFont.cssClass);
  });

  private updateReducedMotionClass = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    this.document.documentElement.classList.toggle(
      'reduced-motion',
      this.themeService.isReducedMotion(),
    );
  });

  private updateShapeVariable = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const shape = this.shapeService.activeShape();
    this.document.documentElement.style.setProperty(
      '--app-border-radius',
      `${shape.pixelValue}px`,
    );
  });
}
