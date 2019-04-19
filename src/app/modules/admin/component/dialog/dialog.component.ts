import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() user: User;
  @Output() deleteUser = new EventEmitter<User>();

  constructor(private service: UserService) {}

  ngOnInit() {}

  delete() {
    console.log(this.user);
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.user.id).subscribe(data => {
      this.deleteUser.next(this.user);
    });
  }
}
