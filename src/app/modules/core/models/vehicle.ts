import {VehicleType} from './vehicleType';

export class Vehicle {
  constructor(
    public id: number = null,
    public vehicleType: VehicleType = null,
    public vincode: string = null,
    public inventoryId: string = null,
    public regNum: string = null,
    public brand: string = null,
    public model: string = null
  ) {}
}
