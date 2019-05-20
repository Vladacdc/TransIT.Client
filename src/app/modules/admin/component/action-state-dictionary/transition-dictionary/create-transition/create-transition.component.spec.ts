import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransitionComponent } from './create-transition.component';

describe('CreateTransitionComponent', () => {
  let component: CreateTransitionComponent;
  let fixture: ComponentFixture<CreateTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
