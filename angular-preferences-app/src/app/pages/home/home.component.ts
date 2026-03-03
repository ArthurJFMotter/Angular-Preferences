import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PreferencesService } from '../../services/preferences.service';
import { ThemeService } from '../../services/theme.service';
import { DensityService } from '../../services/density.service';
import { TypographyService } from '../../services/typography.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private router = inject(Router);

  public prefs = inject(PreferencesService);
  public themeService = inject(ThemeService);
  public densityService = inject(DensityService);
  public typographyService = inject(TypographyService);

  // --- Dynamic Code Snippet ---
  codeSnippet = computed(() => {
    const format = (val: string) => `'${val}'`;

    const mode = this.prefs.themeMode(); // 'light' | 'dark' | 'auto'
    const contrast = this.prefs.contrastMode(); // 'normal' | 'high' | 'auto'
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

  // --- Interactive Cycles ---
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

    const currentIndex = allSizes.findIndex((s) => s.id === current.id);
    const nextIndex = (currentIndex + 1) % allSizes.length;

    this.prefs.setFontSize(allSizes[nextIndex].id);
  }

  cycleDensity() {
    const allDensities = this.densityService.getDensities();
    const current = this.densityService.currentDensity();

    const currentIndex = allDensities.findIndex(
      (d) => d.value === current.value,
    );
    const nextIndex = (currentIndex + 1) % allDensities.length;

    this.prefs.setDensity(allDensities[nextIndex].value);
  }

  navigateToSettings() {
    this.router.navigate(['/configurations']);
  }
}
