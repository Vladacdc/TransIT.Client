import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../services/role.service';
import {UserService} from '../../services/user.service';
import {Role} from '../../models/role/role';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() user: User;
  @Input() users: User[];

  userForm: FormGroup;
  roleList: Role[] = [];

  constructor(private formBuilder: FormBuilder,
              private serviceRole: RoleService,
              private serviceUser: UserService) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group(
      {
        lastName: '',
        firstName: '',
        phoneNumber: 0,
        login: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.email],
        role: ['', Validators.required]
      }
    );
    this.serviceRole.getEntities().subscribe(data => (this.roleList = data));
  }
getData() {
  this.userForm = this.formBuilder.group(
    {
      lastName: this.user.lastName,
      firstName: this.user.firstName,
      phoneNumber: this.user.phoneNumber,
      login: this.user.phoneNumber,
      password: this.user.password,
      email: this.user.email,
      role: this.user.role
    }
  );
}
  UpdateData() {
    if (this.userForm.invalid) {
      return;
    }
    const form = this.userForm.value;
    const user: User = {
      id: this.user.id as number,
      firstName:  form.firstName as string,
      lastName:  form.lastName as string,
      phoneNumber:  form.phoneNumber as number,
      login: form.login as string,
      email:  form.email as string,
      password:  form.password as string,
      role: this.roleList[this.roleName.findIndex(r => r === form.role)]
    };
    this.serviceUser.updateEntity(user).subscribe(data => {
    this.users.push(user);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === this.user.id) {
        this.users.splice(i, 1);
      }
    }});
    this.closeDiv.nativeElement.click();
  }
  get roleName(): string[] {return this.roleList.map(r => r.name); }
}
