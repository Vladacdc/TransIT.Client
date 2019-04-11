import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from '../../models/user/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  dataTable: any;

  constructor(
    private service: UserService,
    private chRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.service.getEntities().subscribe(users => {
      this.users = users;

      this.spinner.hide();
      this.chRef.detectChanges();

      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }

  openCreateUserDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = '75%';
    this.dialog.open(CreateUserComponent, dialogConfig);
  }
}
