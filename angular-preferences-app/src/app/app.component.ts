import { Component, inject, SecurityContext } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PreferencesService } from './services/preferences.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PreferencesHelperComponent } from './components/preferences-helper/preferences-helper.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    PreferencesHelperComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-preferences-app';

  protected preferencesService = inject(PreferencesService);
  private sanitizer = inject(DomSanitizer);

  private readonly filtersSvg = `
    <svg style="position: absolute; height: 0; width: 0; overflow: hidden;" aria-hidden="true">
      <defs>
        <filter id="protanopia">
          <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0"/>
        </filter>
        <filter id="deuteranopia">
          <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0"/>
        </filter>
        <filter id="tritanopia">
          <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0"/>
        </filter>
        <filter id="achromatopsia">
          <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0"/>
        </filter>
      </defs>
    </svg>
  `;

  public safeFilters: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.filtersSvg);
}