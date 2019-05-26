import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { priorityColors } from '../../../shared/declarations';
import { GlobalIssueComponent } from 'src/app/modules/shared/components/global-issue/global-issue.component';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { ExportExelService } from 'src/app/modules/shared/services/export-exel.service';
import { ToastrService } from 'ngx-toastr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { TokenStore } from 'src/app/modules/core/helpers/token-store';
import { environment } from 'src/environments/environment';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: '../../../shared/components/global-issue/global-issue.component.html',
  styleUrls: ['../../../shared/components/global-issue/global-issue.component.scss']
})
export class IssuesComponent extends GlobalIssueComponent {
  constructor(
    issueService: IssueService,
    excelService: ExportExelService,
    private router: Router,
    private tokenStore: TokenStore,
    private toastr: ToastrService
    ) {
    super(issueService, excelService);
    this.tableConfig.columns = [
      ...this.tableConfig.columns,
      {
        title: 'Дія',
        data: null,
        defaultContent: `
        <button class="btn"><i class="fas fa-info-circle"></i></button>
        `
      }
    ];
  }

  ngOnInit() {
    this.startConnection();
    this.initTable();
    $('#issue-table tbody').on('click', 'button', this.selectItem(this));
  }

  private hubConnection: HubConnection;

  private startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.signalrIssueUrl, {
        accessTokenFactory: () => this.tokenStore.getToken().accessToken
      })
      .build();
 
    this.hubConnection.on('ReceiveIssues', _ => {
      this.redrawTable();
      this.toastr.info('У вас нові заявки!', 'Сповіщення')
    });

    this.hubConnection
      .start()
      .catch(_ =>
        this.toastr.warning('Ваш браузер ймовірно не підтримує деякий функціонал.', 'Помилка під час з\'єднання!'));
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
