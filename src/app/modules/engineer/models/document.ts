import { IssueLog } from './issuelog';
import { TEntity } from '../../core/models/entity/entity';

export class Document extends TEntity<Document> {
  public name?: string;
  public description?: string;
  public issueLog?: IssueLog;
  public createDate?: Date;
  public modDate?: Date;
}
