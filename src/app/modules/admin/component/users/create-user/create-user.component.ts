import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { matchPassword, LOGIN_ERRORS, NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { User } from 'src/app/modules/shared/models/user';
import { Role } from 'src/app/modules/shared/models/role';
import { RoleService } from 'src/app/modules/shared/services/role.service';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { SpinnerService } from 'src/app/modules/core/services/spinner.service';
import { Employee } from 'src/app/modules/shared/models/employee';
import { flatMap, map, tap, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  @ViewChild('modalContainer') modalContainer: ElementRef;
  @Output() createUser = new EventEmitter<User>();

  boardNumberChanged: Subscription;
  userForm: FormGroup;

  roleList: Role[] = [];
  allBoardNumbers: number[];
  attachedEmployee: Employee;

  CustomLoginErrorMessages = LOGIN_ERRORS;
  CustomNameErrorMessages = NAME_FIELD_ERRORS;

  constructor(
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private spinnerService: SpinnerService
  ) {}

  ngOnDestroy(): void {
    this.boardNumberChanged.unsubscribe();
  }

  ngOnInit() {
    this.setupForm();
    this.listenBoardNumberChanges();
    this.roleService
    .getEntities()
    .subscribe(data => (this.roleList = data.sort((a, b) => a.transName.localeCompare(b.transName))));
  }

  setupForm() {
    this.userForm = this.formBuilder.group(
      {
        boardNumber: new FormControl(
          '',
          [Validators.maxLength(10), Validators.pattern('^[A-Za-zА-Яа-я0-9їієЇІЯЄ/\'/`-]+$')]
        ),
        lastName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')])
        ),
        firstName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')])
        ),
        middleName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')])
        ),
        phoneNumber: new FormControl('', Validators.minLength(12)),
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
  }

  listenBoardNumberChanges() {
    this.employeeService.getBoardNumbers().subscribe(
      values => {
        this.allBoardNumbers = values;
      }
    );

    // subscribing to board number changes
    const controls = ['firstName', 'middleName', 'lastName'];
    this.boardNumberChanged = this.userForm.get('boardNumber').valueChanges.subscribe(
      newValue => {
        if (newValue) {
          this.spinnerService.show();
          this.employeeService.getByBoardNumber(parseInt(newValue, 10)).subscribe(
            response => {
              this.attachedEmployee = response;
              this.spinnerService.hide();
              controls.forEach(control => {
                this.userForm.get(control).patchValue(this.attachedEmployee[control]);
                this.userForm.get(control).disable();
              });
            },
            error => {
              this.spinnerService.hide();
              return this.toastrService.error('Сталася помилка', 'Повторіть спробу');
            }
          );
        } else {
          this.attachedEmployee = null;
          controls.forEach(control => {
            this.userForm.get(control).reset();
            this.userForm.get(control).enable();
          });
        }
      }
    );
  }

  resetValues() {
    this.userForm.reset();
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key).reset();
    });
  }

  clearForm(event: any) {
    // It means we clicked outside modal window
    if (event.target.id === 'createUser') {
      this.resetValues();
    }
  }

  cancel(event: any) {
    event.stopPropagation();
    this.resetValues();
    this.modalContainer.nativeElement.click();
  }

  clickSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const form = this.userForm.getRawValue();
    let user: User = new User({
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

    let request = this.attachedEmployee ?
        this.userService.addEntity(user)
        .pipe(
          tap((newUser) => {
            user = newUser;
            return newUser;
          }),
          switchMap((newUser) => this.employeeService.attachUser(this.attachedEmployee.id, newUser.id)),
          map(() => user)
        )
        : this.userService.addEntity(user);

    // Close modal dialog after all
    request = request
      .pipe(
        tap(() => this.modalContainer.nativeElement.click())
      );

    request.subscribe(
      success => {
        this.createUser.next(success);
        this.toastrService.success('', 'Користувача створено');
      },
      error => {
        this.toastrService.error('Помилка', 'Користувач з таким логіном існує');
      }
    );
  }

  get roleName(): string[] {
    return this.roleList.map(r => r.transName);
  }
}
