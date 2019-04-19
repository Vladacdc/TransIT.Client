import { TestBed } from '@angular/core/testing';

import { ActionTypeService } from './actiontype.sevice';

describe('ActiomTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionTypeService = TestBed.get(ActionTypeService);
    expect(service).toBeTruthy();
  });
});
