import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ThemeService } from 'ng-preferences';
import { PreferencesService } from 'ng-preferences';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsCardWrapperComponent } from '../settings-card-wrapper/settings-card-wrapper.component';

@Component({
  selector: 'app-accessibility-settings',
  standalone: true,
  imports: [
    CommonModule,
    SettingsCardWrapperComponent,
    MatCardModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './accessibility-settings.component.html',
  styleUrls: ['./accessibility-settings.component.scss']
})
export class AccessibilitySettingsComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);
}