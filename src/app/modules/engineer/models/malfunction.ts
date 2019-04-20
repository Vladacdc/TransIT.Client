import {MalfunctionSubgroup} from './malfunctionSubgroup';

export class Malfunction {
  constructor(
    public id?: number,
    public name?: string,
    public malfunctionSubgroup?: MalfunctionSubgroup
  ) {}
}
