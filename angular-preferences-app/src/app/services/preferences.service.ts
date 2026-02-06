import { effect, Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// Services
import { DensityService } from './density.service';
import { ThemeService } from './theme.service';
import { TypographyService } from './typography.service';
import { ShapeService } from './shape.service';

// Models
import { DaltonicFilterType } from '../models/filter.model';
import { UserPreferences } from '../models/preferences.model';

const STORAGE_KEY = 'user-app-preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  private densityService = inject(DensityService);
  private themeService = inject(ThemeService);
  private typographyService = inject(TypographyService);
  private shapeService = inject(ShapeService);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPreferences();
    }
  }

  // --- Core Preference Management ---
  private loadPreferences(): void {
    try {
      const savedPrefs = localStorage.getItem(STORAGE_KEY);
      if (savedPrefs) {
        const prefs: UserPreferences = JSON.parse(savedPrefs);

        this.themeService.setTheme(
          prefs.themeId ?? this.themeService.getThemes()[0].id,
        );
        this.themeService.isDarkMode.set(prefs.isDarkMode ?? false);
        this.themeService.isHighContrastMode.set(
          prefs.isHighContrastMode ?? false,
        );
        this.themeService.isReducedMotion.set(prefs.isReducedMotion ?? false);
        this.themeService.activeColorFilter.set(
          prefs.activeColorFilter ?? 'none',
        );

        this.themeService.useLegacyNotifications.set(
          prefs.useLegacyNotifications ?? false,
        );
        this.themeService.forceHighContrastNotifications.set(
          prefs.forceHighContrastNotifications ?? false,
        );

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
        themeId: this.themeService.currentTheme().id,
        isDarkMode: this.themeService.isDarkMode(),
        isHighContrastMode: this.themeService.isHighContrastMode(),
        isReducedMotion: this.themeService.isReducedMotion(),
        activeColorFilter: this.themeService.activeColorFilter(),
        useLegacyNotifications: this.themeService.useLegacyNotifications(),
        forceHighContrastNotifications:
          this.themeService.forceHighContrastNotifications(),
        fontId: this.typographyService.activeFont().id,
        fontSizeId: this.typographyService.activeFontSize().id,
        densityValue: this.densityService.currentDensity().value,
        borderRadiusId: this.shapeService.activeShape().id,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }
  }

  // --- New Toggles ---
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

  // --- Public Actions ---
  public setTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
    this.savePreferences();
  }

  public toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
    this.savePreferences();
  }

  public toggleHighContrastMode(): void {
    this.themeService.toggleHighContrastMode();
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
    this.themeService.setTheme(this.themeService.getThemes()[0].id);
    this.themeService.isDarkMode.set(false);
    this.themeService.isHighContrastMode.set(false);
    this.themeService.isReducedMotion.set(false);
    this.themeService.activeColorFilter.set('none');

    this.themeService.useLegacyNotifications.set(false);
    this.themeService.forceHighContrastNotifications.set(false);

    this.typographyService.setFont(this.typographyService.defaultFont.id);
    this.typographyService.setFontSize(
      this.typographyService.defaultFontSize.id,
    );
    this.densityService.setDensity(0);
    this.shapeService.setShape(this.shapeService.defaultShape.id);

    this.savePreferences();
  }

  // --- Effects ---
  private updateColorThemeClass = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const theme = this.themeService.currentTheme();
    const allThemeClasses = this.themeService
      .getThemes()
      .map((t) => `${t.id}-theme`);
    this.document.documentElement.classList.remove(...allThemeClasses);
    this.document.documentElement.classList.add(`${theme.id}-theme`);
  });

  private updateDarkModeClass = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    this.document.documentElement.classList.toggle(
      'dark-mode',
      this.themeService.isDarkMode(),
    );
  });

  private updateHighContrastClass = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    this.document.documentElement.classList.toggle(
      'high-contrast-mode',
      this.themeService.isHighContrastMode(),
    );
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
