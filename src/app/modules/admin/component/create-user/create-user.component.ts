import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialogRef} from '@angular/material';
import {User} from '../../models/user/user';
import {Role} from '../../models/role/role';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
 formData: User;
 roleList: Role[];
  constructor(private  service: UsersService,
              public dialogRef: MatDialogRef<CreateUserComponent> ) {}

  ngOnInit() {
    this.service.getRoleList().then(res => this.roleList = res as Role[])
    this.formData = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: 0,
      login: '',
      role: ''
    };
  }

  // close  DialogComponent CreateUser
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(formData: User) {

  }
}
