import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../core/services/crud.service';
import { IssueLog } from '../models/issuelog';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActionType } from '../models/actionType';

@Injectable()
export class IssuelogService extends CrudService<IssueLog> {
  protected readonly serviceUrl = `${environment.apiUrl}/issuelog`;

  getEntitiesByIssueId(id: number): Observable<IssueLog[]> {
    this.spinner.show();
    return this.http.get<Array<IssueLog>>(`${environment.apiUrl}/issue/${id}/issuelog`).pipe(
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  protected mapEntity(entity: IssueLog): IssueLog {
    return new IssueLog(entity);
  }
}
