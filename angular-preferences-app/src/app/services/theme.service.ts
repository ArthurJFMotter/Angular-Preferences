import { Injectable, signal } from "@angular/core";
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
}