import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  DENSITY_SCALE,
  MOTION_SCALE,
  PreferencesService,
  SHAPE_SCALE,
} from 'ng-material-preferences';

@Component({
  selector: 'app-fab-layout-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './fab-layout-menu.component.html',
  styleUrl: './fab-layout-menu.component.scss',
})
export class FabLayoutMenuComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly shapes = SHAPE_SCALE.presets;
  readonly densities = DENSITY_SCALE.presets;
  readonly motions = MOTION_SCALE.presets;

  // --- CYCLERS ---
  cycleShape(e: Event) {
    e.stopPropagation();
    const current = this.prefs.shapeScale();
    const idx = this.shapes.reduce(
      (closest, val, i) =>
        Math.abs(val.value - current) <
        Math.abs(this.shapes[closest].value - current)
          ? i
          : closest,
      0,
    );
    this.prefs.setShapeScale(this.shapes[(idx + 1) % this.shapes.length].value);
  }

  cycleDensity(e: Event) {
    e.stopPropagation();
    const current = this.prefs.densityScale();
    const idx = this.densities.findIndex((d) => d.value === current);
    this.prefs.setDensityScale(
      this.densities[(Math.max(idx, 0) + 1) % this.densities.length].value,
    );
  }

  cycleMotion(e: Event) {
    e.stopPropagation();
    const current = this.prefs.motionScale();
    const idx = this.motions.findIndex((m) => m.value === current);
    this.prefs.setMotionScale(
      this.motions[(Math.max(idx, 0) + 1) % this.motions.length].value,
    );
  }

  // --- DISPLAYS ---
  shapeName = computed(() => {
    const s = this.prefs.shapeScale();
    return this.shapes.reduce((prev, curr) =>
      Math.abs(curr.value - s) < Math.abs(prev.value - s) ? curr : prev,
    ).label;
  });
  densityName = computed(
    () =>
      this.densities.find((d) => d.value === this.prefs.densityScale())
        ?.label || 'Level 0',
  );
  motionName = computed(
    () =>
      this.motions.find((m) => m.value === this.prefs.motionScale())?.label ||
      'Normal',
  );
}
