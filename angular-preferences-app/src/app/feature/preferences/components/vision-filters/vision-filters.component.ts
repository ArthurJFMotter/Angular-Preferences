import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  PreferencesService,
  CVD_MODES,
  SCREEN_FILTERS,
  CVD_SEVERITY_SCALE,
  SCREEN_FILTER_INTENSITY_SCALE,
} from 'ng-material-preferences';

import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';
import { PreferenceSelectComponent } from '../../../../shared/preference-select/preference-select.component';
import { PreferenceSliderComponent } from '../../../../shared/preference-slider/preference-slider.component';

@Component({
  selector: 'app-vision-filters',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    PreferencesCardComponent,
    PreferenceSliderComponent,
    PreferenceSelectComponent,
  ],
  templateUrl: './vision-filters.component.html',
  styleUrl: './vision-filters.component.scss',
})
export class VisionFiltersComponent {
  readonly prefs = inject(PreferencesService);

  // Select Arrays   
  readonly cvdOptions = CVD_MODES;
  readonly screenFilterOptions = SCREEN_FILTERS;

  // Slider Scales
  readonly cvdSeverityScale = CVD_SEVERITY_SCALE;
  readonly screenFilterIntensityScale = SCREEN_FILTER_INTENSITY_SCALE;

  // --- UI STATE ---
  readonly showPreview = signal(false);
  readonly imageLoaded = signal(false);
  readonly isComparing = signal(false);

  private savedCvdSeverity = 100;
  private savedScreenIntensity = 50;

  startCompare() {
    if (this.isComparing()) return;
    this.isComparing.set(true);

    this.savedCvdSeverity = this.prefs.cvdSeverity();
    this.savedScreenIntensity = this.prefs.screenFilterIntensity();
    this.prefs.setCvdSeverity(0);
    this.prefs.setScreenFilterIntensity(0);
  }

  stopCompare() {
    if (!this.isComparing()) return;
    this.isComparing.set(false);

    this.prefs.setCvdSeverity(this.savedCvdSeverity);
    this.prefs.setScreenFilterIntensity(this.savedScreenIntensity);
  }

  // --- DYNAMIC CONFUSION PAIR TEXT ---
  readonly confusionText = computed(() => {
    const mode = this.prefs.cvd();
    const sev = this.prefs.cvdSeverity();
    const intent = this.prefs.cvdIntent();

    if (mode === 'none' || sev === 0) return 'Vision is currently unmodified.';
    if (intent === 'compensate' && mode !== 'achromatopsia') {
      return 'Daltonization is active. Colors are being mathematically shifted to force contrast.';
    }

    switch (mode) {
      case 'protanopia':
      case 'deuteranopia':
        return `At ${sev}% severity, red and green become difficult to distinguish.`;
      case 'tritanopia':
        return `At ${sev}% severity, blue and yellow become difficult to distinguish.`;
      case 'achromatopsia':
        return `At ${sev}% severity, colors fade into shades of gray.`;
      default:
        return '';
    }
  });

  // --- DYNAMIC ENVIRONMENT TEXT ---
  readonly environmentText = computed(() => {
    const filter = this.prefs.screenFilter();
    const intensity = this.prefs.screenFilterIntensity();

    if (filter === 'none' || intensity === 0)
      return 'Environmental filters are currently off.';

    switch (filter) {
      case 'blur':
        return `Low Vision: At ${intensity}%, UI elements lose edge sharpness, testing layout and shape legibility.`;
      case 'glare':
        return `Sunlight Glare: At ${intensity}%, contrast drops and brightness spikes, simulating outdoor screen visibility.`;
      case 'nightshift':
        return `Night Shift: At ${intensity}%, blue light is aggressively reduced, shifting the UI to warmer tones.`;
      case 'astigmatism':
        return `Astigmatism: At ${intensity}%, bright elements streak and bloom against dark backgrounds (Halation).`;
      case 'macular':
        return `Macular Degeneration: At ${intensity}%, a central blind spot (scotoma) obscures direct focal points, forcing reliance on peripheral vision.`;
      case 'glaucoma':
        return `Glaucoma: At ${intensity}%, peripheral vision is severely restricted (tunnel vision), hiding edge UI elements.`;
      default:
        return '';
    }
  });
}
