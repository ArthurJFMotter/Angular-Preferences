import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
/* will be moved to an module */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from './services/theme.service';
import { NgIf } from '@angular/common';
import { TypographyService } from './services/typography.service';
import { MatDividerModule } from '@angular/material/divider';
import { DensityService } from './services/density.service';
import { Density } from './models/density.model';
import { FontSizeConfig } from './models/typography.model';
/* will be moved to an module */

@Component({
  selector: 'app-root',
  /* will be moved to an module */
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    NgIf,
  ],
  /* will be moved to an module */
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-preferences-app';

  // --- SERVICES ---
  densityService = inject(DensityService);
  themeService = inject(ThemeService);
  typographyService = inject(TypographyService);

  // --- FONT SIZE STATE & HANDLERS ---
  fontSizes: FontSizeConfig[] = this.typographyService.getFontSizes();
  activeFontSize = this.typographyService.activeFontSize;
  fontSizeSliderIndex = signal(
    this.fontSizes.findIndex(s => s.id === this.activeFontSize().id)
  );
  minFontSizeIndex = 0;
  maxFontSizeIndex = this.fontSizes.length - 1;

  onFontSizeChange(event: Event) {
    const slider = event.target as HTMLInputElement;
    const newIndex = Number(slider.value);
    this.fontSizeSliderIndex.set(newIndex);
  }

  // --- Signals from the Service ---
  densities: Density[] = this.densityService.getDensities();
  currentDensity: WritableSignal<Density> = this.densityService.currentDensity;

  // --- Component's Internal UI State ---
  sliderIndex: WritableSignal<number> = signal(
    this.densities.findIndex(d => d.value === this.currentDensity().value)
  );

  // --- Computed Properties for the Template ---
  min = 0;
  max = this.densities.length - 1;

  currentDensityDisplayName = computed(() => this.currentDensity().displayName);

  constructor() {
    // --- Effect to update Font Size Service ---
    effect(() => {
      const index = this.fontSizeSliderIndex();
      const selectedSize = this.fontSizes[index];
      if (selectedSize && selectedSize.id !== this.activeFontSize().id) {
        this.typographyService.setFontSize(selectedSize.id);
      }
    });
    
    // --- Effect to sync Font Size Slider from Service ---
    effect(() => {
      const newIndex = this.fontSizes.findIndex(s => s.id === this.activeFontSize().id);
      if (newIndex > -1 && newIndex !== this.fontSizeSliderIndex()) {
        this.fontSizeSliderIndex.set(newIndex);
      }
    });
    
    // --- Effect to Update the Density Service ---
    effect(() => {
      const index = this.sliderIndex();
      const selectedDensity = this.densities[index];
      if (selectedDensity) {

        if (selectedDensity.value !== this.currentDensity().value) {
           this.densityService.setDensity(selectedDensity.value);
        }
      }
    });

    // --- Effect to Sync Slider from External Changes ---
    effect(() => {
        const newIndex = this.densities.findIndex(d => d.value === this.currentDensity().value);
        if (newIndex > -1 && newIndex !== this.sliderIndex()) {
            this.sliderIndex.set(newIndex);
        }
    });
  }

  // --- Event Handler for the Template ---
  onDensityChange(event: Event): void {
    const slider = event.target as HTMLInputElement;
    const newIndex = Number(slider.value);
    this.sliderIndex.set(newIndex); 
  }
}