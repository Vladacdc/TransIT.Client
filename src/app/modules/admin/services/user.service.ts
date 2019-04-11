import { Injectable } from '@angular/core';
import { User } from '../models/user/user';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';

@Injectable()
export class UserService extends CrudService<User> {
  protected readonly serviceUrl = `${environment.apiUrl}/user`;
}
