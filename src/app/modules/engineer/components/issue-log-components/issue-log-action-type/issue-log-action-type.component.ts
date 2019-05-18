import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionType } from '../../../models/actionType';
import { ActionTypeService } from '../../../services/action-type.service';

@Component({
  selector: 'app-issue-log-action-type',
  templateUrl: './issue-log-action-type.component.html',
  styleUrls: ['./issue-log-action-type.component.scss']
})
export class IssueLogActionTypeComponent implements OnInit {

  currentActionType: ActionType;
  actions: Array<ActionType>;
  @Output() selectActionType: EventEmitter<ActionType>;

  constructor(private actionTypeService: ActionTypeService) {
    this.selectActionType = new EventEmitter<ActionType>();
  }

  ngOnInit() {
    this.actionTypeService.getEntities().subscribe(items => this.actions = items);
  }

  selectItem(item: ActionType): void {
    this.currentActionType = item;
    this.selectActionType.emit(item);
  }
}
