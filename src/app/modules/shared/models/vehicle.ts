import { VehicleType } from './vehicleType';
import { TEntity } from '../../core/models/entity/entity';

export class Vehicle extends TEntity<Vehicle> {
  vehicleType: VehicleType;
  vincode: string;
  inventoryId: string;
  regNum: string;
  brand: string;
  model: string;

  constructor(vehicle: Partial<Vehicle>) {
    super(vehicle);
    this.vehicleType = new VehicleType(this.vehicleType);
  }

  get name(): string {
    return `${this.brand} ${this.model} ${this.vincode || ''} ${this.inventoryId || ''} ${this.regNum || ''}`;
  }
}
