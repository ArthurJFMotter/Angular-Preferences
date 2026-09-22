import { Component, ViewChild, inject } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService } from 'ng-material-preferences';
import {
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { TitleCasePipe } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-fab-notifications-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, TitleCasePipe],
  templateUrl: './fab-notifications-menu.component.html',
  styleUrl: './fab-notifications-menu.component.scss',
})
export class FabNotificationsMenuComponent {
  readonly prefs = inject(PreferencesService);
  private notify = inject(NotificationService);

  @ViewChild('menu', { static: true }) menu!: MatMenu;

  readonly vPositions: MatSnackBarVerticalPosition[] = ['top', 'bottom'];
  readonly hPositions: MatSnackBarHorizontalPosition[] = [
    'start',
    'center',
    'end',
  ];

  setVPosition(val: MatSnackBarVerticalPosition) {
    this.prefs.setSnackbarVPosition(val);
    this.notify.show('default', `Vertical spawn updated to ${val}.`);
  }

  setHPosition(val: MatSnackBarHorizontalPosition) {
    this.prefs.setSnackbarHPosition(val);
    this.notify.show('default', `Horizontal spawn updated to ${val}.`);
  }
}
