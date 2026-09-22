import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabColorMenuComponent } from './fab-color-menu.component';

describe('FabColorMenuComponent', () => {
  let component: FabColorMenuComponent;
  let fixture: ComponentFixture<FabColorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabColorMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabColorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
