import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockWindowComponent } from './mock-window.component';

describe('MockWindowComponent', () => {
  let component: MockWindowComponent;
  let fixture: ComponentFixture<MockWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
