import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { IssueLog } from '../issueLog/IssueLog';

export class Documents extends TEntity<Documents> {
    public name?: string;
    public description?: string;
    public issueLog?: IssueLog;
    public createDate?: Date;
    public modDate?: Date;
  }
