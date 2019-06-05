import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';

declare const $;

@Component({
  selector: 'app-action-dictionary',
  templateUrl: './action-dictionary.component.html',
  styleUrls: ['./action-dictionary.component.scss']
})
export class ActionDictionaryComponent implements OnInit {
  actions: ActionType[] = [];
  tableAction: any;
  selectedAction: ActionType;
  tost: ToastrService;

  constructor(private actionService: ActionTypeService, private router: Router, private toast: ToastrService) {}

  private readonly tableConfig: any = {
    responsive: true,
    columns: [
      { title: 'Назва', data: 'name', defaultContent: '' },
      { data: 'id', visible: false },
      { title: 'Дії⠀', orderable: false }
    ],
    ajax: this.ajaxCallback.bind(this),
    columnDefs: [
      {
        targets: -1,
        data: null,
        defaultContent: `<button class="first btn" data-toggle="modal" data-target="#editAction"><i class="fas fa-edit"></i></button>
         <button class="second btn" data-toggle="modal" data-target="#deleteAction"><i class="fas fas fa-trash-alt"></i></button>`
      }
    ],
    paging: true,
    scrollX: true,
    language: {
      url: 'assets/language.json'
    }
  };

  ngOnInit() {
    this.tableAction = $('#action-table').DataTable(this.tableConfig);
    $('#action-table tbody').on('click', '.first', this.selectFirstItem(this));
    $('#action-table tbody').on('click', '.second', this.selectSecondItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.actionService.getFilteredEntities(dataTablesParameters).subscribe(x => {
      if (x.recordsTotal < 11) {
        $('#action-table_wrapper')
          .find('.dataTables_paginate')
          .hide();

        $('#action-table_wrapper')
          .find('.dataTables_length')
          .hide();
      }
      callback(x);
    });
  }

  selectFirstItem(component: any) {
    return function() {
      const data = component.tableAction.row($(this).parents('tr')).data();
      component.selectedAction = data;
    };
  }

  selectSecondItem(component: any) {
    return function() {
      const data = component.tableAction.row($(this).parents('tr')).data();
      component.selectedAction = data;
    };
  }

  addAction(action: ActionType) {
    this.actions.push(action);
    this.tableAction.draw();
  }

  deleteAction(action: ActionType) {
    this.actions = this.actions.filter(v => v.id !== action.id);
    this.tableAction.draw();
  }

  editAction(action: ActionType) {
    this.actions[this.actions.findIndex(i => i.id === action.id)] = action;
    this.tableAction.draw();
  }
}
