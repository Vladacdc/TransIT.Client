import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { MalfunctionSubgroup } from '../models/malfunction-subgroup';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionSubgroupService extends CrudService<MalfunctionSubgroup> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunctionSubgroup`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/malfunctionSubgroup`;

  getByGroupName(groupName: any): Observable<MalfunctionSubgroup[]> {
    this.spinner.show();
    return this.http.get<MalfunctionSubgroup[]>(`${this.serviceUrl}/getbygroupname/?groupname=${groupName}`).pipe(
      map(entities => entities),
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  protected mapEntity(entity: MalfunctionSubgroup): MalfunctionSubgroup {
    return new MalfunctionSubgroup(entity);
  }
}
