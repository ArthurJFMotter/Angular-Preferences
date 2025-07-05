import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../services/theme.service';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-preferences-helper',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './preferences-helper.component.html',
  styleUrls: ['./preferences-helper.component.scss']
})
export class PreferencesHelperComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);
}