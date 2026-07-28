import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionFiltersComponent } from './vision-filters.component';

describe('VisionFiltersComponent', () => {
  let component: VisionFiltersComponent;
  let fixture: ComponentFixture<VisionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
