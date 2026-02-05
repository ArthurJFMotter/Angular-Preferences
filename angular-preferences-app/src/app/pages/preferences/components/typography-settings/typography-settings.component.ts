// src/app/pages/preferences/components/typography-settings.component.ts
import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

import { TypographyService } from '../../../../services/typography.service';
import { DensityService } from '../../../../services/density.service';
import { PreferencesService } from '../../../../services/preferences.service';
import { FontSizeConfig } from '../../../../models/typography.model';

@Component({
  selector: 'app-typography-settings',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatIconModule,
    MatFormFieldModule, MatSelectModule, MatSliderModule, MatButtonToggleModule
  ],
  template: `
    <mat-card class="settings-card">
      <mat-card-header>
        <div mat-card-avatar class="header-icon"><mat-icon>text_fields</mat-icon></div>
        <mat-card-title>Typography & Layout</mat-card-title>
      </mat-card-header>
      <mat-card-content class="card-body">
        
        <!-- Font Family -->
        <div class="control-group">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Font Family</mat-label>
            <mat-select [value]="typographyService.activeFont().id"
              (selectionChange)="onFontChange($event)">
              @for (font of typographyService.getFonts(); track font.id) {
                <mat-option [value]="font.id">{{ font.displayName }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Font Size Slider -->
        <div class="control-group">
          <div class="label-row">
            <label class="group-label">Font Size</label>
            <span class="value-badge">{{ typographyService.activeFontSize().displayName }}</span>
          </div>
          <div class="slider-row">
            <span class="small-a">A</span>
            <mat-slider 
              [min]="minFontSizeIndex" 
              [max]="maxFontSizeIndex" 
              step="1" discrete showTickMarks>
              <input matSliderThumb 
                [value]="fontSizeSliderIndex()" 
                (valueChange)="updateFontSize($event)">
            </mat-slider>
            <span class="large-a">A</span>
          </div>
        </div>

        <!-- Density -->
        <div class="control-group">
          <label class="group-label">Density</label>
          <mat-button-toggle-group class="fit-toggle" [value]="densityService.currentDensity().value">
            @for (density of densityService.getDensities(); track density.id) {
              <mat-button-toggle [value]="density.value"
                (click)="preferencesService.setDensity(density.value)">
                {{ density.displayName.split(' ')[0] }}
              </mat-button-toggle>
            }
          </mat-button-toggle-group>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    /* Reuse card styles or import a shared scss file */
    .settings-card {
      border-radius: min(var(--app-border-radius), 28px) !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border: 1px solid var(--mat-sys-outline-variant);
    }
    mat-card-header { padding: 1rem 1rem 0; margin-bottom: 0.5rem; }
    .header-icon {
      display: flex; align-items: center; justify-content: center;
      background-color: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
      border-radius: 50%;
    }
    .card-body { padding: 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .full-width { width: 100%; }
    .group-label {
      display: block; font-size: 0.75rem; font-weight: 600;
      text-transform: uppercase; color: var(--mat-sys-on-surface-variant);
      margin-bottom: 0.5rem; letter-spacing: 0.05em;
    }
    /* Slider specific */
    .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; }
    .value-badge {
      background: var(--mat-sys-tertiary-container); color: var(--mat-sys-on-tertiary-container);
      padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;
    }
    .slider-row { display: flex; align-items: center; gap: 1rem; padding-block: 0.5rem; padding-inline: 4px; }
    .small-a { font-size: 12px; color: var(--mat-sys-on-surface-variant); min-width: 12px; }
    .large-a { font-size: 24px; font-weight: bold; color: var(--mat-sys-on-surface); min-width: 24px; }
    mat-slider { flex: 1; min-width: 0; }
    .fit-toggle { width: fit-content; max-width: 100%; }
    .fit-toggle mat-button-toggle { min-width: 80px; }
  `]
})
export class TypographySettingsComponent {
  typographyService = inject(TypographyService);
  densityService = inject(DensityService);
  preferencesService = inject(PreferencesService);

  readonly fontSizes: FontSizeConfig[] = this.typographyService.getFontSizes();
  // Signals specific to the slider logic
  fontSizeSliderIndex = signal(0);
  minFontSizeIndex = 0;
  maxFontSizeIndex = this.fontSizes.length - 1;

  constructor() {
    // initialize slider position
    const currentId = this.typographyService.activeFontSize().id;
    this.fontSizeSliderIndex.set(this.fontSizes.findIndex(s => s.id === currentId));

    // Listen for external changes to sync slider
    effect(() => {
      const currentId = this.typographyService.activeFontSize().id;
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