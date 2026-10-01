import { Component, ViewChild, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  PreferencesService,
  SNACKBAR_H_POSITIONS,
  SNACKBAR_V_POSITIONS,
} from 'ng-material-preferences';
import { NotificationService } from '../../../../core/services/notification.service';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-fab-notifications-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './fab-notifications-menu.component.html',
  styleUrl: './fab-notifications-menu.component.scss',
})
export class FabNotificationsMenuComponent {
  readonly prefs = inject(PreferencesService);
  private notify = inject(NotificationService);
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly vPositions: MatSnackBarVerticalPosition[] = SNACKBAR_V_POSITIONS.map(
    (p) => p.value as MatSnackBarVerticalPosition,
  );
  readonly hPositions: MatSnackBarHorizontalPosition[] =
    SNACKBAR_H_POSITIONS.map((p) => p.value as MatSnackBarHorizontalPosition);

  // --- CYCLERS ---
  cycleVPosition(e: Event) {
    e.stopPropagation();
    const current = this.prefs.snackbarVPosition();
    const nextV = current === 'bottom' ? 'top' : 'bottom';
    this.prefs.setSnackbarVPosition(nextV);
    this.notify.show('default', `Vertical spawn updated to ${nextV}.`);
  }

  cycleHPosition(e: Event) {
    e.stopPropagation();
    const current = this.prefs.snackbarHPosition();

    const idx = this.hPositions.findIndex((h) => h === current);
    const nextH =
      this.hPositions[(Math.max(idx, 0) + 1) % this.hPositions.length];

    this.prefs.setSnackbarHPosition(nextH);
    this.notify.show('default', `Horizontal spawn updated to ${nextH}.`);
  }
}
