import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { ThemeService } from 'ng-preferences';
import { NotificationPlacement } from 'ng-preferences';
import { SettingsCardWrapperComponent } from '../settings-card-wrapper/settings-card-wrapper.component';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports:[
    CommonModule,
    SettingsCardWrapperComponent,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss'],
})
export class NotificationSettingsComponent {
  public themeService = inject(ThemeService);

  // Notification Placement Options
  public placementOptions: { value: NotificationPlacement; label: string }[] =[
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-center', label: 'Top Center' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-center', label: 'Bottom Center' },
    { value: 'bottom-right', label: 'Bottom Right' },
  ];
}