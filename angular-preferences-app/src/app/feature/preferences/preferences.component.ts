import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService } from 'ng-material-preferences';
import { ColorAppearanceComponent } from './components/color-appearance/color-appearance.component';
import { InterfaceLayoutComponent } from './components/interface-layout/interface-layout.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TypographyComponent } from './components/typography/typography.component';
import { VisionFiltersComponent } from './components/vision-filters/vision-filters.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ColorAppearanceComponent,
    TypographyComponent,
    InterfaceLayoutComponent,
    NotificationsComponent,
    VisionFiltersComponent,
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
})
export class PreferencesComponent {
  readonly prefs = inject(PreferencesService);
}
