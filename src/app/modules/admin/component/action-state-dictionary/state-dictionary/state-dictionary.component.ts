import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from 'src/app/modules/shared/models/state';
import { StateService } from 'src/app/modules/shared/services/state.service';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';

@Component({
  selector: 'app-state-dictionary',
  templateUrl: './state-dictionary.component.html',
  styleUrls: ['./state-dictionary.component.scss']
})
export class StateDictionaryComponent implements OnInit {
  state: State;

  columnDefinitions: string[] = [
    'transName'
  ];
  columnNames: string[] = [
    'Назва'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<State>;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<State>(this.stateService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
