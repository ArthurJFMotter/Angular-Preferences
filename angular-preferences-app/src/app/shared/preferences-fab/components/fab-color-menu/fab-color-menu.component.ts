import { Component, ViewChild, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  PreferencesService,
  SCHEME_VARIANTS,
  ThemeMode,
} from 'ng-material-preferences';
import { TitleCasePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-fab-color-menu',
  standalone: true,
  imports: [MatDividerModule, MatMenuModule, MatIconModule, TitleCasePipe],
  templateUrl: './fab-color-menu.component.html',
  styleUrl: './fab-color-menu.component.scss',
})
export class FabColorMenuComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly modes: ThemeMode[] = ['auto', 'light', 'dark'];
  readonly variants = SCHEME_VARIANTS;
  readonly contrasts = [
    { label: 'High', value: 1 },
    { label: 'Medium', value: 0.5 },
    { label: 'Standard', value: 0 },
    { label: 'Low', value: -0.5 },
    { label: 'Reduced', value: -1 },
  ];

  setContrast(level: number) {
    this.prefs.setAutoContrast(false);
    this.prefs.setContrastLevel(level);
  }
}
