import { TEntity } from '../../core/models/entity/entity';

export class ActionType extends TEntity<ActionType> {
  name: string;

  constructor(actionType: Partial<ActionType>) {
    super(actionType);
  }
}
