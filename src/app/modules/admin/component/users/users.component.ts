import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {CreateUserComponent} from '../create-user/create-user.component';
import {ELEMENT_DATA} from '../../models/user/user';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
  export class UsersComponent implements OnInit {
  constructor(private  service: UsersService, private dialog: MatDialog) {
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'login', 'email' , 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public  title: string;
  public  button: string;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  openCreateUserDialog(): void {
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = '75%';
    dialogConfig.data = {
      name: this.dataSource.data,
      title: this.title,
      button: this.button
    }
    this.dialog.open(CreateUserComponent, dialogConfig);
  }
  openDialog(): void {
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    this.dialog.open(DialogComponent, dialogConfig);
  }

  deleteItem(row: any) {
    this.openDialog();
  }

  editItem(row: any) {
    this.openCreateUserDialog();
  }
}
