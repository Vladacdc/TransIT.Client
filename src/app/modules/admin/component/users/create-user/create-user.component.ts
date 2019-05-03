import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../models/role/role';
import { User } from '../../../models/user/user';
import { matchPassword } from 'src/app/custom-errors';

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
        lastName: new FormControl(''),
        firstName: new FormControl(''),
        middleName: new FormControl(''),
        phoneNumber: new FormControl('', Validators.minLength(12)),
        login: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        email: new FormControl('', Validators.email),
        role: new FormControl('', Validators.required)
      },
      { validators: matchPassword }
    );
    this.serviceRole.getEntities().subscribe(data => (this.roleList = data));
  }

  clickSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const form = this.userForm.value;
    const user: User = new User({
      firstName: form.firstName,
      lastName: form.lastName,
      middleName: form.middleName,
      phoneNumber: form.phoneNumber,
      login: form.login,
      email: form.email,
      password: form.password,
      role: this.roleList[this.roleName.findIndex(r => r === form.role)],
      isActive: true
    });

    this.serviceUser.addEntity(user).subscribe(
      newUser => {
        this.createUser.next(newUser);
        this.toast.success('', 'Користувача створено');
      },
      error => this.toast.error('Помилка', 'Користувач з таким логіном існує')
    );
    this.closeCreateModal.nativeElement.click();
  }

  get roleName(): string[] {
    return this.roleList.map(r => r.transName);
  }
}
