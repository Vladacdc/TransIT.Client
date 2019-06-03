import { TEntity } from '../../core/models/entity/entity';

export class Location extends TEntity<Location> {
    name: string;
    description: string;

    constructor(location: Partial<Location>) {
        super(location);
    }
}
