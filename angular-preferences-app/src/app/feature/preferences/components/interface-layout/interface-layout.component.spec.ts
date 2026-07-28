import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceLayoutComponent } from './interface-layout.component';

describe('InterfaceLayoutComponent', () => {
  let component: InterfaceLayoutComponent;
  let fixture: ComponentFixture<InterfaceLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfaceLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
