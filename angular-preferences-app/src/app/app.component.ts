import { Component, inject, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//import { FooterComponent } from './shared/footer/footer.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
//import { PreferencesFabComponent } from './shared/preferences-fab/preferences-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    //FooterComponent,
    //NavbarComponent,
    //PreferencesFabComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-preferences-app';
}