import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: User;
  dataTable: any;

  private readonly tableParams: any = {
    drawCallback: function(settings) {
      let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
      let pagelength = $(this).closest('.dataTables_wrapper').find('.dataTables_length');
      pagination.toggle(this.api().page.info().pages > 1);
      pagelength.toggle(this.api().data().length > 10);
    },
    scrollX: true,
    language: {
      url: 'assets/language.json'
    },
    columns: [
      {
        title: 'Прізвище'
      },
      {
        title: 'Ім\'я'
      },
      {
        title: 'По батькові'
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

  constructor(private service: UserService, private authService: AuthenticationService) {}

  ngOnInit() {
    $(document).on('preInit.dt', function() {
      $('.dataTables_filter input[type=\'search\']').attr('maxlength', 255);
    });
    $('#userTable').DataTable(this.tableParams);
    this.service.getEntities().subscribe(users => {
      this.addTableData(users);
    });
  }

  get userLogin(): string {
    return this.authService.getLogin();
  }

  addTableData(newUsers: User[]) {
    this.users = [...newUsers];
    const view = newUsers.map(i => [
      i.lastName, i.firstName, i.middleName,
      i.userName,
      i.email,
      i.phoneNumber,
      i.role.transName,
      i.isActive ? 'активний' : 'неактивний',
      i.userName !== this.userLogin
        ? `<button id="find-user-${
            i.id
          }" class="btn" data-toggle="modal" data-target="#editUser"><i class="fas fa-edit"></i></button>
      <button id="edit-user-${
        i.id
      }" class="btn" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt"></i>
      </button>`
        : `<button id="find2-user-${
            i.id
          }" class="btn" data-toggle="modal" data-target="#editUser"><i class="fas fa-edit"></i></button>`
    ]);

    this.dataTable = $('#userTable')
      .dataTable()
      .api()
      .clear()
      .rows.add(view)
      .draw();

    $('#userTable tbody').on('click', 'button', event => {
      const idTokens = event.currentTarget.id.split('-');
      this.user = this.users.find(i => i.id === idTokens.slice(2).join('-'));
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
