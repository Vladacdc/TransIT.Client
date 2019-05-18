import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from 'src/app/modules/admin/models/employee/employee';

declare const $;

@Component({
  selector: 'app-issue-log-assignees',
  templateUrl: './issue-log-assignees.component.html',
  styleUrls: ['./issue-log-assignees.component.scss']
})
export class IssueLogAssigneesComponent implements OnInit {;
  currentUser: Employee;
  users: Array<Employee>;
  @Output() selectUser: EventEmitter<Employee>;

  constructor(private userService: EmployeeService) {
    this.selectUser = new EventEmitter<Employee>();
  }

  ngOnInit() {
    this.userService.getEntities().subscribe(users => this.users = users);
  }

  selectItem(item: Employee): void {
    this.currentUser = item;
    this.selectUser.emit(item);
    console.dir(this.users);
  }
}
