import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { State } from 'src/app/modules/admin/models/state/state';
import { StateService } from 'src/app/modules/admin/services/state.service';

@Component({
  selector: 'app-delete-state',
  templateUrl: './delete-state.component.html',
  styleUrls: ['./delete-state.component.scss']
})
export class DeleteStateComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() state: State;
  @Output() deleteState = new EventEmitter<State>();

  constructor(private serviceState: StateService) {}

  ngOnInit() {}

  DeleteState() {
    console.dir(this.state);
    this.closeDiv.nativeElement.click();
    this.serviceState.deleteEntity(this.state.id).subscribe(() => {
      this.deleteState.next(this.state);
    });
  }
}
