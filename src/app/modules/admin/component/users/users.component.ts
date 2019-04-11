import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ELEMENT_DATA, User } from '../../models/user/user';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  displayedColumns: string[] = ['firstName', 'lastName', 'login', 'email', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public title: string;
  public button: string;
  public  createBool: boolean;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // CreateEdit
  openCreateUserDialog(row?): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = '75%';
    dialogConfig.data = {
      user: row,
      title: this.title,
      button: this.button
    };
    this.dialog.open(CreateUserComponent, dialogConfig);
  }
  openDialog(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // delete row, row is data not number
      }
    });
  }
 createItem() {
    this.title = 'Створити користувача';
    this.button = 'Створити';
    this.openCreateUserDialog(null);
  }
  editItem(row: any) {
    this.title = 'Редагувати користувача';
    this.button = 'Редагувати';
    this.openCreateUserDialog(row);
  }
}
