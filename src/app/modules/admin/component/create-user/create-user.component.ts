import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user/user';
import { Role } from '../../models/role/role';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createUser = new EventEmitter<User>();
  userForm: FormGroup;
  roleList: Role[] = [];

  constructor(private serviceRole: RoleService, private serviceUser: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      lastName: '',
      firstName: '',
      middleName: '',
      phoneNumber: '',
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.email],
      role: ['', Validators.required]
    });
    this.serviceRole.getEntities().subscribe(data => (this.roleList = data));
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
      middleName : form.middleName as string,
      phoneNumber: form.phoneNumber as number,
      login: form.login as string,
      email: form.email as string,
      password: form.password as string,
      role: this.roleList[this.roleName.findIndex(r => r === form.role)]
    };
    this.serviceUser.addEntity(user).subscribe(_ => this.createUser.next(user));
    this.closeDiv.nativeElement.click();
  }

  get roleName(): string[] {
    return this.roleList.map(r => r.name);
  }
}
