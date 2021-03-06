import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';

@Component({
  selector: 'app-delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.scss']
})
export class DeleteActionComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() action: ActionType;
  @Output() deleteAction = new EventEmitter<ActionType>();

  constructor(private serviceAction: ActionTypeService, private toast: ToastrService) {}

  ngOnInit() {}

  DeleteAction() {
    this.closeDiv.nativeElement.click();
    this.serviceAction.deleteEntity(this.action.id).subscribe(
      () => {
        this.deleteAction.next(this.action);
      },
      error => this.toast.error('Існує заявка з даним екшином', 'Помилка')
    );
  }
}
