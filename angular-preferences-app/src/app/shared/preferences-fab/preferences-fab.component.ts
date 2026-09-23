import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PreferencesService } from 'ng-material-preferences';

import { FabAccessibilityMenuComponent } from './components/fab-accessibility-menu/fab-accessibility-menu.component';
import { FabColorMenuComponent } from './components/fab-color-menu/fab-color-menu.component';
import { FabLayoutMenuComponent } from './components/fab-layout-menu/fab-layout-menu.component';
import { FabNotificationsMenuComponent } from './components/fab-notifications-menu/fab-notifications-menu.component';
import { FabTypographyMenuComponent } from './components/fab-typography-menu/fab-typography-menu.component';
import { AppUiStateService } from '../../core/services/app-ui-state.service';

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
}
