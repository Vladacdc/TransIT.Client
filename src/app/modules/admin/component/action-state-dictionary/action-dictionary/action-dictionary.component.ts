import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';

@Component({
  selector: 'app-action-dictionary',
  templateUrl: './action-dictionary.component.html',
  styleUrls: ['./action-dictionary.component.scss']
})
export class ActionDictionaryComponent implements OnInit {
  columnDefinitions: string[] = [
    'name'
  ];
  columnNames: string[] = [
    'Назва'
  ]

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<ActionType>;

  constructor(private actionTypeService: ActionTypeService) { }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<ActionType>(this.actionTypeService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
