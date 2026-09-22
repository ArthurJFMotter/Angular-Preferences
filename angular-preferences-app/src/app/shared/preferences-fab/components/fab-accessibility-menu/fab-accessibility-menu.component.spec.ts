import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabAccessibilityMenuComponent } from './fab-accessibility-menu.component';

describe('FabAccessibilityMenuComponent', () => {
  let component: FabAccessibilityMenuComponent;
  let fixture: ComponentFixture<FabAccessibilityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabAccessibilityMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabAccessibilityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
