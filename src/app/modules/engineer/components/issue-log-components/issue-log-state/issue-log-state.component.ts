import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { State } from 'src/app/modules/shared/models/state';
import { StateService } from 'src/app/modules/shared/services/state.service';

@Component({
  selector: 'app-issue-log-state',
  templateUrl: './issue-log-state.component.html',
  styleUrls: ['./issue-log-state.component.scss']
})
export class IssueLogStateComponent implements OnInit {
  @Input() currentState: State;
  states: Array<State>;
  @Output() selectState: EventEmitter<State>;

  constructor(private stateService: StateService) {
    this.selectState = new EventEmitter<State>();
  }

  ngOnInit() {
    this.stateService.getEntities().subscribe(items => (this.states = items));
  }

  selectItem(item: State): void {
    this.currentState = item;
    this.selectState.emit(item);
  }
}
