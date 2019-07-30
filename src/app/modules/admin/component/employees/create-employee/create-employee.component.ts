import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { Employee } from 'src/app/modules/shared/models/employee';
import { Post } from 'src/app/modules/shared/models/post';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { PostService } from 'src/app/modules/shared/services/post.service';
import { UniqueFieldValidator } from 'src/app/modules/shared/validators/unique-field-validator';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  private readonly stringFieldValidators: Validators[] = [
    Validators.minLength(0),
    Validators.maxLength(30),
    Validators.pattern(/^[A-Za-zА-Яа-яЄєІіЇїҐґ\-\']+$/)
  ];
  readonly customFieldErrors = NAME_FIELD_ERRORS;

  @Output() addEmployee = new EventEmitter<Employee>();
  employeeForm: FormGroup;
  posts: Post[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private postService: PostService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.setUpForm();
    this.loadEntities();
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    this.createEmployee();
    this.hideModalWindow();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.hideModalWindow();
    this.setUpForm();
  }

  private setUpForm() {
    this.employeeForm = this.fb.group({
      boardNumber: [
        1,
        [Validators.required, Validators.min(1), Validators.max(1000000000)],
        [UniqueFieldValidator.createValidator(this.employeeService, 'boardNumber')]
      ],
      lastName: [undefined,
        [...this.stringFieldValidators, Validators.required],
        [UniqueFieldValidator.createValidator(this.employeeService, 'lastName')]
      ],
      firstName: [undefined,
        [...this.stringFieldValidators, Validators.required],
        [UniqueFieldValidator.createValidator(this.employeeService, 'firstName')]
      ],
      middleName: [undefined,
        [...this.stringFieldValidators, Validators.required],
        [UniqueFieldValidator.createValidator(this.employeeService, 'middleName')]
      ],
      shortName: [
        undefined,
        [...this.stringFieldValidators, Validators.required],
        [UniqueFieldValidator.createValidator(this.employeeService, 'shortName')]
      ],
      post: ['', Validators.required]
    });
  }

  private loadEntities() {
    this.postService.getEntities().subscribe(posts => (this.posts = posts));
  }

  private createEmployee() {
    const employee = new Employee(this.formValue);
    this.employeeService.addEntity(employee).subscribe(
      newEmployee => {
        this.addEmployee.next(newEmployee);
        this.toast.success('', 'Працівника створено');
      },
      _ => this.toast.error('Не вдалось створити посаду', 'Помилка створення посади')
    );
  }

  private hideModalWindow() {
    const modalWindow: any = $('#createEmployee');
    modalWindow.modal('hide');
  }

  private get formValue() {
    return this.employeeForm.value;
  }
}
