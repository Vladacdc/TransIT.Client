import { VehicleType } from '../vehicleType/vehicle-type';
import { TEntity } from 'src/app/modules/core/models/entity/entity';

export class Vehicle extends TEntity {
  id?: number;
  vehicleType: VehicleType;
  vincode: string;
  inventoryId: string;
  regNum: string;
  brand: string;
  model: string;
}
