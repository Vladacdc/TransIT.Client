import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsActiveModalComponent } from './is-active-modal.component';

describe('IsActiveModalComponent', () => {
  let component: IsActiveModalComponent;
  let fixture: ComponentFixture<IsActiveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsActiveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsActiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
