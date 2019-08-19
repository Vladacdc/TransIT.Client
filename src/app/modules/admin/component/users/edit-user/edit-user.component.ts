import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/shared/models/user';
import { RoleService } from 'src/app/modules/shared/services/role.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { Role } from 'src/app/modules/shared/models/role';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/modules/shared/models/employee';
import { SpinnerService } from 'src/app/modules/core/services/spinner.service';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { flatMap, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
// clear form
export class EditUserComponent implements OnInit, OnDestroy {

  @ViewChild('close') closeEditModal: ElementRef;
  @Output() updateUser = new EventEmitter<User>();
  @Input() set user(user: User) {
    if (!user) {
      return;
    }
    this.selectedUser = user;
    this.attachedEmployee = user.employee;
    this.userForm.patchValue({ ...this.selectedUser, role: this.selectedUser.role.transName });
    // set original value for board number, as it's not a part of User dto
    if (user.employee) {
       this.userForm.get('boardNumber')
                    .patchValue(user.employee.boardNumber, {emitEvent: false, onlySelf: true});
    } else {
       this.userForm.get('boardNumber').reset({emitEvent: false, onlySelf: true});
    }
  }

  private subscriptions: Subscription[] = [];

  userForm: FormGroup;
  attachedEmployee: Employee;
  selectedUser = new User({});
  roles: Role[] = [];
  allBoardNumbers: number[];
  formUnchanged: boolean;

  CustomNameErrorMessages = NAME_FIELD_ERRORS;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private employeeService: EmployeeService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnDestroy(): void {
    // remove all value changes subscriptions if we navigate to other component
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    $('#editUser').on('hidden.bs.modal', () => {
      this.selectedUser.employee = null;
      this.userForm.reset();
    });

    this.userForm = this.formBuilder.group({
      id: '',
      boardNumber: new FormControl(
        '',
        [Validators.maxLength(10), Validators.pattern('^[A-Za-zА-Яа-я0-9їієЇІЯЄ/\'/`-]+$')]
      ),
      lastName: new FormControl(
        '',
        [Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')]
      ),
      firstName: new FormControl(
        '',
        [Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')]
      ),
      middleName: new FormControl(
        '',
        [Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')]
      ),
      userName: new FormControl({ value: '', disabled: true }),
      phoneNumber: new FormControl('', [Validators.minLength(12)]),
      email: new FormControl('', [Validators.email, Validators.maxLength(30)]),
      role: ['', Validators.required],
      isActive: true
    });

    this.listenBoardNumberChanges();
    this.listenWholeFormChanges();

    this.roleService
      .getEntities()
      .subscribe(data => (this.roles = data.sort((a, b) => a.transName.localeCompare(b.transName))));
  }

  listenWholeFormChanges() {
    this.subscriptions.push(
      this.userForm.valueChanges.subscribe((newForm) => {
        let unchanged = true;
        Object.keys(newForm)
          .forEach(key => {
            let originalValue: string | number;
            if (key === 'role') {
              originalValue = this.selectedUser[key].transName;
            } else if (key === 'boardNumber') {
              originalValue = this.selectedUser.employee ? this.selectedUser.employee.boardNumber : null;
            } else {
              originalValue = this.selectedUser[key];
            }
            unchanged = unchanged &&
              (newForm[key] === originalValue || (newForm[key] === '' && !originalValue));
        });
        this.formUnchanged = unchanged;
      })
    );
  }

  updateData() {
    if (this.userForm.invalid) {
      return;
    }

    const form = this.userForm.getRawValue();
    let user: User = new User({
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

    // If we have selected an employee, complete a second request
    let request = this.attachedEmployee
      ? this.userService.updateEntity(user)
        .pipe(
          tap((newUser) => {
            user = newUser;
            return newUser;
          }),
          switchMap((newUser) => this.employeeService.attachUser(this.attachedEmployee.id, newUser.id)),
          map(() => user)
        )
      : this.userService.updateEntity(user);

    // Close modal dialog after all
    request = request
      .pipe(
        tap(() => this.closeEditModal.nativeElement.click())
      );

    request.subscribe(
      _ => {
        this.updateUser.next(user);
        this.toastrService.success('', 'Користувача змінено');
      },
      error => {
        this.toastrService.error('Помилка', 'Користувача не змінено');
      }
    );
    this.userForm.reset();
  }

  updateUserChangeActive(user: User) {
    this.updateUser.next(user);
  }

  // subscribing to board number changes
  listenBoardNumberChanges() {
    this.employeeService.getBoardNumbers().subscribe(
      values => {
        this.allBoardNumbers = values;
      }
    );

    const controls = ['firstName', 'middleName', 'lastName'];
    this.subscriptions.push(this.userForm.get('boardNumber').valueChanges.subscribe(
      newValue => {
        const parsed = parseInt(newValue, 10);
        if (newValue && !isNaN(parsed)) {
          this.spinnerService.show();
          // update selected employee
          this.employeeService.getByBoardNumber(parsed).subscribe(
            response => {
              this.attachedEmployee = response;
              this.spinnerService.hide();
              // set values of a few controls based on that employee
              // and disable them
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
          // if we cleared the board number field..
          controls.forEach(name => {
            this.userForm.get(name).enable();
            this.userForm.get(name).patchValue(this.selectedUser[name]);
          });
          // reset board number value to original
          if (this.selectedUser.employee) {
            this.userForm.get('boardNumber').patchValue(this.user.employee.boardNumber, {emitEvent: false});
          }
        }
      }
    ));
  }

}
