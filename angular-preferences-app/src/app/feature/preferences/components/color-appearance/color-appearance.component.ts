import {
  Component,
  computed,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  PreferencesService,
  SCHEME_VARIANTS,
  CONTRAST_SCALE,
} from 'ng-material-preferences';
import { ColorPickerComponent } from '../../../../shared/color-picker/color-picker.component';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';
import { PreferenceSelectComponent } from '../../../../shared/preference-select/preference-select.component';
import { PreferenceSliderComponent } from '../../../../shared/preference-slider/preference-slider.component';

@Component({
  selector: 'app-color-appearance',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    PreferencesCardComponent,
    ColorPickerComponent,
    PreferenceSliderComponent,
    PreferenceSelectComponent,
  ],
  templateUrl: './color-appearance.component.html',
  styleUrl: './color-appearance.component.scss',
})
export class ColorAppearanceComponent {
  readonly prefs = inject(PreferencesService);
  @ViewChildren(MatMenuTrigger) menuTriggers!: QueryList<MatMenuTrigger>;

  // Constants
  readonly variantOptions = SCHEME_VARIANTS;
  readonly contrastScale = CONTRAST_SCALE;

  // Label fetch
  readonly contrastName = computed(() => {
    return (
      this.contrastScale.presets.find(
        (p) => p.value === this.prefs.contrastLevel(),
      )?.label || 'Standard'
    );
  });

  closeCustomMenu() {
    this.menuTriggers.forEach((t) => t.closeMenu());
  }
}
