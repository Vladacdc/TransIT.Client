import { Component, OnInit } from '@angular/core';
import { priorityColors } from '../../declarations';
import { ExportExelService } from '../../services/export-exel.service';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';

declare const $;

@Component({
  selector: 'app-global-issue',
  templateUrl: './global-issue.component.html',
  styleUrls: ['./global-issue.component.scss']
})
export class GlobalIssueComponent implements OnInit {
  protected table: any;
  protected date: Issue[];
  protected startDate: string;
  protected endDate: string;
  protected vehicleType: string;
  protected state: string;
  protected priority: string;
  protected malfunctionGroup: string;
  protected malfunctionSubGroup: string;
  protected malfunction: string;
  protected location: string;

  protected readonly columns: Array<any> = [
    { title: 'Номер', data: 'number', defaultContent: '' },
    { title: 'Статус', data: 'state.transName', defaultContent: '' },
    { title: 'Група', data: 'malfunction.malfunctionSubgroup.malfunctionGroup.name', defaultContent: '' },
    { title: 'Підгрупа', data: 'malfunction.malfunctionSubgroup.name', defaultContent: '' },
    { title: 'Поломка', data: 'malfunction.name', defaultContent: '' },
    { title: 'Пріоритет', data: 'priority', defaultContent: '', bVisible: false },
    { title: 'Гарантія', data: 'warranty', defaultContent: '' },
    { title: 'Транспорт', data: 'vehicle.name', defaultContent: '' },
    { title: 'Відповідальний', data: 'assignedTo.login', defaultContent: '', bVisible: false },
    { title: 'Виконати до', data: 'deadline', defaultContent: '', bVisible: false },
    { title: 'Місцезнаходження', data: 'vehicle.location.name', defaultContent: '' },
    { title: 'Опис', data: 'summary', defaultContent: '' },
    { title: 'Створено', data: 'createdDate', defaultContent: '', bVisible: false },
    { title: 'Редаговано', data: 'updatedDate', defaultContent: '', bVisible: false },
    { data: 'id', bVisible: false }
  ];

  protected readonly tableConfig: any = {
    drawCallback: function(settings) {
      let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
      pagination.toggle(this.api().page.info().pages > 1);
    },
    scrollX: true,
    select: {
      style: 'single'
    },
    columns: this.columns,
    order: [[this.columns.indexOf(this.columns.filter(x => x.data === 'updatedDate')[0]), 'desc']],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    paging: true,
    language: {
      buttons: {
        pageLength: {
          _: 'Показати %d записів'
        }
      }
    },
    createdRow: this.createRow,
    dom: 'Bfrtip',
    lengthMenu: [[10, 25, 50, 1000], ['10 записів', '25 записів', '50 записів', '1000 записів']],
    buttons: [
      { extend: 'copy', text: 'Скопіювати' },
      { extend: 'csv' },
      { extend: 'excel' },
      { extend: 'pdf' },
      { extend: 'print', text: 'Друк' },
      {
        text: 'Всі записи в Exel',
        action: _ => {
          this.issueService.getEntities().subscribe(issues => {
            this.date = issues;
            this.excelService.exportAsExcelFile(this.date, 'Заявки');
          });
        }
      },
      'pageLength'
    ],
    exportOptions: {
      modifier: {
        order: 'current', // 'current', 'applied', 'index',  'original'
        page: 'all', // 'all',     'current'
        search: 'applied' // 'none',    'applied', 'removed'
      }
    }
  };

  constructor(private issueService: IssueService, private excelService: ExportExelService) {}

  ngOnInit() {
    this.initTable();
  }

  protected createRow(row: any, data: any, dataIndex: any) {
    $(row).css('background-color', priorityColors[data.priority]);
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    const filters = [];
    if (this.state) {
      filters.push({
        entityPropertyPath: 'state.transName',
        value: this.state,
        operator: '=='
      });
    }
    if (this.malfunctionGroup) {
      filters.push({
        entityPropertyPath: 'malfunction.malfunctionSubgroup.malfunctionGroup.name',
        value: this.malfunctionGroup,
        operator: '=='
      });
    }
    if (this.malfunctionSubGroup) {
      filters.push({
        entityPropertyPath: 'malfunction.malfunctionSubgroup.name',
        value: this.malfunctionSubGroup,
        operator: '=='
      });
    }
    if (this.malfunction) {
      filters.push({
        entityPropertyPath: 'malfunction.name',
        value: this.malfunction,
        operator: '=='
      });
    }
    if (this.priority) {
      filters.push({
        entityPropertyPath: 'priority',
        value: this.priority,
        operator: '=='
      });
    }
    if (this.startDate) {
      filters.push({
        entityPropertyPath: 'createdDate',
        value: this.startDate,
        operator: '>='
      });
    }
    if (this.endDate) {
      filters.push({
        entityPropertyPath: 'createdDate',
        value: this.endDate,
        operator: '<='
      });
    }

    if (this.location) {
      filters.push({
        entityPropertyPath: 'vehicle.location.name',
        value: this.location,
        operator: '=='
      });
    }

    if (this.vehicleType) {
      filters.push({
        entityPropertyPath: 'vehicle.vehicleType.name',
        value: this.vehicleType,
        operator: '=='
      });
    }
    if (filters.length) {
      dataTablesParameters.filters = filters;
    }
    this.issueService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  protected initTable(): void {
    this.table = $('#issue-table').DataTable(this.tableConfig);
  }

  redrawTable(): void {
    this.table = $('#issue-table').DataTable({
      ...this.tableConfig,
      destroy: true
    });
  }

  setMalfunctionGroupValue(value) {
    this.malfunctionGroup = value;
  }

  setMalfunctionSubGroupValue(value) {
    this.malfunctionSubGroup = value;
  }
  setMalfunctionValue(value) {
    this.malfunction = value;
  }

  setStartDateValue(value) {
    this.startDate = value;
  }

  setEndDateValue(value) {
    this.endDate = value;
  }

  setVechicleTypeValue(value) {
    this.vehicleType = value;
  }

  setStateValue(value) {
    this.state = value;
  }
  setPriorityValue(value) {
    this.priority = value;
  }
  setLocationValue(value) {
    this.location = value;
  }
}
