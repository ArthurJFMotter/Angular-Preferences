import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesFabComponent } from './preferences-fab.component';

describe('PreferencesFabComponent', () => {
  let component: PreferencesFabComponent;
  let fixture: ComponentFixture<PreferencesFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferencesFabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
