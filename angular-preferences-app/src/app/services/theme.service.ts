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
    private readonly themes: Theme[] = []

    currentTheme = signal<Theme>(this.themes[0]);

    getThemes(): Theme[] {
        return this.themes;
    }

    setTheme(id: string): void {
        const theme = this.themes.find((t) => t.id === id);
        if (theme) {
            this.currentTheme.set(theme);
        }
    }

    updateThemeClass = effect(() => {
         const theme = this.currentTheme();
         document.body.classList.remove(...this.themes.map((t) => `${t.id}-theme`));
         document.body.classList.add(`${theme.id}-theme`);
    })
}