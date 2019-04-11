import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user/user';
import { Role } from '../../models/role/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  formData: User;
  roleList: Role[];
  constructor(private service: RoleService, public dialogRef: MatDialogRef<CreateUserComponent>) {}

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

  submit(formData: User) {}
}
