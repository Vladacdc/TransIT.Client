import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService extends CrudService<Employee> {
  protected readonly serviceUrl = `${environment.apiUrl}/employee`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/employee`;

  protected mapEntity(employee: Employee): Employee {
    return new Employee(employee);
  }
}
