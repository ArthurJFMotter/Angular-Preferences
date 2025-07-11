import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-preferences-helper',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './preferences-helper.component.html',
  styleUrls: ['./preferences-helper.component.scss']
})
export class PreferencesHelperComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);

  isExpanded = false;

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  tooltipText = computed(() => {
    if (this.themeService.isDarkMode()) {
      return $localize`:@@prefsHelperTooltipToLight:Light Mode`; 
    } else {
      return $localize`:@@prefsHelperTooltipToDark:Dark Mode`;
    }
  });

  ariaLabelText = computed(() => {
    if (this.themeService.isDarkMode()) {
      return $localize`:@@prefsHelperAriaToLight:Switch to light mode`;
    } else {
      return $localize`:@@prefsHelperAriaToDark:Switch to dark mode`;
    }
  });
}