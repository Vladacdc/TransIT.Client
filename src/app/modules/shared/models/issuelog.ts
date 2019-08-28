import { Issue } from './issue';
import { State } from './state';
import { ActionType } from './action-type';
import { Supplier } from './supplier';
import { Document } from './document';
import { TEntity } from '../../core/models/entity/entity';
import { WorkType } from './work-type';

export class IssueLog extends TEntity<IssueLog> {
  description: string;
  expenses: number;
  actionType: ActionType;
  workType: WorkType;
  issue: Issue;
  newState: State;
  oldState: State;
  supplier: Supplier;
  updatedDate: Date;
  createdDate: Date;
  documents: Array<Document>;
  actionTypeName: string;
  workTypeName: string;
  issueName: string;
  newStateName: string;
  oldStateName: string;
  supplierName: string;

  constructor(issueLog: Partial<IssueLog>) {
    super(issueLog);
    this.oldState = new State(this.oldState);
    this.newState = new State(this.newState);
    this.actionType = new ActionType(this.actionType);
    this.supplier = new Supplier(this.supplier);
    this.actionTypeName = this.actionType.name;
    this.workTypeName = this.workType.name;
    this.issueName = this.issue.summary;
    this.newStateName = this.newState.name;
    this.oldStateName = this.oldState.name;
    this.supplierName = this.supplier.name;
  }
}
