import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreateUserComponent} from '../create-user/create-user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private  service: UsersService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  AddUser() {
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    this.dialog.open(CreateUserComponent, dialogConfig);
  }
  openDialog(): void {
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(CreateUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
