import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Employee } from '../../models/employee/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements AfterViewInit, OnDestroy {
  options: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      this.employeeService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.employees = response.data;
        callback({ ...response, data: [] });
      });
    },
    columns: [
      { data: 'lastName' },
      { data: 'firstName' },
      { data: 'middleName' },
      { data: 'shortName' },
      { data: 'post.name' },
      { data: null, orderable: false }
    ],
    language: { url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json' },
    scrollX: true
  };

  employees: Employee[] = [];
  selectedEmployee: Employee;
  renderTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  constructor(private employeeService: EmployeeService) {}

  ngAfterViewInit(): void {
    this.renderTrigger.next();
  }

  ngOnDestroy(): void {
    this.renderTrigger.unsubscribe();
  }

  reloadTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.renderTrigger.next();
    });
  }

  selectPost(employee: Employee) {
    this.selectedEmployee = { ...employee };
  }
}
