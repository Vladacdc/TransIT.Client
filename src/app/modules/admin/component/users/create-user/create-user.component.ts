import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { matchPassword, LOGIN_ERRORS, NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { User } from 'src/app/modules/shared/models/user';
import { Role } from 'src/app/modules/shared/models/role';
import { RoleService } from 'src/app/modules/shared/services/role.service';

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
  CustomLoginErrorMessages = LOGIN_ERRORS;
  CustomNameErrorMessages = NAME_FIELD_ERRORS;

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
        lastName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern("^[A-Za-zА-Яа-яїієЇІЯЄ/'/`-]+$")])
        ),
        firstName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern("^[A-Za-zА-Яа-яїієЇІЯЄ/'/`-]+$")])
        ),
        middleName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern("^[A-Za-zА-Яа-яїієЇІЯЄ/'/`-]+$")])
        ),
        phoneNumber: new FormControl('', Validators.minLength(14)),
        userName: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9]+$')])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])
        ),
        email: new FormControl('', Validators.compose([Validators.email, Validators.maxLength(30)])),
        role: new FormControl('', Validators.required)
      },
      { validators: matchPassword }
    );
    this.serviceRole
      .getEntities()
      .subscribe(data => (this.roleList = data.sort((a, b) => a.transName.localeCompare(b.transName))));
  }

  clickSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const form = this.userForm.value;
    const user: User = new User({
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      middleName: form.middleName || '',
      phoneNumber: form.phoneNumber,
      userName: form.userName,
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
