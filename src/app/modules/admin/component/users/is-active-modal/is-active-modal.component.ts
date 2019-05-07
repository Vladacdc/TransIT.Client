import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-is-active-modal',
  templateUrl: './is-active-modal.component.html',
  styleUrls: ['./is-active-modal.component.scss']
})
export class IsActiveModalComponent implements OnInit {
  user: User;
  @Output() updateUserChangeActive = new EventEmitter<User>();
  @ViewChild('close') closeIsActiveModal: ElementRef;

  @Input() set selectedUser(selectedUser: User) {
    if (!selectedUser) {
      return;
    }
    this.user = selectedUser;
  }
  constructor(private serviceUser: UserService, private toast: ToastrService) {}
  ngOnInit() {}
  changeActive() {
    if (this.user.isActive) {
      this.user.isActive = false;
    } else {
      this.user.isActive = true;
    }
    this.serviceUser.updateEntity(this.user).subscribe(
      _ => {
        this.updateUserChangeActive.next(this.user);
        this.toast.success('', 'Активацію змінено');
      },
      error => this.toast.error('Помилка')
    );
    this.closeIsActiveModal.nativeElement.click();
  }
}
