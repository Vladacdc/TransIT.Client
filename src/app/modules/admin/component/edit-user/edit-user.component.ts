import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/role/role';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set user(user: User) {
    if (!user) {
      return;
    }
    this.userForm.patchValue({ ...user, role: user.role.transName });
  }
  @Output() updateUser = new EventEmitter<User>();

  userForm: FormGroup;
  roles: Role[] = [];

  constructor(private formBuilder: FormBuilder, private serviceRole: RoleService, private serviceUser: UserService) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: '',
      lastName: '',
      firstName: '',
      phoneNumber: 0,
      login: ['', Validators.required],
      email: ['', Validators.email],
      role: ['', Validators.required]
    });
    this.serviceRole.getEntities().subscribe(data => (this.roles = data));
  }
  updateData() {
    if (this.userForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.userForm.value;
    const user: User = {
      id: form.id as number,
      firstName: form.firstName as string,
      lastName: form.lastName as string,
      phoneNumber: form.phoneNumber as number,
      login: form.login as string,
      email: form.email as string,
      role: this.roles.find(r => r.transName === form.role)
    };
    this.serviceUser.updateEntity(user).subscribe(_ => this.updateUser.next(user));
  }
}
