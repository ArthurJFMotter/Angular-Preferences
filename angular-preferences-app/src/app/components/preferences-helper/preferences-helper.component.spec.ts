import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesHelperComponent } from './preferences-helper.component';

describe('PreferencesHelperComponent', () => {
  let component: PreferencesHelperComponent;
  let fixture: ComponentFixture<PreferencesHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferencesHelperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
