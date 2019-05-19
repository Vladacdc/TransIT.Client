import { Component } from '@angular/core';
import { IssueService } from '../../../shared/services/issue.service';
import { Router } from '@angular/router';
import { priorityColors } from '../../../shared/declarations';
import { GlobalIssueComponent } from 'src/app/modules/shared/components/global-issue/global-issue.component';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: '../../../shared/components/global-issue/global-issue.component.html',
  styleUrls: ['../../../shared/components/global-issue/global-issue.component.scss']
})
export class IssuesComponent extends GlobalIssueComponent {

  constructor(issueService: IssueService, private router: Router) {
    super(issueService);
    this.tableConfig.columns = [
      ...this.tableConfig.columns,
      {
        title: 'Дія',
        data: null,
        defaultContent: '<button class="btn"><i class="fas fa-info-circle"></i></button>'
      }
    ];
  }

  ngOnInit() {
    this.initTable();
    $('#issue-table tbody').on('click', 'button', this.selectItem(this));
  }

  protected createRow(row: any, data: any, dataIndex: any) {
    $(row).css('background-color', priorityColors[data.priority]);
  }

  protected selectItem(component: any) {
    return function() {
      component.issueService.selectedItem = component.table.row($(this).parents('tr')).data();
      component.router.navigate(['/engineer/issues/edit']);
    };
  }
}
