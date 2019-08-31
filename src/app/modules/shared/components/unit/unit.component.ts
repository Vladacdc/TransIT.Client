import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { Unit } from 'src/app/modules/shared/models/unit';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../tables/mat-fsp-table/mat-fsp-table.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  columnDefinitions: string[] = [
    'name',
    'shortname',
  ];
  columnNames: string[] = [
      'Unit.name',
      'Unit.shortname'
  ];


  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Unit>;

  constructor(private unitService: UnitService, private translate: TranslateService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Unit>(this.unitService);
  }

  addUnit(unit: Unit) {
    this.table.loadEntitiesPage();
  }

  deleteUnit(unit: Unit) {
    this.table.loadEntitiesPage();
  }

  updateUnit(unit: Unit) {
    this.table.loadEntitiesPage();
  }
}
