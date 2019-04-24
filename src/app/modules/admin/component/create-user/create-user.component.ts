import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user/user';
import { Role } from '../../models/role/role';

import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createUser = new EventEmitter<User>();
  userForm: FormGroup;
  roleList: Role[] = [];

  constructor(
    private serviceRole: RoleService,
    private serviceUser: UserService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    $('#createUser').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });

    this.userForm = this.formBuilder.group(
      {
        lastName: '',
        firstName: '',
        middleName: '',
        phoneNumber: '',
        login: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.email],
        role: ['', Validators.required]
      },
      { validator: this.checkPasswords }
    );
    this.serviceRole.getEntities().subscribe(data => (this.roleList = data));
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  clickSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const form = this.userForm.value;
    const user: User = {
      id: 0,
      firstName: form.firstName as string,
      lastName: form.lastName as string,
      middleName: form.middleName as string,
      phoneNumber: form.phoneNumber as number,
      login: form.login as string,
      email: form.email as string,
      password: form.password as string,
      role: this.roleList[this.roleName.findIndex(r => r === form.role)]
    };

    this.serviceUser
      .addEntity(user)
      .subscribe(
        newUser => this.createUser.next(newUser),
        error => this.toast.error('Помилка', 'Користувач з таким логіном існує')
      );
    this.closeCreateModal.nativeElement.click();
  }

  get roleName(): string[] {
    return this.roleList.map(r => r.transName);
  }
}
