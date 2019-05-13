import { TEntity } from 'src/app/modules/core/models/entity/entity';

export class State extends TEntity<State> {
    public name?: string;
    public transName?: string;
  }
