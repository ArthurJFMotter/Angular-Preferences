import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PreferencesService, SCHEME_VARIANTS } from 'ng-material-preferences';
import { ColorPickerComponent } from '../../../../shared/color-picker/color-picker.component';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';

@Component({
  selector: 'app-color-appearance',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    PreferencesCardComponent,
    ColorPickerComponent,
  ],
  templateUrl: './color-appearance.component.html',
  styleUrl: './color-appearance.component.scss',
})
export class ColorAppearanceComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChildren(MatMenuTrigger) menuTriggers!: QueryList<MatMenuTrigger>;
  readonly variantOptions = SCHEME_VARIANTS;

  getVariantLabel(value: string) {
    return this.variantOptions.find((v) => v.value === value)?.label || value;
  }
  closeCustomMenu() {
    this.menuTriggers.forEach((t) => t.closeMenu());
  }
  increaseContrast() {
    const c = this.prefs.contrastLevel();
    if (c < 1) this.prefs.setContrastLevel(c + 0.5);
  }
  decreaseContrast() {
    const c = this.prefs.contrastLevel();
    if (c > -1) this.prefs.setContrastLevel(c - 0.5);
  }
  formatContrast(value: number) {
    if (value === -1) return 'Reduced';
    if (value === -0.5) return 'Low';
    if (value === 0) return 'Standard';
    if (value === 0.5) return 'Medium';
    if (value === 1) return 'High';
    return value.toString();
  }
}
