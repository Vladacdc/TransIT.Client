import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../../shared/services/employee.service';
import { Employee } from 'src/app/modules/shared/models/employee';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  columnDefinitions: string[] = [
    'firstName',
    'middleName',
    'lastName',
    'shortName',
    'boardNumber',
    'postName',
    'attachedUserName',
  ];
  columnNames: string[] = [
    'Admin.Employee.FirstName',
    'Admin.Employee.MiddleName',
    'Admin.Employee.LastName',
    'Admin.Employee.ShortName',
    'Admin.Employee.BoardNumber',
    'Admin.Employee.Post',
    'Admin.Employee.AttachedUser'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Employee>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource(this.employeeService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
