import { VehicleType } from './vehicle-type';
import { TEntity } from '../../core/models/entity/entity';

export class Vehicle extends TEntity {
  vehicleType?: VehicleType;
  vincode?: string;
  inventoryId?: string;
  regNum?: string;
  brand?: string;
  model?: string;
}
