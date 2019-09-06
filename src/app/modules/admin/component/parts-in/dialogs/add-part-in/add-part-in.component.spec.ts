import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartInComponent } from './add-part-in.component';

describe('AddPartInComponent', () => {
  let component: AddPartInComponent;
  let fixture: ComponentFixture<AddPartInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
