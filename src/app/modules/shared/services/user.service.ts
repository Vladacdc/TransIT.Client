import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {
  protected readonly serviceUrl = `${environment.apiUrl}/user`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/user`;

  protected mapEntity(entity: User): User {
    return new User(entity);
  }

  updateUserPassword(id: number, password: string) {
    this.spinner.show();
    return this.http.put<User>(`${this.serviceUrl}/${id}/password`, { password }).pipe(
      tap(data => this.handleSuccess('Changed password', data)),
      catchError(this.handleError())
    );
  }
}
