import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../models/employee/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  @Output() editEmployee = new EventEmitter<Employee>();
  @Input()
  set employee(employee: Employee) {
    this._employee = employee;
    console.log(this._employee);
    this.setUpForm();
  }

  employeeForm: FormGroup;
  posts: Post[] = [];
  _employee: Employee;

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

    this.updateEmployee();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.setUpForm();
  }

  comparePosts(post: Post, otherPost: Post): boolean {
    console.log(post, otherPost);
    return post && otherPost ? post.id === otherPost.id : post === otherPost;
  }

  private loadEntities() {
    this.postService.getEntities().subscribe(posts => (this.posts = posts));
  }

  private setUpForm() {
    this.employeeForm = this.fb.group({
      lastName: [this._employee && this._employee.lastName, Validators.required],
      firstName: [this._employee && this._employee.firstName, Validators.required],
      middleName: [this._employee && this._employee.middleName, Validators.required],
      shortName: [this._employee && this._employee.shortName, Validators.required],
      post: [this._employee && this._employee.post, Validators.required]
    });
  }

  private updateEmployee() {
    const employee = new Employee({ ...this._employee, ...this.formValue });
    this.employeeService
      .updateEntity(employee)
      .subscribe(
        updatedEmployee => this.editEmployee.next(updatedEmployee),
        _ => this.toast.error('Не вдалось оновити працівника', 'Помилка оновлення працівника')
      );
  }

  private get formValue() {
    return this.employeeForm.value;
  }
}
