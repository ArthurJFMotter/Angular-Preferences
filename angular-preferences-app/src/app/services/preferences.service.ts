import { effect, Injectable, inject, PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DensityService } from "./density.service";
import { ThemeService } from "./theme.service";
import { TypographyService } from "./typography.service";
import { DaltonicFilterType } from "../models/filter.model";
import { UserPreferences } from "../models/preferences.model";
import { I18nService } from "./i18n.service";

const STORAGE_KEY = 'user-app-preferences';

@Injectable({
    providedIn: 'root',
})
export class PreferencesService {
    private platformId = inject(PLATFORM_ID);
    private document = inject(DOCUMENT);

    // Inject the individual services
    private densityService = inject(DensityService);
    private i18nService = inject(I18nService);
    private themeService = inject(ThemeService);
    private typographyService = inject(TypographyService);

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

                // Apply loaded preferences to services
                this.themeService.setTheme(prefs.themeId ?? this.themeService.getThemes()[0].id);
                this.themeService.isDarkMode.set(prefs.isDarkMode ?? false);
                this.themeService.isHighContrastMode.set(prefs.isHighContrastMode ?? false);
                this.themeService.isReducedMotion.set(prefs.isReducedMotion ?? false);
                this.themeService.setColorFilter(prefs.activeColorFilter ?? 'none');
                this.typographyService.setFont(prefs.fontId ?? this.typographyService.defaultFont.id);
                this.typographyService.setFontSize(prefs.fontSizeId ?? this.typographyService.defaultFontSize.id);
                this.densityService.setDensity(prefs.densityValue ?? 0);
            }
        } catch (e) {
            console.error("Failed to load or parse user preferences from localStorage.", e);
        }
    }

    private savePreferences(localeOverride?: string): void {
        if (isPlatformBrowser(this.platformId)) {
            const prefs: UserPreferences = {
                localeId: localeOverride ?? this.i18nService.currentLocale,
                themeId: this.themeService.currentTheme().id,
                isDarkMode: this.themeService.isDarkMode(),
                isHighContrastMode: this.themeService.isHighContrastMode(),
                isReducedMotion: this.themeService.isReducedMotion(),
                activeColorFilter: this.themeService.activeColorFilter(),
                fontId: this.typographyService.activeFont().id,
                fontSizeId: this.typographyService.activeFontSize().id,
                densityValue: this.densityService.currentDensity().value,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        }
    }

    // --- Public Actions ---
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

    public setLocale(localeId: string): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.savePreferences(localeId);

        const sourceLocale = 'en-US';

        const localeUrlPrefixes = this.i18nService.supportedLocales
            .map(l => l.id)
            .filter(id => id !== sourceLocale)
            .map(id => `/${id}`);

        let currentPath = this.document.location.pathname;

        // --- AGGRESSIVELY CLEAN THE CURRENT PATH ---
        let wasStripped;
        do {
            wasStripped = false;
            for (const prefix of localeUrlPrefixes) {
                if (currentPath.startsWith(prefix + '/') || currentPath === prefix) {
                    currentPath = currentPath.substring(prefix.length);
                    if (currentPath === '') {
                        currentPath = '/';
                    }
                    wasStripped = true;
                    break;
                }
            }
        } while (wasStripped);

        const newPrefix = localeId === sourceLocale ? '' : `/${localeId}`;
        const newPath = newPrefix + currentPath;

        // Reconstruct the final URL and redirect
        const finalUrl = this.document.location.origin + newPath + this.document.location.search;
        this.document.location.href = finalUrl;
    }

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

    // --- Centralized DOM Effects ---
    private updateColorThemeClass = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        const theme = this.themeService.currentTheme();
        const themeClasses = this.themeService.getThemes().map((t) => `${t.id}-theme`);
        this.document.body.classList.remove(...themeClasses);
        this.document.body.classList.add(`${theme.id}-theme`);
    });

    private updateDarkModeClass = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        this.document.body.classList.toggle('dark-mode', this.themeService.isDarkMode());
    });

    private updateHighContrastClass = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        this.document.body.classList.toggle('high-contrast-mode', this.themeService.isHighContrastMode());
    });

    private updateColorFilterClass = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        const activeFilter = this.themeService.activeColorFilter();
        const allFilterClasses = this.themeService.getDaltonicFilters().map(f => `filter-${f.id}`);
        this.document.body.classList.remove(...allFilterClasses);
        if (activeFilter !== 'none') {
            this.document.body.classList.add(`filter-${activeFilter}`);
        }
    });

    private updateDensityClass = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        const density = this.densityService.currentDensity();
        const allDensityClasses = this.densityService.getDensities().map(d => d.id);
        this.document.body.classList.remove(...allDensityClasses);
        this.document.body.classList.add(density.id);
    });

    private updateFontSize = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        const newSize = this.typographyService.activeFontSize();
        this.document.documentElement.style.setProperty('--app-typography', `${newSize.pixelValue}px`);
    });

    private updateFontFamily = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        const newFont = this.typographyService.activeFont();
        this.typographyService.getFonts().forEach(font => {
            this.document.documentElement.classList.remove(font.cssClass);
        });
        this.document.documentElement.classList.add(newFont.cssClass);
    });

    private updateReducedMotionClass = effect(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        this.document.documentElement.classList.toggle('reduced-motion', this.themeService.isReducedMotion());
    });
}