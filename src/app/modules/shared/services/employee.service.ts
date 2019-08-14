import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class EmployeeService extends CrudService<Employee> {
  protected readonly serviceUrl = `${environment.apiUrl}/employee`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/employee`;

  getByBoardNumber(boardNumber: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.serviceUrl}/boardnumber/${boardNumber}`);
  }

  getBoardNumbers(): Observable<number[]> {
    return this.http.get<number[]>(`${this.serviceUrl}/boardnumbers`);
  }

  getAvailableUsersToAttach(): Observable<User[]> {
    return this.http.get<User[]>(`${this.serviceUrl}/attach/users`);
  }

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
