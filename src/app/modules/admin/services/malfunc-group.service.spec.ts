import { TestBed } from '@angular/core/testing';

import { MalfuncGroupService } from './malfunc-group.service';

describe('MalfuncGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MalfuncGroupService = TestBed.get(MalfuncGroupService);
    expect(service).toBeTruthy();
  });
});
