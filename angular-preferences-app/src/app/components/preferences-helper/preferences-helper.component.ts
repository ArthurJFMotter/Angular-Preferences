import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService } from '../../services/theme.service';
import { PreferencesService } from '../../services/preferences.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-preferences-helper',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './preferences-helper.component.html',
  styleUrls: ['./preferences-helper.component.scss']
})
export class PreferencesHelperComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);
  snackbarService = inject(SnackbarService);

  isExpanded = false;

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  handleReset(): void {
    this.preferencesService.resetToDefaults();
    this.snackbarService.info('Preferences have been reset to defaults.');
  }

  // Theme Mode: Light -> Dark -> Auto
  themeIcon = computed(() => {
    switch (this.preferencesService.themeMode()) {
      case 'dark': return 'dark_mode';
      case 'light': return 'light_mode';
      default: return 'brightness_auto';
    }
  });

  themeTooltip = computed(() => {
    switch (this.preferencesService.themeMode()) {
      case 'dark': return 'Mode: Dark';
      case 'light': return 'Mode: Light';
      default: return 'Mode: Auto (System)';
    }
  });

  // Contrast Mode: Normal -> High -> Auto
  contrastIcon = computed(() => {
    switch (this.preferencesService.contrastMode()) {
      case 'high': return 'invert_colors';
      case 'normal': return 'invert_colors_off';
      default: return 'hdr_auto';
    }
  });

  contrastTooltip = computed(() => {
    switch (this.preferencesService.contrastMode()) {
      case 'high': return 'Contrast: High';
      case 'normal': return 'Contrast: Standard';
      default: return 'Contrast: Auto (System)';
    }
  });
}