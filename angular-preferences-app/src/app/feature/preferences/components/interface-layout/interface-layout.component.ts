import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PercentPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PreferencesService } from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';
import { AppUiStateService } from '../../../../core/services/app-ui-state.service';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-interface-layout',
  standalone: true,
  imports: [
    FormsModule,
    PercentPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    MatSlideToggleModule,
    PreferencesCardComponent,
  ],
  templateUrl: './interface-layout.component.html',
  styleUrl: './interface-layout.component.scss',
})
export class InterfaceLayoutComponent {
  readonly prefs = inject(PreferencesService);
  readonly uiState = inject(AppUiStateService);
  private modals = inject(ModalService);

  openFabSettings() {
    const current = this.uiState.fabMenus();

    this.modals
      .open<any[]>({
        title: 'Customize Quick Settings',
        icon: 'tune',
        message:
          'Select which preference domains appear in the floating action button menu.',
        showCloseButton: false,
        checklist: [
          {
            id: 'color',
            label: 'Theme & Color',
            checked: current['color'],
            disabled: !this.prefs.hasColor,
          },
          {
            id: 'typography',
            label: 'Typography',
            checked: current['typography'],
            disabled: !this.prefs.hasTypography,
          },
          {
            id: 'layout',
            label: 'Interface Scaling',
            checked: current['layout'],
            disabled: !this.prefs.hasLayout,
          },
          {
            id: 'notifications',
            label: 'Notifications',
            checked: current['notifications'],
            disabled: !this.prefs.hasNotifications,
          },
          {
            id: 'accessibility',
            label: 'Vision Simulator',
            checked: current['accessibility'],
            disabled: !this.prefs.hasAccessibility,
          },
        ],
        actions: [
          { label: 'Cancel' },
          {
            label: 'Save',
            returnsChecklist: true,
            isPrimary: true,
            color: 'primary',
          },
        ],
      })
      .subscribe((result) => {
        if (result) {
          const nextState = { ...current };
          result.forEach((r: any) => (nextState[r.id] = r.checked));
          this.uiState.fabMenus.set(nextState);
        }
      });
  }

  scaleShapeUp() {
    const c = this.prefs.shapeScale();
    if (c < 3) this.prefs.setShapeScale(Math.round((c + 0.25) * 100) / 100);
  }
  scaleShapeDown() {
    const c = this.prefs.shapeScale();
    if (c > 0) this.prefs.setShapeScale(Math.round((c - 0.25) * 100) / 100);
  }
  scaleDensityUp() {
    const c = this.prefs.densityScale();
    if (c < 0) this.prefs.setDensityScale(c + 1);
  }
  scaleDensityDown() {
    const c = this.prefs.densityScale();
    if (c > -3) this.prefs.setDensityScale(c - 1);
  }
  increaseMotion() {
    const c = this.prefs.motionScale();
    if (c < 1) this.prefs.setMotionScale(c + 0.5);
  }
  decreaseMotion() {
    const c = this.prefs.motionScale();
    if (c > 0) this.prefs.setMotionScale(c - 0.5);
  }
  formatMotion(value: number) {
    return value === 0 ? 'Off' : value === 0.5 ? 'Fast' : 'Normal';
  }
}
