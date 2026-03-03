import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsOverviewComponent } from './steps-overview.component';

describe('StepsOverviewComponent', () => {
  let component: StepsOverviewComponent;
  let fixture: ComponentFixture<StepsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
