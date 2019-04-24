import { TEntity } from 'src/app/modules/core/models/entity/entity';

export class ActionType extends TEntity<ActionType> {
  id: number;
  name: string;
}
