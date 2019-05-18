import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';
import { priorityColors } from '../../declarations';

declare const $;

@Component({
  selector: 'app-global-issue',
  templateUrl: './global-issue.component.html',
  styleUrls: ['./global-issue.component.scss']
})
export class GlobalIssueComponent implements OnInit {

  protected table: any;
  protected startDate: string;
  protected endDate: string;
  protected vehicleType: string;
  protected state: string;

  protected readonly tableConfig: any = {
    scrollX: true,
    select: {
      style: 'single'
    },
    columns: [
      { title: 'Номер', data: 'number', defaultContent: '' },
      { title: 'Статус', data: 'state.transName', defaultContent: '' },
      { title: 'Група', data: 'malfunction.malfunctionSubgroup.malfunctionGroup.name', defaultContent: '' },
      { title: 'Підгрупа', data: 'malfunction.malfunctionSubgroup.name', defaultContent: '' },
      { title: 'Поломка', data: 'malfunction.name', defaultContent: '' },
      { title: 'Пріоритет', data: 'priority', defaultContent: '', bVisible: false },
      { title: 'Гарантія', data: 'warranty', defaultContent: '' },
      { title: 'Транспорт', data: 'vehicle.inventoryId', defaultContent: '' },
      { title: 'Відповідальний', data: 'assignedTo.login', defaultContent: '' },
      { title: 'Виконати до', data: 'deadline', defaultContent: '' },
      { title: 'Опис', data: 'summary', defaultContent: '' },
      { title: 'Створено', data: 'createDate', defaultContent: '', bVisible: false },
      { title: 'Редаговано', data: 'modDate', defaultContent: '', bVisible: false },
      { data: 'id', bVisible: false }
    ],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    paging: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    createdRow: this.createRow
  };

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit() {
    this.initTable();
  }

  protected createRow(row: any, data: any, dataIndex: any) {
    $(row).css('background-color', priorityColors[data.priority]);
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    dataTablesParameters.filters = [];
    if (this.state) {
      dataTablesParameters.filters.push({
        entityPropertyPath: 'state.transName',
        value: this.state,
        operator: '=='
      });
    }
    if (this.startDate) {
      dataTablesParameters.filters.push({
        entityPropertyPath: 'createDate',
        value: this.startDate,
        operator: '>='
      });
    }
    if (this.endDate) {
      dataTablesParameters.filters.push({
        entityPropertyPath: 'createDate',
        value: this.endDate,
        operator: '<='
      });
    }
    if (this.vehicleType) {
      dataTablesParameters.filters.push({
        entityPropertyPath: 'vehicle.vehicleType.name',
        value: this.vehicleType,
        operator: '=='
      });
    }
    this.issueService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  protected initTable(): void {
    this.table = $('#issue-table').DataTable(this.tableConfig);
  }

  protected redrawTable(): void {
    this.table = $('#issue-table').DataTable({
      ...this.tableConfig,
      destroy: true
    });
  }

  setStartDateValue(value) {
    this.redrawTable();
    this.startDate = value;
  }

  setEndDateValue(value) {
    this.redrawTable();
    this.endDate = value;
  }

  setVechicleTypeValue(value) {
    this.redrawTable();
    this.vehicleType = value;
  }

  setStateValue(value) {
    this.redrawTable();
    this.state = value;
  }
}
