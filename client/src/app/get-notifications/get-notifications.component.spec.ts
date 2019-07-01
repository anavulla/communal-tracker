import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNotificationsComponent } from './get-notifications.component';

describe('GetNotificationsComponent', () => {
  let component: GetNotificationsComponent;
  let fixture: ComponentFixture<GetNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
