import { TestBed } from '@angular/core/testing';

import { MalfuncService } from './malfunc.service';

describe('MalfuncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MalfuncService = TestBed.get(MalfuncService);
    expect(service).toBeTruthy();
  });
});
