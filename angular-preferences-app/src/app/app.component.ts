import { Component, HostBinding, inject, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PreferencesService } from 'ng-material-preferences';
import { PreferencesFabComponent } from './shared/preferences-fab/preferences-fab.component';
import { AppUiStateService } from './core/services/app-ui-state.service';
import { PreferencesSideDrawerComponent } from './shared/preferences-side-drawer/preferences-side-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    FooterComponent,
    NavbarComponent,
    PreferencesFabComponent,
    PreferencesSideDrawerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-preferences-app';

  private prefs = inject(PreferencesService);
  readonly uiState = inject(AppUiStateService);

  // Kills Angular JS-driven animations on the component tree when Motion is 0
  @HostBinding('@.disabled')
  get animationsDisabled() {
    return this.prefs.motionScale() === 0;
  }
}