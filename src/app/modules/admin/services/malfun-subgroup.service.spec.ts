import { TestBed } from '@angular/core/testing';

import { MalfunSubgroupService } from './malfun-subgroup.service';

describe('MalfunSubgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MalfunSubgroupService = TestBed.get(MalfunSubgroupService);
    expect(service).toBeTruthy();
  });
});
