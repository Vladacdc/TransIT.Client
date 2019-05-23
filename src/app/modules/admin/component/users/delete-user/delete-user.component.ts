import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/shared/models/user';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Output() deleteUser = new EventEmitter<User>();

  @Input() set user(user: User) {
    if (!user) {
      return;
    }
    this.userSelected = user;
  }

  userSelected: User = new User({ login: '' });

  constructor(private service: UserService, private toast: ToastrService) {}

  ngOnInit() {}

  delete() {
    this.closeDeleteModal.nativeElement.click();

    this.service.deleteEntity(this.userSelected.id).subscribe(
      data => {
        this.deleteUser.next(this.userSelected);
        this.toast.success('', 'Користувача видалено');
      },
      error => this.toast.error('Помилка', 'Користувач містить записи')
    );
  }
}
