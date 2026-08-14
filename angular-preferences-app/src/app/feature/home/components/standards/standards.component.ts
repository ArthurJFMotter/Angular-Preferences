import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-standards',
  standalone: true,
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './standards.component.html',
  styleUrl: './standards.component.scss',
})
export class StandardsComponent {
  readonly standards = [
    { icon: 'layers', text: 'Material 3' },
    { icon: 'bolt', text: 'Signals' },
    { icon: 'preview', text: 'Live Preview' },
    { icon: 'accessibility_new', text: 'Accessibility Tooling' },
    { icon: 'visibility', text: 'CVD Simulation' },
    { icon: 'compress', text: 'Density Control' },
    { icon: 'format_size', text: 'Custom fonts' },
    { icon: 'contrast', text: 'High Contrast' },
    { icon: 'visibility_off', text: 'Reduced Motion' },
    { icon: 'css', text: 'CSS Custom Properties' },
    { icon: 'code_off', text: 'Headless' },
    { icon: 'subdirectory_arrow_right', text: 'Tree-Shakeable' },
  ];

   // Infinite loop array
  readonly marqueeItems = [...this.standards, ...this.standards];
}