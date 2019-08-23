import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleTypeComponent } from './delete-vehicle-type.component';

describe('DeleteVehicleTypeComponent', () => {
  let component: DeleteVehicleTypeComponent;
  let fixture: ComponentFixture<DeleteVehicleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVehicleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
