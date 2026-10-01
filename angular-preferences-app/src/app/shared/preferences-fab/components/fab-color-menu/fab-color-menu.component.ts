import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  CONTRAST_SCALE,
  PreferencesService,
  SCHEME_VARIANTS,
  ThemeMode,
} from 'ng-material-preferences';
import { TitleCasePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-fab-color-menu',
  standalone: true,
  imports: [MatDividerModule, MatMenuModule, MatIconModule, TitleCasePipe],
  templateUrl: './fab-color-menu.component.html',
  styleUrl: './fab-color-menu.component.scss',
})
export class FabColorMenuComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly modes: ThemeMode[] = ['auto', 'light', 'dark'];
  readonly variants = SCHEME_VARIANTS;
  readonly contrastPresets = CONTRAST_SCALE.presets;

  // --- CYCLERS ---
  cycleMode(e: Event) {
    e.stopPropagation();
    const nextIdx =
      (this.modes.indexOf(this.prefs.mode()) + 1) % this.modes.length;
    this.prefs.setMode(this.modes[nextIdx]);
  }

  cycleVariant(e: Event) {
    e.stopPropagation();
    const idx = this.variants.findIndex(
      (v) => v.value === this.prefs.variant(),
    );
    const nextIdx = (Math.max(idx, 0) + 1) % this.variants.length;
    this.prefs.setVariant(this.variants[nextIdx].value);
  }

  cycleContrast(e: Event) {
    e.stopPropagation();
    const steps = ['auto', ...this.contrastPresets.map((p) => p.value)];
    const current = this.prefs.autoContrast()
      ? 'auto'
      : this.prefs.contrastLevel();

    let idx = steps.indexOf(current);
    if (idx === -1 && typeof current === 'number') {
      const closest = this.contrastPresets.reduce((prev, curr) =>
        Math.abs(curr.value - current) < Math.abs(prev.value - current)
          ? curr
          : prev,
      );
      idx = steps.indexOf(closest.value);
    }

    const next = steps[(Math.max(idx, 0) + 1) % steps.length];
    if (next === 'auto') this.prefs.setAutoContrast(true);
    else {
      this.prefs.setAutoContrast(false);
      this.prefs.setContrastLevel(next as number);
    }
  }

  // --- DISPLAYS ---
  profileName = computed(() =>
    this.prefs.scheme() === 'custom'
      ? 'Custom'
      : this.prefs.activeProfile()?.name || 'Unknown',
  );
  variantName = computed(
    () =>
      this.variants.find((v) => v.value === this.prefs.variant())?.label ||
      'Tonal Spot',
  );
  contrastName = computed(() => {
    if (this.prefs.autoContrast()) return 'Auto';
    const c = this.prefs.contrastLevel();
    return this.contrastPresets.reduce((prev, curr) =>
      Math.abs(curr.value - c) < Math.abs(prev.value - c) ? curr : prev,
    ).label;
  });
}
