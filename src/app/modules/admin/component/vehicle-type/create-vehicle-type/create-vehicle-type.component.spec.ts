import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleTypeComponent } from './create-vehicle-type.component';

describe('CreateVehicleTypeComponent', () => {
  let component: CreateVehicleTypeComponent;
  let fixture: ComponentFixture<CreateVehicleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVehicleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
