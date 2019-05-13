import { TestBed } from '@angular/core/testing';

import { IssueLogService } from './issue-log.service';

describe('IssueLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueLogService = TestBed.get(IssueLogService);
    expect(service).toBeTruthy();
  });
});
