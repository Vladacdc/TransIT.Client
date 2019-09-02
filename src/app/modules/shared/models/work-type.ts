import {TEntity} from '../../core/models/entity/entity';

export class WorkType extends TEntity<WorkType> {
    id: number;
    name: string;
    estimatedCost: number;
    estimatedTime: number;

    constructor(workType: Partial<WorkType>) {
        super(workType);
    }
}
