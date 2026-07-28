import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PercentPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PreferencesService, FONT_OPTIONS } from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [
    FormsModule,
    PercentPipe,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    PreferencesCardComponent,
  ],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss',
})
export class TypographyComponent {
  readonly prefs = inject(PreferencesService);
  readonly fontOptions = FONT_OPTIONS;

  scaleUp() {
    const c = this.prefs.fontScale();
    if (c < 1.3) this.prefs.setFontScale(Math.round((c + 0.05) * 100) / 100);
  }
  scaleDown() {
    const c = this.prefs.fontScale();
    if (c > 0.8) this.prefs.setFontScale(Math.round((c - 0.05) * 100) / 100);
  }
}
