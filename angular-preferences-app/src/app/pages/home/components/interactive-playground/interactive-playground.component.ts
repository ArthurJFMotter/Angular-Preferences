import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PreferencesService } from '../../../../services/preferences.service';
import { ThemeService } from '../../../../services/theme.service';
import { DensityService } from '../../../../services/density.service';
import { TypographyService } from '../../../../services/typography.service';

@Component({
  selector: 'app-interactive-playground',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './interactive-playground.component.html',
  styleUrls: ['./interactive-playground.component.scss']
})
export class InteractivePlaygroundComponent {
  public prefs = inject(PreferencesService);
  public densityService = inject(DensityService);
  public typographyService = inject(TypographyService);
  // ThemeService injected via provider usually, or used inside prefs

  codeSnippet = computed(() => {
    const format = (val: string) => `'${val}'`;
    const mode = this.prefs.themeMode();
    const contrast = this.prefs.contrastMode();
    const density = this.densityService.currentDensity().displayName;
    const fontSize = this.typographyService.activeFontSize().displayName;

    return `
  // Real-time Angular Signals
  const userConfig = {
    mode: signal(${format(mode)}),
    contrast: signal(${format(contrast)}),
    density: signal(${format(density)}),
    fontSize: signal(${format(fontSize)})
  };`;
  });

  cycleThemeMode() {
    const current = this.prefs.themeMode();
    if (current === 'light') this.prefs.setThemeMode('dark');
    else if (current === 'dark') this.prefs.setThemeMode('auto');
    else this.prefs.setThemeMode('light');
  }

  cycleContrastMode() {
    const current = this.prefs.contrastMode();
    if (current === 'normal') this.prefs.setContrastMode('high');
    else if (current === 'high') this.prefs.setContrastMode('auto');
    else this.prefs.setContrastMode('normal');
  }

  cycleFontSize() {
    const allSizes = this.typographyService.getFontSizes();
    const current = this.typographyService.activeFontSize();
    const nextIndex = (allSizes.findIndex((s) => s.id === current.id) + 1) % allSizes.length;
    this.prefs.setFontSize(allSizes[nextIndex].id);
  }

  cycleDensity() {
    const allDensities = this.densityService.getDensities();
    const current = this.densityService.currentDensity();
    const nextIndex = (allDensities.findIndex((d) => d.value === current.value) + 1) % allDensities.length;
    this.prefs.setDensity(allDensities[nextIndex].value);
  }
}