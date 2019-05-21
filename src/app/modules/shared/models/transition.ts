import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { State } from './state';
import { ActionType } from './action-type';

export class Transition extends TEntity<Transition> {
  fromState: State;
  toState: State;
  actionType: ActionType;

  constructor(transition: Partial<Transition>) {
    super(transition);
    this.fromState = new State(this.fromState);
    this.toState = new State(this.toState);
    this.actionType = new ActionType(this.actionType);
  }
}
