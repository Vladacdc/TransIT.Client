import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/modules/shared/models/employee';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';

declare const $;

@Component({
  selector: 'app-issue-log-assignees',
  templateUrl: './issue-log-assignees.component.html',
  styleUrls: ['./issue-log-assignees.component.scss']
})
export class IssueLogAssigneesComponent implements OnInit {
  currentUser: Employee;
  users: Array<Employee>;
  @Output() selectUser: EventEmitter<Employee>;

  constructor(private employeeService: EmployeeService) {
    this.selectUser = new EventEmitter<Employee>();
  }

  ngOnInit() {
    this.employeeService.getEntities().subscribe(employees => (this.users = employees));
  }

  selectItem(item: Employee): void {
    this.currentUser = item;
    this.selectUser.emit(item);
  }
}
