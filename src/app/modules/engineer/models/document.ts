import {IssueLog} from './issuelog';

export class Document {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public issueLog?: IssueLog,
    public createDate?: Date,
    public modDate?: Date
  ) {}
}
