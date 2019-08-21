import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleTypeComponent } from './edit-vehicle-type.component';

describe('EditVehicleTypeComponent', () => {
  let component: EditVehicleTypeComponent;
  let fixture: ComponentFixture<EditVehicleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehicleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
