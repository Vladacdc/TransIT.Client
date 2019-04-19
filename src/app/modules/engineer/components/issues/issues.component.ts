import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {Issue} from '../../../core/models/issue';
import {State} from '../../../core/models/state';
import {StateService} from '../../services/state.service';
import {IssuelogService} from '../../services/issuelog.service';
import {IssueLog} from '../../../core/models/issuelog';
import {ActionTypeService} from '../../services/action-type.service';
import {ActionType} from '../../../core/models/actionType';
import {Router} from '@angular/router';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  public issue: Issue;
  public issueLog: IssueLog;
  public stateList: Array<State>;
  public issues: Array<Issue>;
  public issueLogs: Array<IssueLog>;
  public actionTypes: Array<ActionType>;

  private table: any;
  private readonly dataTableSettings: any = {
    columnDefs: [
      {
        targets: [8, 9],
        orderable: false
      }
    ],
    // data: this.issues,
    url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
  };

  constructor(
    private issueService: IssueService,
    private issueLogService: IssuelogService,
    private actionTypeService: ActionTypeService,
    private stateService: StateService,
    private chRef: ChangeDetectorRef
  ) {
    this.issue = new Issue();
  }

  ngOnInit() {
    this.issueService.getEntities().subscribe(issues => {
      this.issues = issues;
      // console.log(issues);
      this.chRef.detectChanges();
    });
    this.actionTypeService.getEntities().subscribe(actions => {
      this.actionTypes = actions;
      this.chRef.detectChanges();
    });
    this.stateService.getEntities().subscribe(states => {
      this.stateList = states;
      this.chRef.detectChanges();
    });
    this.table = $('#issue-table').DataTable({
      columnDefs: [
        {
          targets: [8, 9],
          orderable: false
        }
      ],
      // data: this.issues,
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    });
  }

  public createItem(): void {
    this.issueService.addEntity(this.issue).subscribe();
  }

  public editItem(): void {
    this.issueService.updateEntity(this.issue).subscribe();
  }

  public deleteItem(id: number): void {
    this.issueService.deleteEntity(id).subscribe();
  }
}
