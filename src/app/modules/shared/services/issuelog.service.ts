import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../core/services/crud.service';
import { IssueLog } from '../models/issuelog';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class IssuelogService extends CrudService<IssueLog> {
  protected readonly serviceUrl = `${environment.apiUrl}/issuelog`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/issuelog`;

  getEntitiesByDocumentId(id: number): Observable<IssueLog[]> {
    this.spinner.show();
    return this.http.get<Array<IssueLog>>(`${environment.apiUrl}/document/${id}/issuelog`).pipe(
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  getFilteredEntitiesByIssueId(id: number | string, params: any): Observable<Array<IssueLog>> {
    return this.http.post<any>(`${environment.apiUrl}/datatable/issue/${id}/issuelog`, params, {}).pipe(
      map(response => ({ ...response, data: response.data.map(d => this.mapEntity(d)) })),
      catchError(this.handleError())
    );
  }

  // getFilteredEntitiesByVehicleId(id: number | string, params: any): Observable<Array<IssueLog>> {
  //   return this.http.post<any>(`${environment.apiUrl}/datatable/issue/${id}/issuelog`, params, {}).pipe(
  //     map(response => ({ ...response, data: response.data.map(d => this.mapEntity(d)) })),
  //     catchError(this.handleError())
  //   );
  // }

  protected mapEntity(entity: IssueLog): IssueLog {
    const issuelog = new IssueLog(entity);
    if (entity.actionType) {
      issuelog.actionTypeName = entity.actionType.name;
    }
    if (entity.workType) {
      issuelog.workTypeName = entity.workType.name;
    }
    if (entity.issue) {
      issuelog.issueName = entity.issue.summary;
    }
    if (entity.newState) {
      issuelog.newStateName = entity.newState.transName;
    }
    if (entity.oldState) {
      issuelog.oldStateName = entity.oldState.transName;
    }
    if (entity.supplier) {
      issuelog.supplierName = entity.supplier.name;
    }
    return issuelog;
  }
}
