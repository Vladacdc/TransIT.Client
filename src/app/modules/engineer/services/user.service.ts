import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {
  protected readonly serviceUrl = `${environment.apiUrl}/user`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/user`;

  protected mapEntity(entity: User): User {
    return new User(entity);
  }
}
