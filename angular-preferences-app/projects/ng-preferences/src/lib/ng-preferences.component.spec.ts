import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPreferencesComponent } from './ng-preferences.component';

describe('NgPreferencesComponent', () => {
  let component: NgPreferencesComponent;
  let fixture: ComponentFixture<NgPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
