import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

declare const $;

@Component({
  selector: 'app-issue-log-assignees',
  templateUrl: './issue-log-assignees.component.html',
  styleUrls: ['./issue-log-assignees.component.scss']
})
export class IssueLogAssigneesComponent implements OnInit {
  public searchString: string;
  public currentUser: User;
  public users: Array<User>;
  private allUsers: Array<User>;
  @Output() public selectUser: EventEmitter<User>;
  private table: any;

  constructor(private userService: UserService) {
    this.selectUser = new EventEmitter<User>();
  }

  ngOnInit() {
    this.table = $('#assignee-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Прізвище', data: 'lastName', defaultContent: '' },
        { title: "Ім'я", data: 'firstName', defaultContent: '' },
        { title: 'По-батькові', data: 'middleName', defaultContent: '' },
        { title: 'Логін', data: 'login', defaultContent: '' },
        { title: 'Електронна пошта', data: 'email', defaultContent: '' },
        { title: 'Номер', data: 'phoneNumber', defaultContent: '' },
        { title: 'Роль', data: 'role.transName', defaultContent: '' }
      ],
      paging: true,
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    });
    this.table.on('select', (e, dt, type, indexes) => {
      const item = this.table.rows(indexes).data()[0];
      this.selectUser.emit(item);
      $('#close-btn').trigger('click');
    });
    this.userService.getEntities().subscribe(users => {
      this.users = users;
      this.allUsers = this.users.slice();
      this.table.rows.add(this.users);
      this.table.draw();
    });
  }

  public onSearchChange(): void {
    const search = this.searchString.toLowerCase();
    this.users = this.allUsers.filter(
      x =>
        x.lastName.toLowerCase().includes(search) ||
        x.firstName.toLowerCase().includes(search) ||
        x.login.toLowerCase().includes(search)
    );
    if (this.users.length) {
      $('.dropdown-menu').addClass('show');
    } else {
      $('.dropdown-menu').removeClass('show');
    }
  }

  public selectItem(item: User): void {
    this.currentUser = item;
    this.selectUser.emit(item);
    this.searchString = item.login + ' ' + item.firstName + ' ' + item.lastName + ' ';
    $('.dropdown-menu').removeClass('show');
  }
}
