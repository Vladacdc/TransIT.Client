import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IssuelogService} from '../../services/issuelog.service';
import {IssueLog} from '../../../core/models/issuelog';
import {ActionType} from '../../../core/models/actionType';
import {State} from '../../../core/models/state';
import {ActivatedRoute} from '@angular/router';

declare const $;

@Component({
  selector: 'app-issue-logs',
  templateUrl: './issue-logs.component.html',
  styleUrls: ['./issue-logs.component.scss']
})
export class IssueLogsComponent implements OnInit {

  public issueLog: IssueLog;
  public issueLogs: Array<IssueLog>;
  public states: Array<State>;
  public actionTypes: Array<ActionType>;

  private issueLogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private issueLogService: IssuelogService
  ) {
    this.issueLog = new IssueLog();
    this.issueLogForm = this.fb.group({

    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const issueId = params.id;
      if (issueId) {
        this.issueLogService.getEntitiesByIssueId(issueId).subscribe(logs => {
          this.issueLogs = logs;
        });
      } else {
        this.issueLogService.getEntities().subscribe(logs => {
          this.issueLogs = logs;
        });
      }
    });
    $('#issue-logs-table').DataTable({
      data: this.issueLogs,
      columnDefs: [
        {
          targets: [9, 10],
          orderable: false
        }
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
  }

  public createItem(): void {
    this.issueLogService.addEntity(this.issueLog).subscribe();
  }

  public editItem(): void {
    this.issueLogService.updateEntity(this.issueLog).subscribe();
  }

  public deleteItem(id: number): void {
    this.issueLogService.deleteEntity(id);
  }
}
