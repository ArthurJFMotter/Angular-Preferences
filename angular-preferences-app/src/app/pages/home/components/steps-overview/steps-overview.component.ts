import { Component } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface Step {
  id: number;
  title: string;
  description: string;
  imageAlt: string;
}

@Component({
  selector: 'app-steps-overview',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './steps-overview.component.html',
  styleUrls: ['./steps-overview.component.scss'],
})
export class StepsOverviewComponent {}
