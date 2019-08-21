import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMalfuncGroupComponent } from './edit-malfunc-group.component';

describe('EditMalfuncGroupComponent', () => {
  let component: EditMalfuncGroupComponent;
  let fixture: ComponentFixture<EditMalfuncGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMalfuncGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMalfuncGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
