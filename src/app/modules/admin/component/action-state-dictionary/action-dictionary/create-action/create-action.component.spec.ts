import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionComponent } from './create-action.component';

describe('CreateActionComponent', () => {
  let component: CreateActionComponent;
  let fixture: ComponentFixture<CreateActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
