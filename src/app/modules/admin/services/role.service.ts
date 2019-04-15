import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { Role } from '../models/role/role';
import { environment } from 'src/environments/environment';

@Injectable()
export class RoleService extends CrudService<Role> {
  protected readonly serviceUrl = `${environment.apiUrl}/role`;
}
