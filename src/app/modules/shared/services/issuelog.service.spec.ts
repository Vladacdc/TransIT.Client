import { TestBed } from '@angular/core/testing';

import { IssuelogService } from './issuelog.service';

describe('IssuelogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssuelogService = TestBed.get(IssuelogService);
    expect(service).toBeTruthy();
  });
});
