import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ThemeService } from '../../../../services/theme.service';
import { PreferencesService } from '../../../../services/preferences.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HelpButtonComponent } from '../../../../components/help-button/help-button.component';

@Component({
  selector: 'app-accessibility-settings',
  standalone: true,
  imports: [
    CommonModule,
    HelpButtonComponent,
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