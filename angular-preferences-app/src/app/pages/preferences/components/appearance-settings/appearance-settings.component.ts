// src/app/pages/preferences/components/appearance-settings.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ThemeService } from '../../../../services/theme.service';
import { PreferencesService } from '../../../../services/preferences.service';
import { ShapeService } from '../../../../services/shape.service';

@Component({
  selector: 'app-appearance-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  template: `
    <mat-card class="settings-card">
      <mat-card-header>
        <div mat-card-avatar class="header-icon"><mat-icon>palette</mat-icon></div>
        <mat-card-title>Appearance</mat-card-title>
      </mat-card-header>
      <mat-card-content class="card-body">

        <!-- Theme Color -->
        <div class="control-group">
          <label class="group-label">Theme Color</label>
          <div class="swatch-grid">
            @for (theme of themeService.getThemes(); track theme.id) {
              <button class="color-swatch" 
                [style.background-color]="theme.primary"
                [class.active]="themeService.currentTheme().id === theme.id"
                (click)="preferencesService.setTheme(theme.id)"
                [matTooltip]="theme.displayName">
                @if (themeService.currentTheme().id === theme.id) {
                  <mat-icon>check</mat-icon>
                }
              </button>
            }
          </div>
        </div>

        <!-- Corner Shape -->
        <div class="control-group">
          <label class="group-label">Corner Shape</label>
          <mat-button-toggle-group class="fit-toggle" [value]="shapeService.activeShape().id"
            (change)="preferencesService.setShape($event.value)">
            <mat-button-toggle value="sharp">Square</mat-button-toggle>
            <mat-button-toggle value="md">Rounded</mat-button-toggle>
            <mat-button-toggle value="full">Pill</mat-button-toggle>
          </mat-button-toggle-group>
        </div>

        <!-- Toggles -->
        <div class="toggle-row">
          <mat-slide-toggle [checked]="themeService.isDarkMode()"
            (change)="preferencesService.toggleDarkMode()">
            Dark Mode
          </mat-slide-toggle>
          <mat-slide-toggle [checked]="themeService.isReducedMotion()"
            (change)="preferencesService.toggleReducedMotion()">
            Reduced Motion
          </mat-slide-toggle>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    /* Copy relevant CSS from your original SCSS here */
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
    .group-label {
      display: block; font-size: 0.75rem; font-weight: 600;
      text-transform: uppercase; color: var(--mat-sys-on-surface-variant);
      margin-bottom: 0.5rem; letter-spacing: 0.05em;
    }
    /* Swatches */
    .swatch-grid { display: flex; flex-wrap: wrap; gap: 12px; }
    .color-swatch {
      width: 40px; height: 40px; border-radius: 50%; border: 2px solid transparent;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      padding: 0; transition: transform 0.2s;
    }
    .color-swatch mat-icon { color: white; font-size: 20px; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
    .color-swatch:hover { transform: scale(1.1); }
    .color-swatch.active { transform: scale(1.15); box-shadow: 0 0 0 3px var(--mat-sys-surface), 0 0 0 5px var(--mat-sys-primary); }
    /* Toggles */
    .fit-toggle { width: fit-content; max-width: 100%; }
    .fit-toggle mat-button-toggle { min-width: 80px; }
    .toggle-row { display: flex; gap: 2rem; margin-top: 0.5rem; flex-wrap: wrap; }
  `]
})
export class AppearanceSettingsComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);
  shapeService = inject(ShapeService);
}