import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AppearanceSettingsComponent } from './components/appearance-settings/appearance-settings.component';
import { TypographySettingsComponent } from './components/typography-settings/typography-settings.component';
import { AccessibilitySettingsComponent } from './components/accessibility-settings/accessibility-settings.component';
import { NotificationSettingsComponent } from './components/notification-settings/notification-settings.component';
import { PreviewSettingsComponent } from './components/preview-settings/preview-settings.component';

import { PreferencesService } from 'ng-preferences';
import { SnackbarService } from 'ng-preferences';
import { MatCardModule } from '@angular/material/card';
import { CustomSnackbarComponent } from '../../components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AppearanceSettingsComponent,
    TypographySettingsComponent,
    AccessibilitySettingsComponent,
    PreviewSettingsComponent,
    NotificationSettingsComponent,
    MatCardModule, MatButtonModule
  ],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  preferencesService = inject(PreferencesService);
  snackbarService = inject(SnackbarService);

  handleReset(): void {
    this.preferencesService.resetToDefaults();
    this.snackbarService.info(CustomSnackbarComponent, 'Preferences have been reset to defaults.');
  }
}