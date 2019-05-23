import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/modules/shared/models/state';
import { StateService } from 'src/app/modules/shared/services/state.service';

@Component({
  selector: 'app-delete-state',
  templateUrl: './delete-state.component.html',
  styleUrls: ['./delete-state.component.scss']
})
export class DeleteStateComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() state: State;
  @Output() deleteState = new EventEmitter<State>();

  constructor(private serviceState: StateService, private toast: ToastrService) {}

  ngOnInit() {}

  DeleteState() {
    this.closeDiv.nativeElement.click();
    this.serviceState.deleteEntity(this.state.id).subscribe(
      () => {
        this.deleteState.next(this.state);
      },
      error => this.toast.error('Даний стан використовується', 'Помилка')
    );
  }
}
