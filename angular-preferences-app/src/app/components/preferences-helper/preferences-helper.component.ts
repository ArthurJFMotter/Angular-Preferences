import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';
import { PreferencesService } from '../../services/preferences.service';
import { MatDividerModule } from '@angular/material/divider'; // Added

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

  isExpanded = false;

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  tooltipText = computed(() => this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode');
  
  ariaLabelText = computed(() => this.themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode');
}