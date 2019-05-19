import { Component, OnInit } from '@angular/core';
import { State } from '../../../models/state/state';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../../services/state.service';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-state-dictionary',
  templateUrl: './state-dictionary.component.html',
  styleUrls: ['./state-dictionary.component.scss']
})
export class StateDictionaryComponent implements OnInit {
  states: State[] = [];
  tableState: DataTables.Api;
  selectedState: State;
  tost: ToastrService;

  constructor(private stateService: StateService, private router: Router, private toast: ToastrService) {}

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,

    columns: [
      { title: 'Назва', data: 'transName', defaultContent: '' },
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
        defaultContent: `<button class="first btn" data-toggle="modal" data-target="#editState"><i class="fas fa-edit"></i></button>
         <button class="second btn" data-toggle="modal" data-target="#deleteState"><i class="fas fas fa-trash-alt"></i></button>`
      }
    ],
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.tableState = $('#state-table').DataTable(this.tableConfig);
    $('#state-table tbody').on('click', '.first', this.selectFirstItem(this));
    $('#state-table tbody').on('click', '.second', this.selectSecondItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.stateService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  selectFirstItem(component: any) {
    return function() {
      const data = component.tableState.row($(this).parents('tr')).data();
      component.selectedState = data;
      console.dir(data);
    };
  }

  selectSecondItem(component: any) {
    return function() {
      const data = component.tableState.row($(this).parents('tr')).data();
      component.selectedState = data;
    };
  }

  addState(state: State) {
    this.states.push(state);
    this.tableState.draw();
  }

  deleteState(state: State) {
    this.states = this.states.filter(v => v.id !== state.id);
    this.tableState.draw();
  }

  editState(state: State) {
    this.states[this.states.findIndex(i => i.id === state.id)] = state;
    this.tableState.draw();
  }
}
