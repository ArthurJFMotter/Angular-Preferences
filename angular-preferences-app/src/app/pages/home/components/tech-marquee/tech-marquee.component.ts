import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tech-marquee',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tech-marquee.component.html',
  styleUrls: ['./tech-marquee.component.scss'],
})
export class TechMarqueeComponent {
  readonly items = [
    { label: 'Angular 17+', icon: 'code' },
    { label: 'Material 3', icon: 'palette' },
    { label: 'Signals', icon: 'bolt' },
    { label: 'WCAG 2.1 AAA', icon: 'accessibility_new' },
    { label: 'SCSS Variables', icon: 'style' },
    { label: 'Live Preview', icon: 'visibility' },
    { label: 'High Contrast', icon: 'contrast' },
    { label: 'Density Control', icon: 'compress' },
    { label: 'Container Queries', icon: 'aspect_ratio' },
    { label: 'RxJS', icon: 'data_object' },
    { label: 'Daltonic Support', icon: 'remove_red_eye' },
    { label: '7-1 Pattern', icon: 'layers' },
  ];
  
  // Infinite loop
  marqueeItems = [...this.items, ...this.items];
}