import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeEnvironmentComponent } from './subscribe-environment.component';

describe('SubscribeEnvironmentComponent', () => {
  let component: SubscribeEnvironmentComponent;
  let fixture: ComponentFixture<SubscribeEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
