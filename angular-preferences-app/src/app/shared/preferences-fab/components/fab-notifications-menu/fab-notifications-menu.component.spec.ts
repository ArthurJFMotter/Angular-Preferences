import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabNotificationsMenuComponent } from './fab-notifications-menu.component';

describe('FabNotificationsMenuComponent', () => {
  let component: FabNotificationsMenuComponent;
  let fixture: ComponentFixture<FabNotificationsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabNotificationsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabNotificationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
