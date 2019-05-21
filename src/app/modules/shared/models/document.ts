import { IssueLog } from './issuelog';
import { TEntity } from '../../core/models/entity/entity';
import { User } from './user';

export class Document extends TEntity<Document> {
  name: string;
  description: string;
  issueLog: IssueLog;
  mod: User;
  modDate: Date;

  constructor(document: Partial<Document>) {
    super(document);
    this.issueLog = new IssueLog(this.issueLog);
    this.mod = new User(this.mod);
  }
}
