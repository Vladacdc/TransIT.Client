import {MalfunctionGroup} from './malfunctionGroup';

export class MalfunctionSubgroup {
  constructor(
    public id?: number,
    public name?: string,
    public malfunctionGroup?: MalfunctionGroup
  ) {}
}
