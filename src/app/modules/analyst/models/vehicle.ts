import { TEntity } from '../../core/models/entity/entity';
import { VehicleType } from './vehicle-type';

export class Vehicle extends TEntity<Vehicle> {
  vehicleType: VehicleType;
  vincode: string;
  inventoryId: string;
  regNum: string;
  brand: string;
  model: string;
}
