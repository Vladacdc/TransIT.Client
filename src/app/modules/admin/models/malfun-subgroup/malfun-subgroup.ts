import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { MalfuncGroup } from '../malfuncGroup/malfunc-group';

export class MalfunSubgroup extends TEntity{
    id? :number;
    name : string;
    malfunctionGroup: MalfuncGroup;
}
