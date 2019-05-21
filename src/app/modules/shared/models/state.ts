import { TEntity } from '../../core/models/entity/entity';

export class State extends TEntity<State> {
  name: string;
  transName: string;

  constructor(state: Partial<State>) {
    super(state);
  }
}
