import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../models/employee/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Post } from '../../../models/post/post';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
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
      lastName: [undefined, Validators.required],
      firstName: [undefined, Validators.required],
      middleName: [undefined, Validators.required],
      shortName: [undefined, Validators.required],
      post: ['', Validators.required]
    });
  }

  private loadEntities() {
    this.postService.getEntities().subscribe(posts => (this.posts = posts));
  }

  private createEmployee() {
    const employee = new Employee(this.formValue);
    console.log(employee);
    console.log(this.formValue);
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
