import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService, ThemeMode } from 'ng-material-preferences';

@Component({
  selector: 'app-mock-window',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './mock-window.component.html',
  styleUrl: './mock-window.component.scss'
})
export class MockWindowComponent {
  private prefs = inject(PreferencesService);

  // --- 1. THEME MODE CYCLE ---
  private modes: ThemeMode[] = ['auto', 'light', 'dark'];
  
  cycleMode() {
    const current = this.prefs.mode();
    const nextIdx = (this.modes.indexOf(current) + 1) % this.modes.length;
    this.prefs.setMode(this.modes[nextIdx]);
  }
  
  modeDisplay = computed(() => {
    const m = this.prefs.mode();
    if (m === 'light') return { icon: 'light_mode', text: 'Light' };
    if (m === 'dark') return { icon: 'dark_mode', text: 'Dark' };
    return { icon: 'brightness_auto', text: 'Auto' };
  });

  // --- 2. CONTRAST CYCLE ---
  private contrasts = [0, 0.5, 1, -1, -0.5]; // Standard, Medium, High, Reduced, Low
  
  cycleContrast() {
    this.prefs.setAutoContrast(false); // Force manual override when clicked
    const current = this.prefs.contrastLevel();
    let idx = this.contrasts.indexOf(current);
    if (idx === -1) idx = 0; // Fallback
    const nextIdx = (idx + 1) % this.contrasts.length;
    this.prefs.setContrastLevel(this.contrasts[nextIdx]);
  }
  
  contrastDisplay = computed(() => {
    if (this.prefs.autoContrast()) return { icon: 'hdr_auto', text: 'Auto' };
    const c = this.prefs.contrastLevel();
    if (c === 1) return { icon: 'contrast', text: 'High' };
    if (c === 0.5) return { icon: 'brightness_medium', text: 'Medium' };
    if (c === -0.5) return { icon: 'brightness_low', text: 'Low' };
    if (c === -1) return { icon: 'exposure_neg_1', text: 'Reduced' };
    return { icon: 'tonality', text: 'Standard' };
  });

  // --- 3. SHAPE / CORNER RADIUS CYCLE ---
  private shapes = [1, 2, 3, 0]; // Rounded, Extra Round, Pill, Sharp
  
  cycleShape() {
    const current = this.prefs.shapeScale();
    let idx = this.shapes.indexOf(current);
    if (idx === -1) idx = 0;
    const nextIdx = (idx + 1) % this.shapes.length;
    this.prefs.setShapeScale(this.shapes[nextIdx]);
  }
  
  shapeDisplay = computed(() => {
    const s = this.prefs.shapeScale();
    if (s === 0) return { icon: 'square', text: 'Sharp' };
    if (s >= 2) return { icon: 'circle', text: 'Pill' };
    return { icon: 'rounded_corner', text: 'Rounded' };
  });

  // --- 4. TYPOGRAPHY / FONT SCALE CYCLE ---
  private scales = [1, 1.15, 1.3, 0.85]; // Medium, Large, X-Large, Small
  
  cycleFont() {
    const current = this.prefs.fontScale();
    let idx = this.scales.indexOf(current);
    if (idx === -1) idx = 0;
    const nextIdx = (idx + 1) % this.scales.length;
    this.prefs.setFontScale(this.scales[nextIdx]);
  }
  
  fontDisplay = computed(() => {
    const s = this.prefs.fontScale();
    if (s > 1.1) return { icon: 'text_increase', text: 'Large' };
    if (s < 1) return { icon: 'text_decrease', text: 'Small' };
    return { icon: 'format_size', text: 'Medium' };
  });
}