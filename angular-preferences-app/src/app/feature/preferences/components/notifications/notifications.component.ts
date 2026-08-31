import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PreferencesService } from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';
import {
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import {
  NotificationService,
  NotificationType,
} from '../../../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    PreferencesCardComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  readonly prefs = inject(PreferencesService);
  readonly notify = inject(NotificationService);

  updateVPosition(val: MatSnackBarVerticalPosition) {
    this.prefs.setSnackbarVPosition(val);
    this.notify.show('default', `Spawn position updated to ${val}.`);
  }

  updateHPosition(val: MatSnackBarHorizontalPosition) {
    this.prefs.setSnackbarHPosition(val);
    this.notify.show('default', `Spawn position updated to ${val}.`);
  }

  testAlert(type: NotificationType) {
    const messages: Record<NotificationType, string> = {
      default: 'This is a standard system notification.',
      success: 'Profile saved successfully!',
      warning: 'Warning: Your connection is unstable.',
      info: 'Did you know? You can change theme variants.',
      error: 'Error: Failed to communicate with server.',
    };

    this.notify.show(type, messages[type]);
  }
}
