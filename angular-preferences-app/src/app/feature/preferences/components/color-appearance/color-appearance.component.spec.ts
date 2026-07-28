import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAppearanceComponent } from './color-appearance.component';

describe('ColorAppearanceComponent', () => {
  let component: ColorAppearanceComponent;
  let fixture: ComponentFixture<ColorAppearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorAppearanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
