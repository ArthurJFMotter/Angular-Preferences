import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabLayoutMenuComponent } from './fab-layout-menu.component';

describe('FabLayoutMenuComponent', () => {
  let component: FabLayoutMenuComponent;
  let fixture: ComponentFixture<FabLayoutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabLayoutMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabLayoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
