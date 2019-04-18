import { Component, OnInit, ChangeDetectorRef, Output, ViewChild, ElementRef } from '@angular/core';
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
  @Output() user: User;
  @ViewChild('dataGet') dataGet: ElementRef;
  private readonly table: DataTables.Settings = {
    language: {
      url: 'cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

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
   // $('#userTable').DataTable(this.table);
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
//    this.dataGet.nativeElement.click();
  }
}
