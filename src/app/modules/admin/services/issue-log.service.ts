import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { IssueLog } from '../models/issueLog/IssueLog';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueLogService extends CrudService<IssueLog> {
  protected readonly serviceUrl = `${environment.apiUrl}/issuelog`;

   public getEntitiesByDocumentId(id: number): Observable<IssueLog[]> {
     this.spinner.show();
     return this.http.get<Array<IssueLog>>(`${environment.apiUrl}/document/${id}/issuelog`).pipe(
       tap(data => this.handleSuccess('fetched data', data)),
       catchError(this.handleError())
     );
   }
}
