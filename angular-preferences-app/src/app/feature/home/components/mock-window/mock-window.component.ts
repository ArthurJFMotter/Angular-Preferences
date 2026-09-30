import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { 
  PreferencesService, 
  ThemeMode, 
  CONTRAST_SCALE, 
  SHAPE_SCALE, 
  FONT_SCALE 
} from 'ng-material-preferences';

@Component({
  selector: 'app-mock-window',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './mock-window.component.html',
  styleUrl: './mock-window.component.scss'
})
export class MockWindowComponent {
  readonly prefs = inject(PreferencesService);

  // --- THEME MODE CYCLE ---
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

  // --- CONTRAST CYCLE ---
  cycleContrast() {
    if (!this.prefs.hasColor) return;
    
    const presets = CONTRAST_SCALE.presets.map(p => p.value);
    const steps: (number | 'auto')[] = ['auto', ...presets];
    
    const current = this.prefs.autoContrast() ? 'auto' : this.prefs.contrastLevel();
    const idx = steps.indexOf(current);
    const next = steps[(idx + 1) % steps.length];
    
    if (next === 'auto') {
      this.prefs.setAutoContrast(true);
    } else {
      this.prefs.setAutoContrast(false);
      this.prefs.setContrastLevel(next as number);
    }
  }
  
  contrastDisplay = computed(() => {
    if (!this.prefs.hasColor) return { icon: 'block', text: 'Disabled' };
    if (this.prefs.autoContrast()) return { icon: 'hdr_auto', text: 'Auto' };
    
    const c = this.prefs.contrastLevel();
    const match = CONTRAST_SCALE.presets.reduce((prev, curr) => 
      Math.abs(curr.value - c) < Math.abs(prev.value - c) ? curr : prev
    );

    let icon = 'tonality';
    if (match.value >= 1) icon = 'contrast';
    else if (match.value === 0.5) icon = 'brightness_medium';
    else if (match.value <= -1) icon = 'exposure_neg_1';
    else if (match.value === -0.5) icon = 'brightness_low';
    
    return { icon, text: match.label };
  });

  // --- SHAPE / CORNER RADIUS CYCLE ---
  cycleShape() {
    if (!this.prefs.hasLayout) return;
    const current = this.prefs.shapeScale();
    const presets = SHAPE_SCALE.presets;
    
    const idx = presets.reduce((closest, val, i) =>
      Math.abs(val.value - current) < Math.abs(presets[closest].value - current) ? i : closest, 0);
      
    const nextIdx = (idx + 1) % presets.length;
    this.prefs.setShapeScale(presets[nextIdx].value);
  }
  
  shapeDisplay = computed(() => {
    if (!this.prefs.hasLayout) return { icon: 'block', text: 'Disabled' };
    
    const s = this.prefs.shapeScale();
    const match = SHAPE_SCALE.presets.reduce((prev, curr) => 
      Math.abs(curr.value - s) < Math.abs(prev.value - s) ? curr : prev
    );
    
    let icon = 'rounded_corner';
    if (match.value <= 0) icon = 'square';
    if (match.value >= 3) icon = 'circle';
    
    return { icon, text: match.label };
  });

  // --- TYPOGRAPHY / FONT SCALE CYCLE ---
  cycleFont() {
    if (!this.prefs.hasTypography) return;
    const current = this.prefs.fontScale();
    const presets = FONT_SCALE.presets;
    
    const idx = presets.reduce((closest, val, i) =>
      Math.abs(val.value - current) < Math.abs(presets[closest].value - current) ? i : closest, 0);
      
    const nextIdx = (idx + 1) % presets.length;
    this.prefs.setFontScale(presets[nextIdx].value);
  }
  
  fontDisplay = computed(() => {
    if (!this.prefs.hasTypography) return { icon: 'block', text: 'Disabled' };
    
    const s = this.prefs.fontScale();
    const match = FONT_SCALE.presets.reduce((prev, curr) => 
      Math.abs(curr.value - s) < Math.abs(prev.value - s) ? curr : prev
    );
    
    let icon = 'format_size';
    if (match.value >= 1.15) icon = 'text_increase';
    if (match.value < 1) icon = 'text_decrease';
    
    return { icon, text: match.label }; 
  });
}