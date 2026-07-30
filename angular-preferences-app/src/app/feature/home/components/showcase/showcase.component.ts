import { Component, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MatRippleModule],
    templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  readonly activeStep = signal<number>(1);
}