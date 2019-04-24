import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
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
      },
      error => this.toast.error('Помилка', 'Користувач містить записи')
    );
  }
}
