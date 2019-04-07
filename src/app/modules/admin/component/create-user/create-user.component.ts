import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private  service: UsersService) {
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
  }
}
