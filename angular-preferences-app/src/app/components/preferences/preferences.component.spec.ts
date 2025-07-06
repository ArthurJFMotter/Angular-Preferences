import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

import { PreferencesComponent } from './preferences.component';
import { DensityService } from '../../services/density.service';
import { TypographyService } from '../../services/typography.service';
import { PreferencesService } from '../../services/preferences.service';
import { ThemeService } from '../../services/theme.service';

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  // --- MOCK SERVICES ---
  const mockDensityService = {
    getDensities: () => [{ value: 0, displayName: 'Default' }],
    currentDensity: signal({ value: 0, displayName: 'Default' }),
  };

  const mockTypographyService = {
    getFonts: () => [{ id: 'roboto', displayName: 'Roboto' }],
    activeFont: signal({ id: 'roboto', displayName: 'Roboto' }),
    getFontSizes: () => [{ id: 'medium', displayName: 'Medium', pixelValue: 16 }],
    activeFontSize: signal({ id: 'medium', displayName: 'Medium', pixelValue: 16 }),
  };

  const mockPreferencesService = {
    setFont: () => {},
    setFontSize: () => {},
    setDensity: () => {},
    setTheme: () => {},
    toggleDarkMode: () => {},
    toggleHighContrastMode: () => {},
    setColorFilter: () => {},
  };

  const mockThemeService = {
    getThemes: () => [{ id: 'default', displayName: 'Default', primary: '#673ab7' }],
    currentTheme: signal({ id: 'default', displayName: 'Default', primary: '#673ab7' }),
    isDarkMode: signal(false),
    isHighContrastMode: signal(false),
    getDaltonicFilters: () => [{ id: 'none', displayName: 'None' }],
    activeColorFilter: signal('none'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferencesComponent, NoopAnimationsModule],
      providers: [
        { provide: DensityService, useValue: mockDensityService },
        { provide: TypographyService, useValue: mockTypographyService },
        { provide: PreferencesService, useValue: mockPreferencesService },
        { provide: ThemeService, useValue: mockThemeService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});