import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService extends CrudService<Employee> {
  protected readonly serviceUrl = `${environment.apiUrl}/employee`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/employee`;

  attachUser(employeeid: string | number, userid: string | number): Observable<Employee> {
    return this.http.post<Employee>(`${this.serviceUrl}/attach/${employeeid}/${userid}`, {});
  }

  removeUser(employeeid: string | number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.serviceUrl}/attach/${employeeid}`, {});
  }

  protected mapEntity(employee: Employee): Employee {
    return new Employee(employee);
  }
}
