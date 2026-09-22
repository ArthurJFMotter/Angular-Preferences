import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { PreferencesService } from 'ng-material-preferences';

@Component({
  selector: 'app-preferences-fab',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './preferences-fab.component.html',
  styleUrl: './preferences-fab.component.scss'
})
export class PreferencesFabComponent {
  readonly prefs = inject(PreferencesService);

  // Quick helper for toggling themes
  cycleTheme() {
    const current = this.prefs.mode();
    this.prefs.setMode(current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light');
  }
}