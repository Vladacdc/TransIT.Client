import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { Unit } from 'src/app/modules/shared/models/unit';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent implements OnInit {
  columnDefinitions: string[] = [
    'name',
    'shortname',
  ];
  columnNames: string[];

  dataSource: EntitiesDataSource<Unit>;

  constructor(private unitService: UnitService, private translate: TranslateService) {
  }

  ngOnInit() {

  }
}
