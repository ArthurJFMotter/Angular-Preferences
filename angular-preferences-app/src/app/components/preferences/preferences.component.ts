import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TypographyService } from '../../services/typography.service';
import { DensityService } from '../../services/density.service';
import { PreferencesService } from '../../services/preferences.service';
import { FontSizeConfig } from '../../models/typography.model';
import { Density } from '../../models/density.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  // --- SERVICES ---
  densityService = inject(DensityService);
  typographyService = inject(TypographyService);
  preferencesService = inject(PreferencesService);
  themeService = inject(ThemeService);

  // --- FONT SIZE STATE ---
  private readonly fontSizes: FontSizeConfig[] = this.typographyService.getFontSizes();
  activeFontSize = this.typographyService.activeFontSize;
  fontSizeSliderIndex = signal(this.fontSizes.findIndex(s => s.id === this.activeFontSize().id));
  minFontSizeIndex = 0;
  maxFontSizeIndex = this.fontSizes.length - 1;

  // --- DENSITY STATE ---
  private readonly densities: Density[] = this.densityService.getDensities();
  currentDensity = this.densityService.currentDensity;
  densitySliderIndex = signal(this.densities.findIndex(d => d.value === this.currentDensity().value));
  minDensityIndex = 0;
  maxDensityIndex = this.densities.length - 1;

  constructor() {
    this.setupEffects();
  }

  // --- EVENT HANDLERS ---
  onFontChange(event: MatSelectChange): void {
    this.preferencesService.setFont(event.value);
  }

  onFontSizeChange(event: Event) {
    const newIndex = Number((event.target as HTMLInputElement).value);
    this.fontSizeSliderIndex.set(newIndex);
  }

  onDensityChange(event: Event): void {
    const newIndex = Number((event.target as HTMLInputElement).value);
    this.densitySliderIndex.set(newIndex);
  }

  private setupEffects(): void {
    // --- EFFECT TO UPDATE FONT SIZE SERVICE ---
    effect(() => {
      const selectedSize = this.fontSizes[this.fontSizeSliderIndex()];
      if (selectedSize && selectedSize.id !== this.activeFontSize().id) {
        this.preferencesService.setFontSize(selectedSize.id);
      }
    });

    // --- EFFECT TO SYNC FONT SIZE SLIDER FROM SERVICE ---
    effect(() => {
      const newIndex = this.fontSizes.findIndex(s => s.id === this.activeFontSize().id);
      if (newIndex > -1 && newIndex !== this.fontSizeSliderIndex()) {
        this.fontSizeSliderIndex.set(newIndex);
      }
    });

    // --- EFFECT TO UPDATE DENSITY SERVICE ---
    effect(() => {
      const selectedDensity = this.densities[this.densitySliderIndex()];
      if (selectedDensity && selectedDensity.value !== this.currentDensity().value) {
        this.preferencesService.setDensity(selectedDensity.value);
      }
    });

    // --- EFFECT TO SYNC DENSITY SLIDER FROM SERVICE ---
    effect(() => {
      const newIndex = this.densities.findIndex(d => d.value === this.currentDensity().value);
      if (newIndex > -1 && newIndex !== this.densitySliderIndex()) {
        this.densitySliderIndex.set(newIndex);
      }
    });
  }
}