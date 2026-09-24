import { Component, ViewChild, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService } from 'ng-material-preferences';
import { NotificationService } from '../../../../core/services/notification.service';

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

  cycleVPosition(e: Event) {
    e.stopPropagation();
    const current = this.prefs.snackbarVPosition();
    const nextV = current === 'bottom' ? 'top' : 'bottom';

    this.prefs.setSnackbarVPosition(nextV);
    this.notify.show('default', `Vertical spawn updated to ${nextV}.`);
  }

  cycleHPosition(e: Event) {
    e.stopPropagation();
    const positions: any[] = ['start', 'center', 'end'];
    const current = this.prefs.snackbarHPosition();
    const nextIdx = (positions.indexOf(current) + 1) % positions.length;
    const nextH = positions[nextIdx];

    this.prefs.setSnackbarHPosition(nextH);
    this.notify.show('default', `Horizontal spawn updated to ${nextH}.`);
  }
}
