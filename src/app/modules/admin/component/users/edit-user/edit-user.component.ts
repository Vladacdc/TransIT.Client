import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/shared/models/user';
import { RoleService } from 'src/app/modules/shared/services/role.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { Role } from 'src/app/modules/shared/models/role';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
// clear form
export class EditUserComponent implements OnInit {
  @ViewChild('close') closeEditModal: ElementRef;
  @Output() updateUser = new EventEmitter<User>();
  @Input() set user(user: User) {
    if (!user) {
      return;
    }
    this.selectedUser = user;
    this.userForm.patchValue({ ...this.selectedUser, role: this.selectedUser.role.transName });
  }
  selectedUser = new User({});
  userForm: FormGroup;
  roles: Role[] = [];
  CustomNameErrorMessages = NAME_FIELD_ERRORS;

  constructor(
    private formBuilder: FormBuilder,
    private serviceRole: RoleService,
    private serviceUser: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    $('#editUser').on('hidden.bs.modal', () => {
      this.userForm.patchValue({ ...this.selectedUser, role: this.selectedUser.role.transName });
      $(this)
        .find('form')
        .trigger('reset');
    });

    this.userForm = this.formBuilder.group({
      id: '',
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
      userName: new FormControl({ value: '', disabled: true }),
      phoneNumber: new FormControl('', Validators.minLength(14)),
      email: new FormControl('', Validators.compose([Validators.email, Validators.maxLength(30)])),
      role: ['', Validators.required],
      isActive: true
    });
    this.serviceRole
      .getEntities()
      .subscribe(data => (this.roles = data.sort((a, b) => a.transName.localeCompare(b.transName))));
  }

  updateData() {
    if (this.userForm.invalid) {
      return;
    }

    this.closeEditModal.nativeElement.click();
    const form = this.userForm.value;
    const user: User = new User({
      id: this.selectedUser.id,
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      middleName: form.middleName || '',
      phoneNumber: form.phoneNumber,
      userName: this.selectedUser.userName,
      email: form.email,
      password: this.selectedUser.password,
      role: this.roles.find(r => r.transName === form.role),
      isActive: this.selectedUser.isActive
    });
    this.serviceUser.updateEntity(user).subscribe(
      _ => {
        this.updateUser.next(user);
        this.toast.success('', 'Користувача змінено');
      },
      error => {
        this.toast.error('Помилка', 'Користувача не змінено');
      }
    );
    this.userForm.reset();
  }
  updateUserChangeActive(user: User) {
    this.updateUser.next(user);
  }
}
