import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSpecsComponent } from './tech-specs.component';

describe('TechSpecsComponent', () => {
  let component: TechSpecsComponent;
  let fixture: ComponentFixture<TechSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechSpecsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
