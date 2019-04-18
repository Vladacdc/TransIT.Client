import {Component, OnInit} from '@angular/core';
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

  constructor(
    private issueService: IssueService,
    private issueLogService: IssuelogService,
    private actionTypeService: ActionTypeService,
    private stateService: StateService,
    private router: Router
  ) {
    this.issue = new Issue();
  }

  ngOnInit() {
    this.actionTypeService.getEntities().subscribe(actions => {
      this.actionTypes = actions;
    });
    this.stateService.getEntities().subscribe(states => {
      this.stateList = states;
    });
    this.issueService.getEntities().subscribe(issues => {
      this.issues = issues;
    });
    this.table = $('#issue-table').DataTable({
      columnDefs: [
        {
          targets: [8, 9],
          orderable: false
        }
      ],
      data: this.issues,
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json',
      // processing: true,
      // serverSide: true,
      // columns: [
      //   { name: 'state', title: 'Стан' },
      //   { name: 'malfunction', title: 'Поломка' },
      //   { name: 'warranty', title: 'Гарантія' },
      //   { name: 'vehicle', title: 'Транспорт' },
      //   { name: 'assignedTo', title: 'Відповідальний' },
      //   { name: 'summary', title: 'Опис' },
      //   { name: 'createDate', title: 'Створено' },
      //   { name: 'modDate', title: 'Редаговано' },
      // ],
      // ajax: {
      //   url: 'https://localhost:5001/api/values/filter',
      //   type: 'POST',
      //   datatype: 'application/json'
      // }
    });
  }

  public selectItem(item: Issue): void {
    this.issue = item;
    this.router.navigate(['issue-logs']);
  }

  public createItem(): void {
    this.issueService.addEntity(this.issue).subscribe();
  }

  public editItem(): void {
    this.issueService.updateEntity(this.issue).subscribe();
  }

  public deleteItem(id: number): void {
    this.issueService.deleteEntity(id);
  }
}
