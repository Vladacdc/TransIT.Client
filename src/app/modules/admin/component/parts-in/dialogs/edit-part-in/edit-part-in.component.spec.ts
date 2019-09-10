import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartInComponent } from './edit-part-in.component';

describe('EditPartInComponent', () => {
  let component: EditPartInComponent;
  let fixture: ComponentFixture<EditPartInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
