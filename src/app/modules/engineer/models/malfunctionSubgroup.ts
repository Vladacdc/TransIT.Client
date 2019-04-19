import {MalfunctionGroup} from './malfunctionGroup';

export class MalfunctionSubgroup {
  constructor(
    public id: number = null,
    public name: string = null,
    public malfunctionGroup: MalfunctionGroup = null
  ) {}
}
