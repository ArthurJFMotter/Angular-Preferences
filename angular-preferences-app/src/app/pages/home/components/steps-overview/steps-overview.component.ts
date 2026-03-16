import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Inject,
  inject,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from 'ng-preferences';
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
export class StepsOverviewComponent implements OnInit, OnDestroy {
  steps: Step[] = [
    {
      id: 0,
      title: 'Configure',
      description: 'Adjust global settings for typography, color, and density.',
      imageAlt: 'Configuration Sidebar Demo',
    },
    {
      id: 1,
      title: 'Preview',
      description: 'Watch your components transform in real-time.',
      imageAlt: 'Live Component Preview',
    },
    {
      id: 2,
      title: 'Integrate',
      description: 'Export your JSON config directly to your application.',
      imageAlt: 'Code Export Demo',
    },
  ];

  private themeService = inject(ThemeService);

  currentStepIndex = 0;
  progress = 0;
  private timer: any;
  private readonly STEP_DURATION = 5000; // 5 seconds per slide
  private readonly REFRESH_RATE = 50; // 50ms
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      const isReduced = this.themeService.isReducedMotion();

      if (isReduced) {
        this.stopTimer();
        this.progress = 0;
      } else if (this.isBrowser) {
        this.startTimer();
      }
    });
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  // --- Timer Logic ---
  startTimer() {
    this.stopTimer();

    if (this.themeService.isReducedMotion()) return;

    this.timer = setInterval(() => {
      this.progress += 100 / (this.STEP_DURATION / this.REFRESH_RATE);

      if (this.progress >= 100) {
        this.nextStep();
      }
    }, this.REFRESH_RATE);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  // --- Interaction Logic ---
  setStep(index: number) {
    this.currentStepIndex = index;
    this.progress = 0;
    this.stopTimer();
    this.startTimer();
  }

  nextStep() {
    this.currentStepIndex = (this.currentStepIndex + 1) % this.steps.length;
    this.progress = 0;
  }

  onPause() {
    this.stopTimer();
  }

  onResume() {
    this.startTimer();
  }
}
