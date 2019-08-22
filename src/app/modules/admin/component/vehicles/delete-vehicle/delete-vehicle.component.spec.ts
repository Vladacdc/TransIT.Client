import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleComponent } from './delete-vehicle.component';

describe('DeleteVehicleComponent', () => {
  let component: DeleteVehicleComponent;
  let fixture: ComponentFixture<DeleteVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
