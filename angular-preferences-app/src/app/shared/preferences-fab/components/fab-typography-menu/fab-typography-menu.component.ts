import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  PreferencesService,
  FONT_OPTIONS,
  FONT_SCALE,
} from 'ng-material-preferences';

@Component({
  selector: 'app-fab-typography-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './fab-typography-menu.component.html',
  styleUrl: './fab-typography-menu.component.scss',
})
export class FabTypographyMenuComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly scales = FONT_SCALE.presets;

  // --- CYCLERS ---
  cycleFontFamily(e: Event) {
    e.stopPropagation();
    const idx = FONT_OPTIONS.findIndex(
      (f) => f.value === this.prefs.headingFontFamily(),
    );
    const next =
      FONT_OPTIONS[(Math.max(idx, 0) + 1) % FONT_OPTIONS.length].value;
    this.prefs.setHeadingFontFamily(next);
    this.prefs.setBodyFontFamily(next);
  }

  cycleFontScale(e: Event) {
    e.stopPropagation();
    const current = this.prefs.fontScale();
    const idx = this.scales.reduce(
      (closest, val, i) =>
        Math.abs(val.value - current) <
        Math.abs(this.scales[closest].value - current)
          ? i
          : closest,
      0,
    );
    this.prefs.setFontScale(this.scales[(idx + 1) % this.scales.length].value);
  }

  // --- DISPLAYS ---
  fontName = computed(
    () =>
      FONT_OPTIONS.find((f) => f.value === this.prefs.headingFontFamily())
        ?.label || 'Roboto',
  );
  scaleName = computed(() => {
    const s = this.prefs.fontScale();
    return this.scales.reduce((prev, curr) =>
      Math.abs(curr.value - s) < Math.abs(prev.value - s) ? curr : prev,
    ).label;
  });
}
