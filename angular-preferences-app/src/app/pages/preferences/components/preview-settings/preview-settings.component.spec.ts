import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSettingsComponent } from './preview-settings.component';

describe('PreviewSettingsComponent', () => {
  let component: PreviewSettingsComponent;
  let fixture: ComponentFixture<PreviewSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
