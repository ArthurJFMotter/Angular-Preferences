import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

import { HeroIntroComponent } from './components/hero-intro/hero-intro.component';
import { InteractivePlaygroundComponent } from './components/interactive-playground/interactive-playground.component';
import { StepsOverviewComponent } from './components/steps-overview/steps-overview.component';
import { TechSpecsComponent } from './components/tech-specs/tech-specs.component';
import { FeaturesGridComponent } from './components/features-grid/features-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    HeroIntroComponent,
    InteractivePlaygroundComponent,
    StepsOverviewComponent,
    FeaturesGridComponent,
    TechSpecsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}