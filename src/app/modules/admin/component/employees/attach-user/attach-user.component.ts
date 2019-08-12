import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { Employee } from 'src/app/modules/shared/models/employee';
import { Post } from 'src/app/modules/shared/models/post';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { PostService } from 'src/app/modules/shared/services/post.service';
import { UniqueFieldValidator } from 'src/app/modules/shared/validators/unique-field-validator';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { User } from 'src/app/modules/shared/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerService } from 'src/app/modules/core/services/spinner.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
    selector: 'app-attach-user',
    templateUrl: './attach-user.component.html',
    styleUrls: ['./attach-user.component.scss']
})

export class AttachUserComponent implements OnInit {

    constructor(
        protected progress: SpinnerService,
        private employeeService: EmployeeService,
        private userService: UserService,
        private toast: ToastrService
    ) {}

    selectedUser: User;
    filteredUsers: User[];

    @Input() selectedEmployee: Employee;
    @Output() completed = new EventEmitter<Employee>();

    ngOnInit(): void {
        this.selectedUser = null;
        if (this.selectedEmployee && this.selectedEmployee.attachedUser) {
            this.filteredUsers = [ this.selectedEmployee.attachedUser ];
        }
    }

    changedSearch(data: any) {
        if (data.term !== '') {
            this.filterUsers(data.term).subscribe(
                response => this.filteredUsers = response
            );
        } else {
            this.filteredUsers = [];
        }
    }

    saveUser(user: User) {
        this.progress.show();
        this.employeeService.attachUser(this.selectedEmployee.id, user.id)
            .subscribe(
               updatedEmployee => {
                   this.progress.hide();
                   this.completed.next(updatedEmployee);
                   this.toast.success('Успішно прив\'язано користувача');
               },
               (error: HttpErrorResponse) => {
                   this.progress.hide();
                   this.toast.error('Не вдалось оновити працівника', 'Помилка оновлення працівника');
               }
            );
    }

    removeUser() {
        this.progress.show();
        this.employeeService.removeUser(this.selectedEmployee.id)
            .subscribe(
                updatedEmployee => {
                    this.progress.hide();
                    this.completed.next(updatedEmployee);
                },
                (error: HttpErrorResponse) => {
                    this.progress.hide();
                    this.toast.error('Не вдалось оновити працівника', 'Помилка оновлення працівника');
                }
            );
    }

    filterUsers(searchTerm: string): Observable<User[]> {
        return this.userService.getFilteredEntities(
            {
                search: {
                    value: searchTerm
                }
            }
        ).pipe(
            map(responseObj => responseObj.data),
            catchError(error => {
                this.toast.error('Не вдалось виконати пошук', 'Повторіть пошук');
                return throwError(error);
            })
        );
    }
}
