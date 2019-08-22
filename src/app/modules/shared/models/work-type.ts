import {TEntity} from '../../core/models/entity/entity';

export class WorkType extends TEntity<WorkType> {
    id: number;
    name: string;
    estimated_cost: number;
    estimated_time: number;

    constructor(workType: Partial<WorkType>) {
        super(workType);
    }
}
