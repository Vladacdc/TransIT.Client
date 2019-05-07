import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreUserPasswordComponent } from './restore-user-password.component';

describe('RestoreUserPasswordComponent', () => {
  let component: RestoreUserPasswordComponent;
  let fixture: ComponentFixture<RestoreUserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreUserPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
