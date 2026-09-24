import { Component, ViewChild, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  PreferencesService,
  CVD_MODES,
  SCREEN_FILTERS,
  CvdMode,
  ScreenFilter,
} from 'ng-material-preferences';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-fab-accessibility-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatDividerModule],
  templateUrl: './fab-accessibility-menu.component.html',
  styleUrl: './fab-accessibility-menu.component.scss',
})
export class FabAccessibilityMenuComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly cvds = CVD_MODES;
  readonly filters = SCREEN_FILTERS;

  // --- Helpers ---
  selectCvd(e: Event, value: CvdMode) {
    e.stopPropagation(); 
    this.prefs.setCvdMode(value);
  }

  selectFilter(e: Event, value: ScreenFilter) {
    e.stopPropagation();
    this.prefs.setScreenFilter(value);
  }
}