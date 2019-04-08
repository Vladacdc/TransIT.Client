import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {CreateUserComponent} from '../create-user/create-user.component';
import {ELEMENT_DATA} from '../../models/user/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
  export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'login'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private  service: UsersService, private dialog: MatDialog) {
  }
  ngOnInit() {
  }

  openDialog(): void {
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateUserComponent, dialogConfig);

  }
}
