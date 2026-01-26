import { Injectable, signal } from '@angular/core';
import { Theme } from '../models/theme.model';
import { DaltonicFilter, DaltonicFilterType } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // --- STATE ---
  private readonly themes: Theme[] = [
    { id: 'blue', primary: '#0047AB', displayName: 'Blue' },
    { id: 'teal', primary: '#006A6A', displayName: 'Teal' },
    { id: 'orange', primary: '#894A00', displayName: 'Orange' },
    { id: 'pink', primary: '#9C405C', displayName: 'Pink' },
    { id: 'purple', primary: '#6750A4', displayName: 'Purple' },
    { id: 'green', primary: '#028A0F', displayName: 'Green' },
    { id: 'red', primary: '#A91B0D', displayName: 'Red' },
  ];

  private readonly daltonicFilters: DaltonicFilter[] = [
    { id: 'none', displayName: 'Default' },
    { id: 'protanopia', displayName: 'Protanopia' },
    { id: 'deuteranopia', displayName: 'Deuteranopia' },
    { id: 'tritanopia', displayName: 'Tritanopia' },
    { id: 'achromatopsia', displayName: 'Achromatopsia' },
  ];

  activeColorFilter = signal<DaltonicFilterType>('none');
  currentTheme = signal<Theme>(this.themes[0]);
  isDarkMode = signal<boolean>(false);
  isHighContrastMode = signal<boolean>(false);
  isReducedMotion = signal<boolean>(false);

  // --- GETTERS ---
  getThemes() {
    return this.themes;
  }

  getDaltonicFilters() {
    return this.daltonicFilters;
  }

  // --- ACTIONS ---
  setTheme(id: string) {
    const theme = this.themes.find((t) => t.id === id) ?? this.themes[0];
    this.currentTheme.set(theme);
  }

  setColorFilter(filterId: DaltonicFilterType) {
    this.activeColorFilter.set(filterId);
  }

  toggleDarkMode() {
    this.isDarkMode.update((v) => !v);
  }

  toggleHighContrastMode() {
    this.isHighContrastMode.update((v) => !v);
  }

  toggleReducedMotion() {
    this.isReducedMotion.update((v) => !v);
  }
}
