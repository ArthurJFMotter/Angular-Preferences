import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractivePlaygroundComponent } from './interactive-playground.component';

describe('InteractivePlaygroundComponent', () => {
  let component: InteractivePlaygroundComponent;
  let fixture: ComponentFixture<InteractivePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractivePlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractivePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
