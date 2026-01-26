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
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // <--- NEW
import { MatTooltipModule } from '@angular/material/tooltip';

// Services
import { TypographyService } from '../../services/typography.service';
import { DensityService } from '../../services/density.service';
import { PreferencesService } from '../../services/preferences.service';
import { ThemeService } from '../../services/theme.service';
import { ShapeService } from '../../services/shape.service'; // <--- NEW

// Models
import { FontSizeConfig } from '../../models/typography.model';
import { Density } from '../../models/density.model';
import { Shape } from '../../models/shape.model'; // <--- NEW

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
    MatButtonToggleModule, // <--- NEW
    MatTooltipModule
  ],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  // --- SERVICES ---
  densityService = inject(DensityService);
  preferencesService = inject(PreferencesService);
  themeService = inject(ThemeService);
  typographyService = inject(TypographyService);
  shapeService = inject(ShapeService); // <--- NEW

  // --- FONT SIZE STATE ---
  private readonly fontSizes: FontSizeConfig[] = this.typographyService.getFontSizes();
  activeFontSize = this.typographyService.activeFontSize;
  fontSizeSliderIndex = signal(this.fontSizes.findIndex(s => s.id === this.activeFontSize().id));
  minFontSizeIndex = 0;
  maxFontSizeIndex = this.fontSizes.length - 1;

  constructor() {
    this.setupEffects();
  }

  // --- ACTIONS ---

  onFontChange(event: MatSelectChange): void {
    this.preferencesService.setFont(event.value);
  }

  onFontSizeChange(event: Event) {
    const newIndex = Number((event.target as HTMLInputElement).value);
    this.fontSizeSliderIndex.set(newIndex);
  }

  // Helper to format slider Label
  formatFontSizeLabel(value: number): string {
    return this.fontSizes[value]?.displayName ?? '';
  }

  private setupEffects(): void {
    // 1. Sync Slider -> Service (Font Size)
    effect(() => {
      const selectedSize = this.fontSizes[this.fontSizeSliderIndex()];
      if (selectedSize && selectedSize.id !== this.activeFontSize().id) {
        this.preferencesService.setFontSize(selectedSize.id);
      }
    });

    // 2. Sync Service -> Slider (Font Size)
    effect(() => {
      const newIndex = this.fontSizes.findIndex(s => s.id === this.activeFontSize().id);
      if (newIndex > -1 && newIndex !== this.fontSizeSliderIndex()) {
        this.fontSizeSliderIndex.set(newIndex);
      }
    });
  }
}