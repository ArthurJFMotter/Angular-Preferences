import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface TechCategory {
  title: string;
  icon: string;
  items: string[];
}

@Component({
  selector: 'app-tech-specs',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './tech-specs.component.html',
  styleUrls: ['./tech-specs.component.scss'],
})
export class TechSpecsComponent {
  categories: TechCategory[] = [
    {
      title: 'Core Stack',
      icon: 'code',
      items: ['Angular 17+', 'TypeScript', 'RxJS', 'SCSS / SASS'],
    },
    {
      title: 'Architecture',
      icon: 'layers',
      items: [
        'Angular Signals',
        'Service-based State',
        'Modular CSS',
        '7-1 Pattern',
      ],
    },
    {
      title: 'Accessibility & UX',
      icon: 'accessibility_new',
      items: [
        'WCAG 2.1 Compliant',
        'High Contrast Support',
        'Reduced Motion',
        'Daltonic Filters',
      ],
    },
    {
      title: 'Functional Specs',
      icon: 'tune',
      items: [
        'Deep Theming',
        'Density Control',
        'Live Preview',
        'CSS Container Queries',
      ],
    },
  ];
}
