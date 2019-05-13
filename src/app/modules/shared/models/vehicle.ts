import { VehicleType } from './vehicleType';
import { TEntity } from '../../core/models/entity/entity';

export class Vehicle extends TEntity<Vehicle> {
  public vehicleType?: VehicleType;
  public vincode?: string;
  public inventoryId?: string;
  public regNum?: string;
  public brand?: string;
  public model?: string;
}
