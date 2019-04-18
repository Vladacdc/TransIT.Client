import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() user: User;
  @Input() users: User[];
  constructor(private service: UserService, ) { }

  ngOnInit() {}

  delete() {
    console.log(this.user);
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.user.id).subscribe(data => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === this.user.id) {
            this.users.splice(i, 1);
          }
        }
      }
    );
  }
}
