import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  PreferencesService,
  SHAPE_SCALE,
  DENSITY_SCALE,
  MOTION_SCALE,
} from 'ng-material-preferences';
import { PreferencesCardComponent } from '../../shared/preferences-card/preferences-card.component';

import { AppUiStateService } from '../../../../core/services/app-ui-state.service';
import { ModalService } from '../../../../core/services/modal.service';
import { PreferenceSliderComponent } from '../../../../shared/preference-slider/preference-slider.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-interface-layout',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatTooltipModule,
    PreferencesCardComponent,
    PreferenceSliderComponent,
  ],
  templateUrl: './interface-layout.component.html',
  styleUrl: './interface-layout.component.scss',
})
export class InterfaceLayoutComponent {
  readonly prefs = inject(PreferencesService);
  readonly uiState = inject(AppUiStateService);
  private modals = inject(ModalService);

  // Scales
  readonly shapeScale = SHAPE_SCALE;
  readonly densityScale = DENSITY_SCALE;
  readonly motionScale = MOTION_SCALE;

  // Label fetch
  readonly motionName = computed(
    () =>
      this.motionScale.presets.find((m) => m.value === this.prefs.motionScale())
        ?.label || 'Normal',
  );

  openFabSettings() {
    const current = this.uiState.fabMenus();

    this.modals
      .open<any>({
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
            returnsPayload: true,
            isPrimary: true,
            color: 'primary',
          }, // changed to returnsPayload
        ],
      })
      .subscribe((result) => {
        if (result && result.checklist) {
          // Extract checklist from payload
          const nextState = { ...current };
          result.checklist.forEach((r: any) => (nextState[r.id] = r.checked));
          this.uiState.fabMenus.set(nextState);
        }
      });
  }

  openDrawerSettings() {
    const current = this.uiState.drawerConfig();

    this.modals
      .open<any>({
        title: 'Drawer Options',
        icon: 'vertical_split',
        message:
          'Configure how the side drawer behaves and renders on the screen.',
        showCloseButton: false,
        selects: [
          {
            id: 'mode',
            label: 'Sidenav Mode',
            value: current.mode,
            options: [
              { label: 'Over (Floats over content)', value: 'over' },
              { label: 'Push (Pushes content aside)', value: 'push' },
              { label: 'Side (Sits side-by-side)', value: 'side' },
            ],
          },
          {
            id: 'position',
            label: 'Position',
            value: current.position,
            options: [
              { label: 'Start (Left)', value: 'start' },
              { label: 'End (Right)', value: 'end' },
            ],
          },
        ],
        toggles: [
          {
            id: 'backdrop',
            label: 'Has Backdrop',
            checked: current.hasBackdrop,
          },
        ],
        actions: [
          { label: 'Cancel' },
          {
            label: 'Save',
            returnsPayload: true,
            isPrimary: true,
            color: 'primary',
          },
        ],
      })
      .subscribe((result) => {
        if (result) {
          // Map the payload back to the config
          const mode = result.selects.find((s: any) => s.id === 'mode').value;
          const position = result.selects.find(
            (s: any) => s.id === 'position',
          ).value;
          const hasBackdrop = result.toggles.find(
            (t: any) => t.id === 'backdrop',
          ).checked;

          this.uiState.drawerConfig.set({ mode, position, hasBackdrop });
        }
      });
  }
}
