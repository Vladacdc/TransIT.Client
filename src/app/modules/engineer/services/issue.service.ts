import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { Issue } from '../models/issue';
import { environment } from '../../../../environments/environment';

@Injectable()
export class IssueService extends CrudService<Issue> {
  protected readonly serviceUrl = `${environment.apiUrl}/issue`;

  selectedIssue: Issue = null;

  protected mapEntity(entity: Issue): Issue {
    return new Issue(entity);
  }
}
