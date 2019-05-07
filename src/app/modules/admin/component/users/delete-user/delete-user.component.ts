import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() user: User;
  @Output() deleteUser = new EventEmitter<User>();

  constructor(private service: UserService, private toast: ToastrService) {}

  ngOnInit() {}

  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.service.deleteEntity(this.user.id).subscribe(
      data => {
        this.deleteUser.next(this.user);
        this.toast.success('', 'Користувача видалено');
      },
      error => this.toast.error('Помилка', 'Користувач містить записи')
    );
  }
}
