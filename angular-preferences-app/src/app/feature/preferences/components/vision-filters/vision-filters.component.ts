import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  PreferencesService,
  CVD_MODES,
  SCREEN_FILTERS,
} from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';

@Component({
  selector: 'app-vision-filters',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    PreferencesCardComponent,
  ],
  templateUrl: './vision-filters.component.html',
  styleUrl: './vision-filters.component.scss',
})
export class VisionFiltersComponent {
  readonly prefs = inject(PreferencesService);
  readonly cvdOptions = CVD_MODES;
  readonly screenFilterOptions = SCREEN_FILTERS;

  getCvdLabel(value: string) {
    return this.cvdOptions.find((v) => v.value === value)?.label || value;
  }
  getScreenFilterLabel(value: string) {
    return (
      this.screenFilterOptions.find((v) => v.value === value)?.label || value
    );
  }

  increaseCvdSeverity() {
    const c = this.prefs.cvdSeverity();
    if (c < 100) this.prefs.setCvdSeverity(c + 10);
  }
  decreaseCvdSeverity() {
    const c = this.prefs.cvdSeverity();
    if (c > 10) this.prefs.setCvdSeverity(c - 10);
  }
  increaseScreenFilterIntensity() {
    const c = this.prefs.screenFilterIntensity();
    if (c < 100) this.prefs.setScreenFilterIntensity(c + 10);
  }
  decreaseScreenFilterIntensity() {
    const c = this.prefs.screenFilterIntensity();
    if (c > 10) this.prefs.setScreenFilterIntensity(c - 10);
  }
}
