import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeComponent } from './vehicle-type.component';

describe('VehicleTypeComponent', () => {
  let component: VehicleTypeComponent;
  let fixture: ComponentFixture<VehicleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
