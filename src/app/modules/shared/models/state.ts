import { TEntity } from '../../core/models/entity/entity';

export class State extends TEntity<State> {
  name: string;
  transName: string;
  isFixed: boolean;

  constructor(state: Partial<State>) {
    super(state);
  }
}
