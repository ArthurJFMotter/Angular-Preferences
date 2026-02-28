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
import { HelpButtonComponent } from '../../../../components/help-button/help-button.component';

@Component({
  selector: 'app-appearance-settings',
  standalone: true,
  imports: [
    CommonModule,
    HelpButtonComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatButtonToggleModule,
  ],
  templateUrl: './appearance-settings.component.html',
  styleUrls: ['./appearance-settings.component.scss'],
})
export class AppearanceSettingsComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);
  shapeService = inject(ShapeService);
}
