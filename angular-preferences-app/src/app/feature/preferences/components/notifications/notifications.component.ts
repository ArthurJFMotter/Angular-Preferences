import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PreferencesService } from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    PreferencesCardComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  readonly prefs = inject(PreferencesService);
}
