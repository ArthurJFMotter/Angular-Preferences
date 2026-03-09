import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCardWrapperComponent } from './settings-card-wrapper.component';

describe('SettingsCardWrapperComponent', () => {
  let component: SettingsCardWrapperComponent;
  let fixture: ComponentFixture<SettingsCardWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsCardWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCardWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
