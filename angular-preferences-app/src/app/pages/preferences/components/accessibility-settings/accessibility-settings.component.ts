// src/app/pages/preferences/components/accessibility-settings.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ThemeService } from '../../../../services/theme.service';
import { PreferencesService } from '../../../../services/preferences.service';

@Component({
  selector: 'app-accessibility-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-card class="settings-card">
      <mat-card-header>
        <div mat-card-avatar class="header-icon"><mat-icon>accessibility_new</mat-icon></div>
        <mat-card-title>Accessibility</mat-card-title>
      </mat-card-header>
      <mat-card-content class="card-body">
        <div class="control-group">
          <mat-checkbox [checked]="themeService.isHighContrastMode()"
            (change)="preferencesService.toggleHighContrastMode()">
            High Contrast Mode
          </mat-checkbox>
        </div>
        <div class="control-group">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Color Vision Deficiency</mat-label>
            <mat-select [value]="themeService.activeColorFilter()"
              (selectionChange)="preferencesService.setColorFilter($event.value)">
              @for (filter of themeService.getDaltonicFilters(); track filter.id) {
                <mat-option [value]="filter.id">{{ filter.displayName }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    /* Minimal styles repeated for standalone functionality */
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
    .control-group { margin-bottom: 1rem; }
    .full-width { width: 100%; }
  `]
})
export class AccessibilitySettingsComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);
}