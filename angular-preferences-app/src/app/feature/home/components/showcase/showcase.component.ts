import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatRippleModule } from '@angular/material/core';
import { PreferencesService } from 'ng-material-preferences';
import { interval } from 'rxjs';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent implements OnInit {
  private prefs = inject(PreferencesService);
  private destroyRef = inject(DestroyRef);

  readonly activeStep = signal<number>(1);
  readonly progress = signal<number>(0);

  ngOnInit() {
    // Run a tick every 50ms
    interval(50)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const scale = this.prefs.motionScale();

        if (scale === 0) {
          this.progress.set(0);
          return;
        }

        // Base duration = 5000ms per slide
        const increment = 1 / scale;
        let current = this.progress() + increment;

        // switch to the next step
        if (current >= 100) {
          current = 0;
          this.activeStep.set(
            this.activeStep() === 3 ? 1 : this.activeStep() + 1,
          );
        }

        this.progress.set(current);
      });
  }

  setStep(step: number) {
    this.activeStep.set(step);
    this.progress.set(0); // Reset the timer when manually clicked
  }
}
