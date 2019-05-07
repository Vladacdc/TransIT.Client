import { IssueLog } from './issuelog';
import { TEntity } from '../../core/models/entity/entity';

export class Document extends TEntity<Document> {
  name?: string;
  description?: string;
  issueLog?: IssueLog;
  createDate?: Date;
  modDate?: Date;
}
