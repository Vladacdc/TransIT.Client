import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../models/employee/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Post } from '../../../models/post/post';
import { PostService } from '../../../services/post.service';
import { STRING_FIELD_ERRORS } from 'src/app/custom-errors';

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
  readonly customFieldErrors = STRING_FIELD_ERRORS;

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
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.setUpForm();
  }

  private setUpForm() {
    this.employeeForm = this.fb.group({
      boardNumber: [1, [Validators.required, Validators.min(1), Validators.max(1000000000)]],
      lastName: [undefined, this.stringFieldValidators],
      firstName: [undefined, this.stringFieldValidators],
      middleName: [undefined, this.stringFieldValidators],
      shortName: [undefined, [...this.stringFieldValidators, Validators.required]],
      post: ['', Validators.required]
    });
  }

  private loadEntities() {
    this.postService.getEntities().subscribe(posts => (this.posts = posts));
  }

  private createEmployee() {
    const employee = new Employee(this.formValue);
    this.employeeService
      .addEntity(employee)
      .subscribe(
        newEmployee => this.addEmployee.next(newEmployee),
        _ => this.toast.error('Не вдалось створити посаду', 'Помилка створення посади')
      );
  }

  private get formValue() {
    return this.employeeForm.value;
  }
}
