import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { MalfunSubgroup } from '../malfun-subgroup/malfun-subgroup';

export class Malfunc extends TEntity {
id?:number;
name:string;
malfunctionSubroup: MalfunSubgroup;
}