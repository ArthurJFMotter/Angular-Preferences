import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-specs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-specs.component.html',
  styleUrls: ['./tech-specs.component.scss'],
})
export class TechSpecsComponent {
  technologies = [
    'SCSS Variables',
    'CSS Container Queries',
    'Angular Signals',
    'Material 3 Design Tokens',
  ];
}
