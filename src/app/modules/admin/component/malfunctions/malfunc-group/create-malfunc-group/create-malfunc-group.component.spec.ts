import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMalfuncGroupComponent } from './create-malfunc-group.component';

describe('CreateMalfuncGroupComponent', () => {
  let component: CreateMalfuncGroupComponent;
  let fixture: ComponentFixture<CreateMalfuncGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMalfuncGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMalfuncGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
