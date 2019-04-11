import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from '../../models/user/user';
import { DialogComponent } from '../dialog/dialog.component';
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
  public title: string;
  public button: string;
  public createBool: boolean;
  constructor(
    private service: UserService,
    private chRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.service.getEntities().subscribe(users => {
      this.users = users;

      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }

  openCreateUserDialog(row): void {
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
    const  dialogRef = this.dialog.open(CreateUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  openDialog(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    if (result)
   {
     
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
