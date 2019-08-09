import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { EmployeeService } from '../../../shared/services/employee.service';
import { Employee } from 'src/app/modules/shared/models/employee';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';

@Component({
  selector: 'app-employee',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements AfterViewInit, OnDestroy {
  readonly options = new DatatableSettings({
    ajax: (dataTablesParameters: any, callback) => {
      this.employeeService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.employees = response.data;
        callback({ ...response, data: [] });
        this.adjustColumns();
      });
    },
    columns: [
      { data: 'boardNumber' },
      { data: 'lastName' },
      { data: 'firstName' },
      { data: 'middleName' },
      { data: 'shortName' },
      { data: 'post.name' },
      { data: null, orderable: false }
    ],
    language: { url: 'assets/language.json' },
    scrollX: true,
    serverSide: true,
    processing: true
  });
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

  private adjustColumns() {
    setTimeout(() => $(window).trigger('resize'), 0);
  }
}
