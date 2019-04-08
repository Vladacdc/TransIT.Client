import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersComponent} from '../users/users.component';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private  service: UsersService,
              public dialogRef: MatDialogRef<CreateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {

    this.service.formData = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: 0,
      login: '',
      role: ''
    };
    this.service.userItems = [];
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
