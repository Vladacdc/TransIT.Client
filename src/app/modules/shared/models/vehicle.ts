import { VehicleType } from './vehicleType';
import { TEntity } from '../../core/models/entity/entity';
import { Location } from './location';

export class Vehicle extends TEntity<Vehicle> {
  vehicleType: VehicleType;
  vincode: string;
  inventoryId: string;
  regNum: string;
  brand: string;
  model: string;
  location: Location;
  commissioningDate: Date;
  warrantyEndDate: Date;
  vehicleTypeName: string;
  locationName: string;

  constructor(vehicle: Partial<Vehicle>) {
    super(vehicle);
    this.vehicleType = new VehicleType(this.vehicleType);
    this.location = this.location && new Location(this.location);
    this.vehicleTypeName = this.vehicleType.name;
    if(this.location)
    {
      this.locationName = this.location.name;
    }
    else
    {
      this.locationName = '';
    }
  }

  get name(): string {
    return `${this.brand} ${this.model} ${this.vincode || ''} ${this.inventoryId || ''} ${this.regNum || ''}`;
  }
}
