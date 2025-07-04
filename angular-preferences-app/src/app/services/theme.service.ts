import { effect, Injectable, signal } from "@angular/core";
import { Theme } from "../models/theme.model";
import { DaltonicFilter, DaltonicFilterType } from "../models/filter.model";

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    private readonly themes: Theme[] = [
        { id: 'blue', primary: '#0047AB', displayName: 'Azul' },
        { id: 'teal', primary: '#006A6A', displayName: 'Ciano' },
        { id: 'orange', primary: '#894A00', displayName: 'Laranja' },
        { id: 'pink', primary: '#9C405C', displayName: 'Rosa' },
        { id: 'purple', primary: '#6750A4', displayName: 'Roxo' },
        { id: 'green', primary: '#028A0F', displayName: 'Verde' },
        { id: 'red', primary: '#A91B0D', displayName: 'Vermelho' },
    ];

     private readonly daltonicFilters: DaltonicFilter[] = [
        { id: 'none', displayName: 'Padrão' },
        { id: 'protanopia', displayName: 'Protanopia' },
        { id: 'deuteranopia', displayName: 'Deuteranopia' },
        { id: 'tritanopia', displayName: 'Tritanopia' },
        { id: 'achromatopsia', displayName: 'Acromatopsia' },
    ];

    // --- STATE ---
    currentTheme = signal<Theme>(this.themes[0]);
    isDarkMode = signal<boolean>(false);
    isHighContrastMode = signal<boolean>(false);
    activeColorFilter = signal<DaltonicFilterType>('none');

    // --- GETTERS ---
    getThemes(): Theme[] {
        return this.themes;
    }

    getDaltonicFilters(): DaltonicFilter[] {
        return this.daltonicFilters;
    }

    // --- ACTIONS ---
    setTheme(id: string): void {
        const theme = this.themes.find((t) => t.id === id);
        if (theme) {
            this.currentTheme.set(theme);
        }
    }

    setColorFilter(filterId: DaltonicFilterType): void {
        this.activeColorFilter.set(filterId);
    }

    toggleDarkMode(): void {
        this.isDarkMode.update(value => !value);
    }

    toggleHighContrastMode(): void {
        this.isHighContrastMode.update(value => !value);
    }

    // --- EFFECTS ---
    updateColorThemeClass = effect(() => {
        const theme = this.currentTheme();
        const themeClasses = this.themes.map((t) => `${t.id}-theme`);

        document.body.classList.remove(...themeClasses);
        document.body.classList.add(`${theme.id}-theme`);
    });

    updateDarkModeClass = effect(() => {
        const isDark = this.isDarkMode();
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    updateHighContrastClass = effect(() => {
        const isHighContrast = this.isHighContrastMode();
        if (isHighContrast) {
            document.body.classList.add('high-contrast-mode');
        } else {
            document.body.classList.remove('high-contrast-mode');
        }
    });

    updateColorFilterClass = effect(() => {
        const activeFilter = this.activeColorFilter();
        
        const allFilterClasses = this.daltonicFilters.map(f => `filter-${f.id}`);
        document.body.classList.remove(...allFilterClasses);

        if (activeFilter !== 'none') {
            document.body.classList.add(`filter-${activeFilter}`);
        }
    });
}