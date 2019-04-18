import { TestBed, async, inject } from '@angular/core/testing';

import { EngineerGuard } from './engineer.guard';

describe('EngineerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngineerGuard]
    });
  });

  it('should ...', inject([EngineerGuard], (guard: EngineerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
