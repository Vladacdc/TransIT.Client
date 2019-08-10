import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Malfunction } from '../models/malfunction';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionService extends CrudService<Malfunction> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunction`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/malfunction`;

  getBySubgroupName(subgroupName: any): Observable<Malfunction[]> {
    this.spinner.show();
    return this.http.get<Malfunction[]>(`${this.serviceUrl}/getbysubgroupname/?subgroupname=${subgroupName}`).pipe(
      map(entities => entities),
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  protected mapEntity(entity: Malfunction): Malfunction {
    return new Malfunction(entity);
  }
}
