import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User;

  columnDefinitions: string[] = [
    'lastName',
    'firstName',
    'middleName',
    'userName',
    'email',
    'phoneNumber',
    'roleTransName',
    'status',
    'isEmployeeString'
  ];
  columnNames: string[] = [

    'Прізвище',
    'Ім\'я',
    'По батькові',
    'Логін',
    'Пошта',
    'Номер',
    'Роль',
    'Статус',
    'Працівник'
  ]

  @ViewChild('table') table: MatFspTableComponent;
  
  dataSource: EntitiesDataSource<User>;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<User>(this.userService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
