import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends CrudService<Issue> {
  protected readonly serviceUrl = `${environment.apiUrl}/issue`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/issue`;

  protected mapEntity(issue: Issue): Issue {
    return new Issue(issue);
  }
}
