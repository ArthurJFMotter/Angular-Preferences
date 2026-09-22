import { Component, ViewChild, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService, FONT_OPTIONS } from 'ng-material-preferences';

@Component({
  selector: 'app-fab-typography-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './fab-typography-menu.component.html',
  styleUrl: './fab-typography-menu.component.scss',
})
export class FabTypographyMenuComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly fonts = FONT_OPTIONS;
  readonly scales = [
    { label: 'X-Large', value: 1.3 },
    { label: 'Large', value: 1.15 },
    { label: 'Medium', value: 1 },
    { label: 'Small', value: 0.85 },
  ];

  getPercentage(val: number): number {
    return Math.round(val * 100);
  }
}
