import { TEntity } from '../../core/models/entity/entity';

export class State extends TEntity<State> {
  public name?: string;
  public transName?: string;
}
