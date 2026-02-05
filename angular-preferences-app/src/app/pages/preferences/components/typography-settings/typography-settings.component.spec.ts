import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographySettingsComponent } from './typography-settings.component';

describe('TypographySettingsComponent', () => {
  let component: TypographySettingsComponent;
  let fixture: ComponentFixture<TypographySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographySettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypographySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
