import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    PreferencesCardComponent,
  ],
  templateUrl: './vision-filters.component.html',
  styleUrl: './vision-filters.component.scss',
})
export class VisionFiltersComponent {
  readonly prefs = inject(PreferencesService);
  readonly cvdOptions = CVD_MODES;
  readonly screenFilterOptions = SCREEN_FILTERS;

  // --- UI STATE ---
  readonly showPreview = signal(false);
  readonly imageLoaded = signal(false);

  // --- COMPARE LOGIC ---
  readonly isComparing = signal(false);
  private savedCvdSeverity = 100;
  private savedScreenIntensity = 50;

  startCompare() {
    if (this.isComparing()) return;
    this.isComparing.set(true);

    // Save current state and temporarily disable filters
    this.savedCvdSeverity = this.prefs.cvdSeverity();
    this.savedScreenIntensity = this.prefs.screenFilterIntensity();
    this.prefs.setCvdSeverity(0);
    this.prefs.setScreenFilterIntensity(0);
  }

  stopCompare() {
    if (!this.isComparing()) return;
    this.isComparing.set(false);

    // Restore filters
    this.prefs.setCvdSeverity(this.savedCvdSeverity);
    this.prefs.setScreenFilterIntensity(this.savedScreenIntensity);
  }

 // --- DYNAMIC CONFUSION PAIR TEXT ---
  readonly confusionText = computed(() => {
    const mode = this.prefs.cvd();
    const sev = this.prefs.cvdSeverity();
    const intent = this.prefs.cvdIntent();

    if (mode === 'none' || sev === 0) {
      return 'Vision is currently unmodified.';
    }

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

    if (filter === 'none' || intensity === 0) {
      return 'Environmental filters are currently off.';
    }

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

  // --- HELPERS ---
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
