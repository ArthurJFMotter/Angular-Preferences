import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PercentPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { PreferencesService } from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';

@Component({
  selector: 'app-interface-layout',
  standalone: true,
  imports: [
    FormsModule,
    PercentPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    PreferencesCardComponent,
  ],
  templateUrl: './interface-layout.component.html',
  styleUrl: './interface-layout.component.scss',
})
export class InterfaceLayoutComponent {
  readonly prefs = inject(PreferencesService);

  scaleShapeUp() {
    const c = this.prefs.shapeScale();
    if (c < 3) this.prefs.setShapeScale(Math.round((c + 0.25) * 100) / 100);
  }
  scaleShapeDown() {
    const c = this.prefs.shapeScale();
    if (c > 0) this.prefs.setShapeScale(Math.round((c - 0.25) * 100) / 100);
  }
  scaleDensityUp() {
    const c = this.prefs.densityScale();
    if (c < 0) this.prefs.setDensityScale(c + 1);
  }
  scaleDensityDown() {
    const c = this.prefs.densityScale();
    if (c > -3) this.prefs.setDensityScale(c - 1);
  }
  increaseMotion() {
    const c = this.prefs.motionScale();
    if (c < 1) this.prefs.setMotionScale(c + 0.5);
  }
  decreaseMotion() {
    const c = this.prefs.motionScale();
    if (c > 0) this.prefs.setMotionScale(c - 0.5);
  }
  formatMotion(value: number) {
    return value === 0 ? 'Off' : value === 0.5 ? 'Fast' : 'Normal';
  }
}
