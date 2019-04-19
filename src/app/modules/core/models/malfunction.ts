import {MalfunctionSubgroup} from './malfunctionSubgroup';

export class Malfunction {
  constructor(
    public id: number = null,
    public name: string = null,
    public malfunctionSubgroup: MalfunctionSubgroup = null
  ) {}
}
