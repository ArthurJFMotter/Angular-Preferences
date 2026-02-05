import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TypographyService } from '../../../../services/typography.service';
import { DensityService } from '../../../../services/density.service';
import { PreferencesService } from '../../../../services/preferences.service';
import { FontSizeConfig } from '../../../../models/typography.model';

@Component({
  selector: 'app-typography-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonToggleModule
  ],
  templateUrl: './typography-settings.component.html',
  styleUrls: ['./typography-settings.component.scss']
})
export class TypographySettingsComponent {
  typographyService = inject(TypographyService);
  densityService = inject(DensityService);
  preferencesService = inject(PreferencesService);

  readonly fontSizes: FontSizeConfig[] = this.typographyService.getFontSizes();
  activeFontSize = this.typographyService.activeFontSize;
  
  fontSizeSliderIndex = signal(this.fontSizes.findIndex(s => s.id === this.activeFontSize().id));
  minFontSizeIndex = 0;
  maxFontSizeIndex = this.fontSizes.length - 1;

  constructor() {
    effect(() => {
      const currentId = this.activeFontSize().id;
      const newIndex = this.fontSizes.findIndex(s => s.id === currentId);
      if (newIndex > -1 && newIndex !== this.fontSizeSliderIndex()) {
        this.fontSizeSliderIndex.set(newIndex);
      }
    }, { allowSignalWrites: true });
  }

  onFontChange(event: MatSelectChange): void {
    this.preferencesService.setFont(event.value);
  }

  updateFontSize(value: number) {
    this.fontSizeSliderIndex.set(value);
    const selectedSize = this.fontSizes[value];
    if (selectedSize) {
      this.preferencesService.setFontSize(selectedSize.id);
    }
  }
}