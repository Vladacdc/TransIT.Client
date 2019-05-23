import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Role } from '../models/role';

@Injectable()
export class RoleService extends CrudService<Role> {
  protected readonly serviceUrl = `${environment.apiUrl}/role`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/role`;

  protected mapEntity(entity: Role): Role {
    return new Role(entity);
  }
}
