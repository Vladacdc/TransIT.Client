import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: User;
  dataTable: any;

  private readonly tableParams: DataTables.Settings = {
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    columns: [
      {
        title: 'ПІП'
      },
      {
        title: 'Логін'
      },
      {
        title: 'Пошта'
      },
      {
        title: 'Номер',
        orderable: false
      },
      {
        title: 'Роль'
      },
      {
        title: 'Статус'
      },
      {
        title: 'Дії',
        orderable: false
      }
    ]
  };

  constructor(private service: UserService, private serviceRole: RoleService) {}

  ngOnInit() {
    $('#userTable').DataTable(this.tableParams);
    this.service.getEntities().subscribe(users => {
      this.addTableData(users);
    });
  }

  addTableData(newUsers: User[]) {
    this.users = [...newUsers];
    const view = newUsers.map(i => [
      i.lastName + '\n' + i.firstName + '\n' + i.middleName,
      i.login,
      i.email,
      i.phoneNumber,
      i.role.transName,
      i.isActive ? 'активний' : 'неактивний',
      `<button id="find-user-${
        i.id
      }" class="btn" data-toggle="modal" data-target="#editUser"><i class="fas fa-edit"></i></button>
      <button id="find-user-${
        i.id
      }" class="btn" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt" style="color: darkred"></i>
      </button>`
    ]);

    this.dataTable = $('#userTable')
      .dataTable()
      .api()
      .clear()
      .rows.add(view)
      .draw();

    $('#userTable tbody').on('click', 'button', event => {
      const idTokens = event.currentTarget.id.split('-');
      const id = parseInt(idTokens[idTokens.length - 1], 10);
      this.user = this.users.find(i => i.id === id);
    });
  }

  addUser(user: User) {
    this.users.push(user);
    this.addTableData(this.users);
  }

  updateUser(user: User) {
    this.users[this.users.findIndex(i => i.id === user.id)] = user;
    this.service.getEntities().subscribe(users => {
      this.addTableData(users);
    });
  }

  deleteUser(user: User) {
    this.users.splice(this.users.findIndex(i => i.id === user.id), 1);
    this.addTableData(this.users);
  }
}
