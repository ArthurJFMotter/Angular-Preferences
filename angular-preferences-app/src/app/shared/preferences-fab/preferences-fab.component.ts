import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PreferencesService } from 'ng-material-preferences';
import { AppUiStateService } from '../../core/services/app-ui-state.service';

import { FabAccessibilityMenuComponent } from './components/fab-accessibility-menu/fab-accessibility-menu.component';
import { FabColorMenuComponent } from './components/fab-color-menu/fab-color-menu.component';
import { FabLayoutMenuComponent } from './components/fab-layout-menu/fab-layout-menu.component';
import { FabNotificationsMenuComponent } from './components/fab-notifications-menu/fab-notifications-menu.component';
import { FabTypographyMenuComponent } from './components/fab-typography-menu/fab-typography-menu.component';

@Component({
  selector: 'app-preferences-fab',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FabColorMenuComponent,
    FabTypographyMenuComponent,
    FabLayoutMenuComponent,
    FabNotificationsMenuComponent,
    FabAccessibilityMenuComponent,
  ],
  templateUrl: './preferences-fab.component.html',
  styleUrl: './preferences-fab.component.scss',
})
export class PreferencesFabComponent {
  readonly prefs = inject(PreferencesService);
  readonly uiState = inject(AppUiStateService);

  readonly isMenuOpen = signal(false);

  // Calculate the target safe corner
  readonly desiredCorner = computed(() => {
    const v = this.prefs.snackbarVPosition();
    const h = this.prefs.snackbarHPosition();

    // strict vertical avoidance
    const safeV = v === 'bottom' ? 'top' : 'bottom';
    const safeH = h === 'end' ? 'start' : 'end';

    return `${safeV}-${safeH}`; // e.g., 'top-start', 'bottom-end'
  });

  readonly activeCorner = signal<string>('top-end');

  // Dynamically orient the menu so it opens inward instead of off-screen!
  readonly menuY = computed<'above' | 'below'>(() =>
    this.activeCorner().includes('bottom') ? 'above' : 'below',
  );
  readonly menuX = computed<'before' | 'after'>(() =>
    this.activeCorner().includes('end') ? 'before' : 'after',
  );

  constructor() {
    effect(
      () => {
        const target = this.desiredCorner();
        /* Commet for Quick relocation Behaviour */
        if (!this.isMenuOpen()) {
          this.activeCorner.set(target);
        }
      },
      { allowSignalWrites: true },
    );
  }

  // Track the menu lifecycle
  onMenuOpened() {
    this.isMenuOpen.set(true);
  }

  onMenuClosed() {
    this.isMenuOpen.set(false);
    // Snap to the safe corner the moment the user finishes their interaction
    this.activeCorner.set(this.desiredCorner());
  }
}
