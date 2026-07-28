import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechMarqueeComponent } from './tech-marquee.component';

describe('TechMarqueeComponent', () => {
  let component: TechMarqueeComponent;
  let fixture: ComponentFixture<TechMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechMarqueeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
