import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<Employee> {
  protected readonly serviceUrl = `${environment.apiUrl}/employee`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/employee`;

  protected mapEntity(entity: Employee): Employee {
    return new Employee(entity);
  }
}
