import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService } from 'ng-material-preferences';

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
  
  private shapes = [1, 2, 3, 0];
  private densities = [0, -1, -2, -3];
  private motions = [1, 0.5, 0];

  cycleShape(e: Event) {
    e.stopPropagation();
    const current = this.prefs.shapeScale();
    const idx = this.shapes.reduce(
      (closest, val, i) =>
        Math.abs(val - current) < Math.abs(this.shapes[closest] - current)
          ? i
          : closest,
      0,
    );
    this.prefs.setShapeScale(this.shapes[(idx + 1) % this.shapes.length]);
  }

  cycleDensity(e: Event) {
    e.stopPropagation();
    const current = this.prefs.densityScale();
    const idx =
      this.densities.indexOf(current) === -1
        ? 0
        : this.densities.indexOf(current);
    this.prefs.setDensityScale(
      this.densities[(idx + 1) % this.densities.length],
    );
  }

  cycleMotion(e: Event) {
    e.stopPropagation();
    const current = this.prefs.motionScale();
    const idx =
      this.motions.indexOf(current) === -1 ? 0 : this.motions.indexOf(current);
    this.prefs.setMotionScale(this.motions[(idx + 1) % this.motions.length]);
  }

  shapeName = computed(() => {
    const s = this.prefs.shapeScale();
    return s <= 0.25
      ? 'Sharp'
      : s >= 2.5
        ? 'Pill'
        : s >= 1.5
          ? 'X-Round'
          : 'Rounded';
  });
  densityName = computed(() => `Level ${this.prefs.densityScale()}`);
  motionName = computed(() => {
    const m = this.prefs.motionScale();
    return m === 0 ? 'Off' : m === 0.5 ? 'Fast' : 'Normal';
  });
}
