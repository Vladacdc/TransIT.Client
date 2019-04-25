import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/role/role';
import { User } from '../../models/user/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @ViewChild('close') closeEditModal: ElementRef;
  @Output() updateUser = new EventEmitter<User>();
  @Input()
  set user(user: User) {
    if (!user) {
      return;
    }
    this.userForm.patchValue({ ...user, role: user.role.transName });
  }

  userForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceRole: RoleService,
    private serviceUser: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: '',
      lastName: '',
      firstName: '',
      middleName: '',
      phoneNumber: new FormControl('', Validators.minLength(12)),
      login: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      email: new FormControl('', Validators.email),
      role: ['', Validators.required]
    });
    this.serviceRole.getEntities().subscribe(data => (this.roles = data));
  }

  updateData() {
    if (this.userForm.invalid) {
      return;
    }

    this.closeEditModal.nativeElement.click();
    const form = this.userForm.value;
    const user: User = {
      id: form.id as number,
      firstName: form.firstName as string,
      lastName: form.lastName as string,
      middleName: form.middleName as string,
      phoneNumber: form.phoneNumber as number,
      login: form.login as string,
      email: form.email as string,
      password: null,
      role: this.roles.find(r => r.transName === form.role)
    };
    this.serviceUser
      .updateEntity(user)
      .subscribe(
        _ => this.updateUser.next(user),
        error => this.toast.error('Помилка', 'Користувач з таким логіном існує')
      );
  }

  account_validation_messages = {
    email: [{ type: 'email', message: 'Введіть пошту коректно' }],
    login: [
      { type: 'required', message: "Поле логін є обов'язковим" },
      { type: 'minlength', message: 'Логін має бути більше 6 символів' }
    ],
    phoneNumber: [{ type: 'minlength', message: 'Введіть коректно номер' }]
  };
}
