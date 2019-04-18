import { TestBed } from '@angular/core/testing';

import { VehicleTypeService } from './vehicle-type.service';

describe('VehicleTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleTypeService = TestBed.get(VehicleTypeService);
    expect(service).toBeTruthy();
  });
});
