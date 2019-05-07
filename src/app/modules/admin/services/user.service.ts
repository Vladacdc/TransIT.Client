import { Injectable } from '@angular/core';
import { User } from '../models/user/user';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class UserService extends CrudService<User> {
  protected readonly serviceUrl = `${environment.apiUrl}/user`;

  public updateUserPassword(id: number, password: string) {
    this.spinner.show();
    return this.http.put<User>(`${this.serviceUrl}/${id}/password`, { password }).pipe(
      tap(data => this.handleSuccess('Changed password', data)),
      catchError(this.handleError())
    );
  }
}
