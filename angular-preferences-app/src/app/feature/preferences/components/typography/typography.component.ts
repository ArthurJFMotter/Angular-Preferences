import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { PreferencesService, FONT_OPTIONS, FONT_SCALE } from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';
import { PreferenceSliderComponent } from '../../../../shared/preference-slider/preference-slider.component';


@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    PreferencesCardComponent,
    PreferenceSliderComponent, 
  ],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss', 
})
export class TypographyComponent {
  readonly prefs = inject(PreferencesService);
  
   // Constants
  readonly fontOptions = FONT_OPTIONS;
  readonly fontScale = FONT_SCALE; 
}