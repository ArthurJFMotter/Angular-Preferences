import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  readonly features = [
    {
      icon: 'palette',
      title: 'Expressive Theming',
      desc: 'Let users personalize their workspace with semantic color palettes and seamless Light, Dark, or System Auto modes.',
    },
    {
      icon: 'accessibility_new',
      title: 'Inclusive Accessibility',
      desc: 'Meet WCAG guidelines instantly. Toggle High Contrast modes, emulate Color Vision Deficiencies, and Reduce Motion for sensitive users.',
    },
    {
      icon: 'visibility',
      title: 'Vision Simulator',
      desc: 'Built-in SVG filters specifically designed to simulate or compensate for Daltonism, Astigmatism, and Field of Vision loss.',
    },
    {
      icon: 'text_fields',
      title: 'Granular Typography',
      desc: 'Scale readability across the app. Swap between font families and smoothly adjust global typography scales.',
    },
    {
      icon: 'dashboard',
      title: 'Layout & Density',
      desc: 'Adapt to the user context. Switch from Comfort to Compact data densities, and manipulate Corner Shapes from rounded to sharp.',
    },
    {
      icon: 'notifications',
      title: 'Notification Control',
      desc: 'Give users control over interruptions. Customize snackbar screen positions and force high-contrast semantic alerts.',
    },
  ];
}
