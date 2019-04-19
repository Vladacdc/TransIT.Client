import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SpinnerService} from '../../core/services/spinner.service';
import {CrudService} from '../../core/services/crud.service';
import {IssueLog} from '../../core/models/issuelog';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class IssuelogService extends CrudService<IssueLog> {
  protected readonly serviceUrl = `${environment.apiUrl}/issuelog`;

  constructor(
    http: HttpClient,
    spinner: SpinnerService
  ) {
    super(http, spinner);
  }

  public getEntitiesByIssueId(id: number): Observable<IssueLog[]> {
    this.spinner.show();
    return this.http.get<Array<IssueLog>>(`${this.serviceUrl}/filter/issueId=${id}`).pipe(
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }
}
