import {VehicleType} from './vehicleType';

export class Vehicle {
  constructor(
    public id?: number,
    public vehicleType?: VehicleType,
    public vincode?: string,
    public inventoryId?: string,
    public regNum?: string,
    public brand?: string,
    public model?: string
  ) {}
}
