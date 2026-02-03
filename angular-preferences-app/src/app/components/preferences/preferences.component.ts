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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider'; // <--- NEW

// Services
import { TypographyService } from '../../services/typography.service';
import { DensityService } from '../../services/density.service';
import { PreferencesService } from '../../services/preferences.service';
import { ThemeService } from '../../services/theme.service';
import { ShapeService } from '../../services/shape.service';

// Models
import { FontSizeConfig } from '../../models/typography.model';
import { Density } from '../../models/density.model';
import { Shape } from '../../models/shape.model';

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
    MatButtonToggleModule,
    MatTooltipModule,
    MatDividerModule
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
  shapeService = inject(ShapeService);

  // --- FONT SIZE STATE ---
  readonly fontSizes: FontSizeConfig[] = this.typographyService.getFontSizes();
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

  // Handle Slider Drag
  updateFontSize(value: number) {
    // 1. Update local signal for UI
    this.fontSizeSliderIndex.set(value);
    
    // 2. Update Service
    const selectedSize = this.fontSizes[value];
    if (selectedSize) {
      this.preferencesService.setFontSize(selectedSize.id);
    }
  }

  private setupEffects(): void {
    // --- SYNC: Service -> Slider ---
    // This effect ensures that if the service changes (e.g. via Reset button),
    // the slider jumps to the correct position.
    effect(() => {
      const currentId = this.activeFontSize().id;
      const newIndex = this.fontSizes.findIndex(s => s.id === currentId);
      
      if (newIndex > -1 && newIndex !== this.fontSizeSliderIndex()) {
        this.fontSizeSliderIndex.set(newIndex);
      }
    }, { allowSignalWrites: true });
  }
}