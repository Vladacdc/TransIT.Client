import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { Issue } from '../models/issue';
import { environment } from '../../../../environments/environment';
import { saveToStorage, getFromStorage } from './serviceTools';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class IssueService extends CrudService<Issue> {
  protected readonly serviceUrl = `${environment.apiUrl}/issue`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/issue`;

  get selectedItem(): Issue {
    return this.mapEntity(getFromStorage('selectedIssue'));
  }
  set selectedItem(value: Issue) {
    saveToStorage('selectedIssue', value);
  }

  getFilteredEntities(params: any): Observable<Issue> {
    return this.http.post<any>(this.datatableUrl, params, {}).pipe(
      map(response => ({ ...response, data: response.data.map(d => this.mapEntity(d)) })),
      catchError(this.handleError())
    );
  }

  protected mapEntity(entity: Issue): Issue {
    return new Issue(entity);
  }
}
