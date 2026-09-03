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
      desc: 'Let users personalize their workspace with semantic color palettes, high-contrast modes, and seamless Light, Dark, or System Auto modes.' 
    },
    { 
      icon: 'accessibility_new', 
      title: 'Inclusive Accessibility', 
      desc: 'Toggle High Contrast modes, emulate Color Vision Deficiencies, and reduce motion for sensitive users: the perfect tools to help you Build toward WCAG conformance.' 
    },
    { 
      icon: 'visibility', 
      title: 'Vision Simulator', 
      desc: 'Built-in SVG filters specifically designed to simulate or compensate for Daltonism, Astigmatism, and Field of Vision loss.' 
    },
    { 
      icon: 'text_fields', 
      title: 'Granular Typography', 
      desc: 'Scale readability across the app. Swap between font families and smoothly adjust global typography scales.' 
    },
    { 
      icon: 'dashboard', 
      title: 'Layout & Density', 
      desc: 'Adapt to the user context. Switch from Comfort to Compact data densities, and adjust corner radius across the full spectrum: from sharp edges to fully pill-shaped.' 
    },
    { 
      icon: 'notifications', 
      title: 'Notification Control', 
      desc: 'Give users control over interruptions. Customize snackbar screen positions to match their workflow.' 
    }
  ];
}
