import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ThemeService } from '../../../../services/theme.service';
import { PreferencesService } from '../../../../services/preferences.service';
import { ShapeService } from '../../../../services/shape.service';
import { HelpButtonComponent } from '../../../../components/help-button/help-button.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-appearance-settings',
  standalone: true,
  imports: [
    CommonModule,
    HelpButtonComponent,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  templateUrl: './appearance-settings.component.html',
  styleUrls: ['./appearance-settings.component.scss'],
})
export class AppearanceSettingsComponent {
  themeService = inject(ThemeService);
  preferencesService = inject(PreferencesService);
  shapeService = inject(ShapeService);

  readonly shapes = this.shapeService.getShapes();
  activeShape = this.shapeService.activeShape;

  shapeSliderIndex = signal(
    this.shapes.findIndex((s) => s.id === this.activeShape().id)
  );

  constructor() {
    // Sync slider when shape changes externally
    effect(() => {
      const currentId = this.activeShape().id;
      const newIndex = this.shapes.findIndex((s) => s.id === currentId);
      if (newIndex > -1 && newIndex !== this.shapeSliderIndex()) {
        this.shapeSliderIndex.set(newIndex);
      }
    });
  }

  updateShape(index: number): void {
    this.shapeSliderIndex.set(index);
    const selectedShape = this.shapes[index];
    if (selectedShape) {
      this.preferencesService.setShape(selectedShape.id);
    }
  }
}