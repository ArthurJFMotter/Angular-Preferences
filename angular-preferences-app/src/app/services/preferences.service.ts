import {
  effect,
  Injectable,
  inject,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';
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

  // Exposing the domain services so components can use them directly if needed
  public densityService = inject(DensityService);
  public themeService = inject(ThemeService);
  public typographyService = inject(TypographyService);
  public shapeService = inject(ShapeService);

  showFab = signal<boolean>(true);
  showTooltips = signal<boolean>(true);
  themeMode = signal<ThemeMode>('auto');
  contrastMode = signal<ContrastMode>('auto');

  private systemDarkMode = signal<boolean>(false);
  private systemHighContrast = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSystemListeners();

      // 1. We load the preferences ONCE silently (without triggering saves)
      untracked(() => this.loadPreferences());

      // 2. ✨ THE MAGIC AUTO-SAVE EFFECT ✨
      // Because we read all these signals here, Angular tracks them automatically.
      // If ANY of these signals change anywhere in the app, this effect fires and saves!
      effect(() => {
        this.savePreferences();
      });
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

        this.showFab.set(prefs.showFab ?? true);
        this.showTooltips.set(prefs.showTooltips ?? true);

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
    if (!isPlatformBrowser(this.platformId)) return;

    const prefs: UserPreferences = {
      themeId: this.themeService.currentTheme().id,
      themeMode: this.themeMode(),
      contrastMode: this.contrastMode(),
      isReducedMotion: this.themeService.isReducedMotion(),
      activeColorFilter: this.themeService.activeColorFilter(),
      showFab: this.showFab(),
      showTooltips: this.showTooltips(),
      notifications: {
        useLegacy: this.themeService.useLegacyNotifications(),
        forceHighContrast: this.themeService.forceHighContrastNotifications(),
        placement: this.themeService.notificationPlacement(),
      },
      fontId: this.typographyService.activeFont().id,
      fontSizeId: this.typographyService.activeFontSize().id,
      densityValue: this.densityService.currentDensity().value,
      borderRadiusId: this.shapeService.activeShape().id,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }

    // --- Public Actions ---
  public setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
  }

  public setContrastMode(mode: ContrastMode): void {
    this.contrastMode.set(mode);
  }

  public toggleFab(): void {
    this.showFab.update((v) => !v);
  }

  public toggleTooltips() {
    this.showTooltips.update((v) => !v);
  }

  public toggleDarkMode(): void {
    const current = this.themeMode();
    this.themeMode.set(
      current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light',
    );
  }

  public toggleHighContrastMode(): void {
    const current = this.contrastMode();
    this.contrastMode.set(
      current === 'normal' ? 'high' : current === 'high' ? 'auto' : 'normal',
    );
  }

  public resetToDefaults(): void {
    this.themeService.setTheme(this.themeService.getThemes()[0].id);
    this.themeMode.set('auto');
    this.contrastMode.set('auto');
    this.themeService.isReducedMotion.set(false);
    this.themeService.activeColorFilter.set('none');
    this.showFab.set(true);
    this.showTooltips.set(true);
    this.themeService.useLegacyNotifications.set(false);
    this.themeService.forceHighContrastNotifications.set(false);
    this.themeService.notificationPlacement.set('bottom-center');
    this.typographyService.setFont(this.typographyService.defaultFont.id);
    this.typographyService.setFontSize(
      this.typographyService.defaultFontSize.id,
    );
    this.densityService.setDensity(0);
    this.shapeService.setShape(this.shapeService.defaultShape.id);
  }

  // --- Effects ---
  private updateDarkModeClass = effect(() => {
    const mode = this.themeMode();
    const systemIsDark = this.systemDarkMode();

    const isActive = mode === 'dark' || (mode === 'auto' && systemIsDark);

    this.themeService.isDarkMode.set(isActive);

    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.classList.toggle('dark-mode', isActive);
    }
  });

  private updateHighContrastClass = effect(() => {
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
  });

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
    const currentDensity = this.densityService.currentDensity();

    this.densityService.getDensities().forEach((d) => {
      this.document.documentElement.classList.remove(d.id);
    });

    this.document.documentElement.classList.add(currentDensity.id);
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

    this.document.documentElement.style.setProperty(
      '--app-font-plain',
      newFont.plainFamily,
    );
    this.document.documentElement.style.setProperty(
      '--app-font-brand',
      newFont.brandFamily,
    );
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
