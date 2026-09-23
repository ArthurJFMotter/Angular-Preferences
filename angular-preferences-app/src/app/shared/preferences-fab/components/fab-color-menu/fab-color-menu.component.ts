import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
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

  // --- CYCLERS ---
  cycleProfile(e: Event) {
    e.stopPropagation();
    const profiles = ['custom', ...this.prefs.savedProfiles().map((p) => p.id)];
    const nextIdx =
      (profiles.indexOf(this.prefs.scheme()) + 1) % profiles.length;
    this.prefs.setScheme(profiles[nextIdx]);
  }

  cycleMode(e: Event) {
    e.stopPropagation();
    const modes: ThemeMode[] = ['auto', 'light', 'dark'];
    const nextIdx = (modes.indexOf(this.prefs.mode()) + 1) % modes.length;
    this.prefs.setMode(modes[nextIdx]);
  }

  cycleVariant(e: Event) {
    e.stopPropagation();
    const idx = SCHEME_VARIANTS.findIndex(
      (v) => v.value === this.prefs.variant(),
    );
    const nextIdx = (idx + 1) % SCHEME_VARIANTS.length;
    this.prefs.setVariant(SCHEME_VARIANTS[nextIdx].value);
  }

  cycleContrast(e: Event) {
    e.stopPropagation();
    const steps: (number | 'auto')[] = ['auto', 0, 0.5, 1, -1, -0.5];
    const current = this.prefs.autoContrast()
      ? 'auto'
      : this.prefs.contrastLevel();
    const idx = steps.indexOf(current);
    const next = steps[(idx + 1) % steps.length];

    if (next === 'auto') this.prefs.setAutoContrast(true);
    else {
      this.prefs.setAutoContrast(false);
      this.prefs.setContrastLevel(next);
    }
  }

  // --- DISPLAY HELPERS ---
  profileName = computed(() =>
    this.prefs.scheme() === 'custom'
      ? 'Custom'
      : this.prefs.activeProfile()?.name || 'Unknown',
  );
  activeColor = computed(() => this.prefs.activeCustomColors().primary);
  variantName = computed(
    () =>
      SCHEME_VARIANTS.find((v) => v.value === this.prefs.variant())?.label ||
      'Tonal Spot',
  );
  contrastName = computed(() => {
    if (this.prefs.autoContrast()) return 'Auto';
    const c = this.prefs.contrastLevel();
    return c === 1
      ? 'High'
      : c === 0.5
        ? 'Medium'
        : c === -0.5
          ? 'Low'
          : c === -1
            ? 'Reduced'
            : 'Standard';
  });
}
