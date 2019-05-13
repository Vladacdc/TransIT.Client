import { TestBed } from '@angular/core/testing';

import { ActionTypeService } from './action-type.service';

describe('ActionTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionTypeService = TestBed.get(ActionTypeService);
    expect(service).toBeTruthy();
  });
});
