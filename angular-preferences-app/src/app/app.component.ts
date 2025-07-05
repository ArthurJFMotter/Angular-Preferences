import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreferencesService } from './services/preferences.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PreferencesHelperComponent } from './components/preferences-helper/preferences-helper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    PreferencesHelperComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-preferences-app';

  private preferencesService = inject(PreferencesService);
}