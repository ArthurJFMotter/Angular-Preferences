import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
/* will be moved to an module */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from './services/theme.service';
import { NgIf } from '@angular/common';
import { TypographyService } from './services/typography.service';
import { MatDividerModule } from '@angular/material/divider';
/* will be moved to an module */

@Component({
  selector: 'app-root',
  /* will be moved to an module */
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    NgIf,
  ],
  /* will be moved to an module */
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-preferences-app';

  // --- SERVICES ---
  themeService = inject(ThemeService);
  typographyService = inject(TypographyService);

  // --- HANDLERS ---
  onFontSizeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const newSize = parseFloat(value);
    if (!isNaN(newSize)) {
      this.typographyService.setBaseFontSize(newSize);
    }
  }
}
