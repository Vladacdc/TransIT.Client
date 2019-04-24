export class TEntity<T> {
  id: number;

  constructor(entity: Partial<T> = {}) {
    Object.assign(this, entity);
  }
}
