export class TEntity<T> {
  id: number | string;

  constructor(entity: Partial<T> = {}) {
    Object.assign(this, entity);
  }
}
