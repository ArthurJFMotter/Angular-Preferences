import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-standards',
  standalone: true,
  imports: [MatIconModule],
   templateUrl: './standards.component.html',
  styleUrl: './standards.component.scss',
})
export class StandardsComponent {
  readonly standards = [
    { icon: 'layers', text: 'Material 3' }, { icon: 'bolt', text: 'Signals' },
    { icon: 'accessibility_new', text: 'WCAG 2.1 AAA' }, { icon: 'css', text: 'SCSS Variables' },
    { icon: 'preview', text: 'Live Preview' }, { icon: 'contrast', text: 'High Contrast' },
    { icon: 'format_size', text: 'Density Control' }
  ];
}