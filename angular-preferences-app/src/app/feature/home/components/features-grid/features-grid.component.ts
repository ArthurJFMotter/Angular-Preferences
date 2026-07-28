import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  icon: string;
  title: string;
  description: string;
  highlightWords: string[];
}

@Component({
  selector: 'app-features-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './features-grid.component.html',
  styleUrls: ['./features-grid.component.scss'],
})
export class FeaturesGridComponent {
  features: Feature[] = [
    {
      icon: 'palette',
      title: 'Expressive Theming',
      description:
        'Let users personalize their workspace with semantic color palettes and seamless Light, Dark, or System Auto modes.',
      highlightWords: ['semantic color', 'Light, Dark, or System Auto'],
    },
    {
      icon: 'accessibility_new',
      title: 'Inclusive Accessibility',
      description:
        'Meet WCAG guidelines instantly. Toggle High Contrast modes, enable Floating Helpers, and Reduce Motion for sensitive users.',
      highlightWords: ['High Contrast', 'Reduce Motion'],
    },
    {
      icon: 'visibility',
      title: 'Color Vision Support',
      description:
        'Built-in SVG filters specifically designed to support Daltonic users (Color Vision Deficiency), ensuring distinct UI clarity.',
      highlightWords: ['Daltonic users', 'Color Vision Deficiency'],
    },
    {
      icon: 'text_fields',
      title: 'Granular Typography',
      description:
        'Scale readability across the app. Swap between font families like Roboto or Open Sans, and easily adjust global Font Sizes.',
      highlightWords: ['font families', 'Font Sizes'],
    },
    {
      icon: 'space_dashboard',
      title: 'Layout & Density',
      description:
        'Adapt to the user context. Switch from Comfort to Compact data densities, and manipulate Corner Shapes from rounded to sharp.',
      highlightWords: ['Comfort to Compact', 'Corner Shapes'],
    },
    {
      icon: 'notifications_active',
      title: 'Notification Control',
      description:
        'Give users control over interruptions. Customize snackbar Screen Positions, force high contrast alerts, or use classic colors.',
      highlightWords: ['Screen Positions', 'high contrast alerts'],
    },
  ];

  formatDescription(text: string, wordsToHighlight: string[]): string {
    let formattedText = text;
    wordsToHighlight.forEach((word) => {
      formattedText = formattedText.replace(word, `<strong>${word}</strong>`);
    });
    return formattedText;
  }
}
