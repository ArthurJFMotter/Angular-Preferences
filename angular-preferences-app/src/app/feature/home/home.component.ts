import { Component } from '@angular/core';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { FeaturesComponent } from './components/features/features.component';
import { HeroComponent } from './components/hero/hero.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { StandardsComponent } from './components/standards/standards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    StandardsComponent,
    ShowcaseComponent,
    FeaturesComponent,
    CallToActionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}