import { Component, OnInit } from '@angular/core';
import { ActionType } from '../../../models/action/actiontype';
import { ToastrService } from 'ngx-toastr';
import { ActionTypeService } from '../../../services/action-type.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-dictionary',
  templateUrl: './action-dictionary.component.html',
  styleUrls: ['./action-dictionary.component.scss']
})
export class ActionDictionaryComponent implements OnInit {
  actions: ActionType[] = [];
  tableAction: DataTables.Api;
  selectedAction: ActionType;
  tost: ToastrService;

  constructor(private actionService: ActionTypeService, private router: Router, private toast: ToastrService) { }

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,

    columns: [
      { title: 'Назва', data: 'name', defaultContent: '' },
      { data: 'id', visible: false },
      { title: 'Дії⠀', orderable: false }
    ],
    processing: true,
    serverSide: true,
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
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.tableAction = $('#action-table').DataTable(this.tableConfig);
    $('#action-table tbody').on('click', '.first', this.selectFirstItem(this));
    $('#action-table tbody').on('click', '.second', this.selectSecondItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.actionService.getFilteredEntities(dataTablesParameters).subscribe(callback);
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
