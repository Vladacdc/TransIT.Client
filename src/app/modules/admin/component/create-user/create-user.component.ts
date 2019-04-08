import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private  service: UsersService,
              public dialogRef: MatDialogRef<CreateUserComponent>) {}

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
  // close  DialogComponent CreateUser
  onNoClick(): void {
    this.dialogRef.close();
  }

}
