import { effect, Injectable, signal } from "@angular/core";

export interface Theme {
    id: string;
    primary: string;
    displayName: string;
}

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

    // --- STATE ---
    currentTheme = signal<Theme>(this.themes[0]);
    isDarkMode = signal<boolean>(false);
    isHighContrastMode = signal<boolean>(false);

    // --- GETTERS ---
    getThemes(): Theme[] {
        return this.themes;
    }

    // --- ACTIONS ---
    setTheme(id: string): void {
        const theme = this.themes.find((t) => t.id === id);
        if (theme) {
            this.currentTheme.set(theme);
        }
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
}