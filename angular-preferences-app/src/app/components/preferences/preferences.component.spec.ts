import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

import { PreferencesComponent } from './preferences.component';
import { DensityService } from '../../services/density.service';
import { TypographyService } from '../../services/typography.service';
import { PreferencesService } from '../../services/preferences.service';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  // Use spies for the mock service to track calls
  let mockPreferencesService: jasmine.SpyObj<PreferencesService>;

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

  const mockThemeService = {
    getThemes: () => [{ id: 'default', displayName: 'Default', primary: '#673ab7' }],
    currentTheme: signal({ id: 'default', displayName: 'Default', primary: '#673ab7' }),
    isDarkMode: signal(false),
    isHighContrastMode: signal(false),
    getDaltonicFilters: () => [{ id: 'none', displayName: 'None' }],
    activeColorFilter: signal('none'),
  };

  // NEW: Mock for the I18nService
  const mockI18nService = {
    currentLocale: 'en-US',
    supportedLocales: [
      { id: 'en-US', displayName: 'English' },
      { id: 'es', displayName: 'Español' },
    ],
  };

  beforeEach(async () => {
    // Create a spy object for PreferencesService
    const preferencesServiceSpy = jasmine.createSpyObj('PreferencesService', [
      'setTheme',
      'toggleDarkMode',
      'toggleHighContrastMode',
      'setColorFilter',
      'setFont',
      'setFontSize',
      'setDensity',
      'setLocale' // Add the new method
    ]);

    await TestBed.configureTestingModule({
      imports: [PreferencesComponent, NoopAnimationsModule],
      providers: [
        { provide: DensityService, useValue: mockDensityService },
        { provide: TypographyService, useValue: mockTypographyService },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: PreferencesService, useValue: preferencesServiceSpy },
        { provide: I18nService, useValue: mockI18nService }, // Provide the new mock
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    mockPreferencesService = TestBed.inject(PreferencesService) as jasmine.SpyObj<PreferencesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the language selection card with the correct current language', () => {
    const cardTitle = fixture.nativeElement.querySelector('mat-card-title[i18n="@@prefsLanguageTitle"]');
    expect(cardTitle.textContent.trim()).toBe('Language');
    
    // Check if the mat-select shows the correct initial value
    const select = fixture.nativeElement.querySelector('mat-select[aria-label="Select a language"]');
    expect(select).toBeTruthy();
    
    const displayedValue = fixture.nativeElement.querySelector('.mat-mdc-select-value-text').textContent;
    expect(displayedValue.trim()).toBe('English');
  });

  it('should call preferencesService.setLocale when a new language is selected', () => {
    const newLocaleId = 'es';

    // Find the select trigger and click it to open the options panel
    const selectTrigger = fixture.nativeElement.querySelector('mat-select[aria-label="Select a language"]');
    selectTrigger.click();
    fixture.detectChanges();

    // Mat-option elements are in an overlay attached to the document body
    const options = document.querySelectorAll('mat-option');
    const spanishOption = Array.from(options).find(opt => opt.textContent?.trim() === 'Español');
    
    expect(spanishOption).withContext('The "Español" option should be found').toBeTruthy();

    // Click the Spanish option
    (spanishOption as HTMLElement).click();
    fixture.detectChanges();

    // Verify that the service method was called with the correct locale ID
    expect(mockPreferencesService.setLocale).toHaveBeenCalledWith(newLocaleId);
    expect(mockPreferencesService.setLocale).toHaveBeenCalledTimes(1);
  });
  
  it('should call preferencesService.toggleDarkMode on slide toggle change', () => {
    const darkModeToggle = fixture.nativeElement.querySelector('mat-slide-toggle[i18n="@@prefsDarkModeToggle"] input');
    darkModeToggle.click();
    fixture.detectChanges();

    expect(mockPreferencesService.toggleDarkMode).toHaveBeenCalled();
  });
});