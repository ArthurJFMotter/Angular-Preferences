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
  readonly prefs = inject(PreferencesService);

  // --- 1. THEME MODE CYCLE ---
  private modes: ThemeMode[] = ['auto', 'light', 'dark'];
  
  cycleMode() {
    if (!this.prefs.hasColor) return;
    const current = this.prefs.mode();
    const nextIdx = (this.modes.indexOf(current) + 1) % this.modes.length;
    this.prefs.setMode(this.modes[nextIdx]);
  }
  
  modeDisplay = computed(() => {
    if (!this.prefs.hasColor) return { icon: 'block', text: 'Disabled' };
    const m = this.prefs.mode();
    if (m === 'light') return { icon: 'light_mode', text: 'Light' };
    if (m === 'dark') return { icon: 'dark_mode', text: 'Dark' };
    return { icon: 'brightness_auto', text: 'Auto' };
  });

  // --- 2. CONTRAST CYCLE ---
  private contrastSteps: (number | 'auto')[] = ['auto', 0, 0.5, 1, -1, -0.5];
  
  cycleContrast() {
    if (!this.prefs.hasColor) return;
    
    const current = this.prefs.autoContrast() ? 'auto' : this.prefs.contrastLevel();
    const idx = this.contrastSteps.indexOf(current);
    const next = this.contrastSteps[(idx + 1) % this.contrastSteps.length];
    
    if (next === 'auto') {
      this.prefs.setAutoContrast(true);
    } else {
      this.prefs.setAutoContrast(false);
      this.prefs.setContrastLevel(next);
    }
  }
  
  contrastDisplay = computed(() => {
    if (!this.prefs.hasColor) return { icon: 'block', text: 'Disabled' };
    if (this.prefs.autoContrast()) return { icon: 'hdr_auto', text: 'Auto' };
    const c = this.prefs.contrastLevel();
    if (c >= 1) return { icon: 'contrast', text: 'High' };
    if (c === 0.5) return { icon: 'brightness_medium', text: 'Medium' };
    if (c <= -1) return { icon: 'exposure_neg_1', text: 'Reduced' };
    if (c === -0.5) return { icon: 'brightness_low', text: 'Low' };
    return { icon: 'tonality', text: 'Standard' };
  });

  // --- 3. SHAPE / CORNER RADIUS CYCLE ---
  private shapes = [1, 2, 3, 0]; // Rounded, Extra Round, Pill, Sharp
  
  cycleShape() {
    if (!this.prefs.hasLayout) return;
    const current = this.prefs.shapeScale();
    
    const idx = this.shapes.reduce((closest, val, i) =>
      Math.abs(val - current) < Math.abs(this.shapes[closest] - current) ? i : closest, 0);
      
    const nextIdx = (idx + 1) % this.shapes.length;
    this.prefs.setShapeScale(this.shapes[nextIdx]);
  }
  
  shapeDisplay = computed(() => {
    if (!this.prefs.hasLayout) return { icon: 'block', text: 'Disabled' };
    const s = this.prefs.shapeScale();
    if (s <= 0.25) return { icon: 'square', text: 'Sharp' };
    if (s >= 2.5) return { icon: 'circle', text: 'Pill' };
    if (s >= 1.5) return { icon: 'rounded_corner', text: 'Extra Round' };
    return { icon: 'rounded_corner', text: 'Rounded' };
  });

  // --- 4. TYPOGRAPHY / FONT SCALE CYCLE ---
  private scales = [1, 1.15, 1.3, 0.85]; // Medium, Large, X-Large, Small
  
  cycleFont() {
    if (!this.prefs.hasTypography) return;
    const current = this.prefs.fontScale();
    
    const idx = this.scales.reduce((closest, val, i) =>
      Math.abs(val - current) < Math.abs(this.scales[closest] - current) ? i : closest, 0);
      
    const nextIdx = (idx + 1) % this.scales.length;
    this.prefs.setFontScale(this.scales[nextIdx]);
  }
  
  fontDisplay = computed(() => {
    if (!this.prefs.hasTypography) return { icon: 'block', text: 'Disabled' };
    const s = this.prefs.fontScale();
    
    if (s >= 1.25) return { icon: 'text_increase', text: 'X-Large' }; 
    if (s >= 1.1) return { icon: 'text_increase', text: 'Large' };
    if (s < 1) return { icon: 'text_decrease', text: 'Small' };
    return { icon: 'format_size', text: 'Medium' };
  });
}