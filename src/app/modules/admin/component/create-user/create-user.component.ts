import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../models/user/user';
import { Role } from '../../models/role/role';
import { RoleService } from '../../services/role.service';

export interface DialogData {
  user: User;
  title: string;
  buttonName: string;
  createBool: boolean;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
  formData: User;
  roleList: Role[];
  createBool: boolean;
  constructor(private service: RoleService,
              public dialogRef: MatDialogRef<CreateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data.user == null) {
      this.data.user = {
        email: '', firstName: '', lastName: '', login: '', phoneNumber: 0, role: '',  id: 0 };
      this.createBool = false;
    } else {
      this.createBool = true;
    }
  }

  ngOnInit() {
    this.service.getEntities().subscribe(data => (this.roleList = data));
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

  CreateEdit() {
    if (this.createBool) {
      // create user
    } else {
      // create user
    }
  }
}
