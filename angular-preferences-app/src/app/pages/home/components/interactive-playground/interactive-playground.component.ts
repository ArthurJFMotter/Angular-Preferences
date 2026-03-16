import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PreferencesService } from 'ng-preferences';
import { DensityService } from 'ng-preferences';
import { TypographyService } from 'ng-preferences';
import { ShapeService } from 'ng-preferences';

@Component({
  selector: 'app-interactive-playground',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './interactive-playground.component.html',
  styleUrls: ['./interactive-playground.component.scss'],
})
export class InteractivePlaygroundComponent {
  public preferencesService = inject(PreferencesService);
  public densityService = inject(DensityService);
  public typographyService = inject(TypographyService);
  public shapeService = inject(ShapeService);

  codeSnippet = computed(() => {
    const format = (val: string) => `'${val}'`;
    const mode = this.preferencesService.themeMode();
    const contrast = this.preferencesService.contrastMode();
    const fontSize = this.typographyService.activeFontSize().displayName;
    const borderRadius = this.shapeService.activeShape().displayName;

    return `
  // Real-time Angular Signals
  const userConfig = {
    mode: signal(${format(mode)}),
    contrast: signal(${format(contrast)}),
    borderRadius: signal(${format(borderRadius)}),
    fontSize: signal(${format(fontSize)}),
  };`;
  });

  cycleThemeMode() {
    const current = this.preferencesService.themeMode();
    if (current === 'light') this.preferencesService.setThemeMode('dark');
    else if (current === 'dark') this.preferencesService.setThemeMode('auto');
    else this.preferencesService.setThemeMode('light');
  }

  cycleContrastMode() {
    const current = this.preferencesService.contrastMode();
    if (current === 'normal') this.preferencesService.setContrastMode('high');
    else if (current === 'high')
      this.preferencesService.setContrastMode('auto');
    else this.preferencesService.setContrastMode('normal');
  }

  cycleFontSize() {
    const allSizes = this.typographyService.getFontSizes();
    const current = this.typographyService.activeFontSize();
    const nextIndex =
      (allSizes.findIndex((s) => s.id === current.id) + 1) % allSizes.length;
    this.typographyService.setFontSize(allSizes[nextIndex].id);
  }

  cycleShape() {
    const allShapes = this.shapeService.getShapes();
    const current = this.shapeService.activeShape();
    const nextIndex =
      (allShapes.findIndex((s) => s.id === current.id) + 1) % allShapes.length;
    this.shapeService.setShape(allShapes[nextIndex].id);
  }
}
