import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role/role';

const DEFAULT_USER: User = Object.freeze(
  {
    id: 0,
    lastName: '',
    firstName: '',
    phoneNumber: 380,
    login: '',
    email: '',
    role: ''
  }
)

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  roleList: Role[];
  user: User = Object.assign({}, DEFAULT_USER);
  dataTable: any;

  private readonly tableParams = {
    columnDefs: [
      {
        targets: [5, 6],
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
  createItem() {
    this.service.addEntity(this.user).subscribe(user =>  Object.assign({}, DEFAULT_USER)
    );
  }
  editItem() {
    this.service.updateEntity(this.user).subscribe(user => user = this.user);
  }

  deleteItem(id: number) {
    this.service.deleteEntity(id);
  }
}
