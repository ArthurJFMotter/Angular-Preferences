import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabTypographyMenuComponent } from './fab-typography-menu.component';

describe('FabTypographyMenuComponent', () => {
  let component: FabTypographyMenuComponent;
  let fixture: ComponentFixture<FabTypographyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabTypographyMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabTypographyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
