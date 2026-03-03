import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroIntroComponent } from './hero-intro.component';

describe('HeroIntroComponent', () => {
  let component: HeroIntroComponent;
  let fixture: ComponentFixture<HeroIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
