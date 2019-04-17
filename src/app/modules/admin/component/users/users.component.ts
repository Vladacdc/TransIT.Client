import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  roleList: Role[];
  dataTable: any;
  user: User;

  private readonly tableParams = {
    columnDefs: [
      {
        targets: [6, 7],
        orderable: false
      }
    ]
  };
  constructor(private service: UserService,
              private serviceRole: RoleService,
              private chRef: ChangeDetectorRef) {}
  ngOnInit() {
    this.serviceRole.getEntities().subscribe(role => (this.roleList = role));
    this.service.getEntities().subscribe(users => {
      this.users = users;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable(this.tableParams);
    });
  }

  adduser(userItem: User) {
    this.user = userItem;
  }
}
