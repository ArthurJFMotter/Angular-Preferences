import { Component, ViewChild, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService } from 'ng-material-preferences';

@Component({
  selector: 'app-fab-layout-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './fab-layout-menu.component.html',
  styleUrl: './fab-layout-menu.component.scss',
})
export class FabLayoutMenuComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly shapes = [
    { label: 'Pill', value: 3 },
    { label: 'Extra Round', value: 2 },
    { label: 'Rounded', value: 1 },
    { label: 'Sharp', value: 0 },
  ];
  readonly densities = [
    { label: 'Comfort (0)', value: 0 },
    { label: 'Compact (-3)', value: -3 },
  ];
  readonly motions = [
    { label: 'Normal', value: 1 },
    { label: 'Fast', value: 0.5 },
    { label: 'Off', value: 0 },
  ];
}
