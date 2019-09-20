import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { Unit } from 'src/app/modules/shared/models/unit';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  isAdmin: boolean;
  columnDefinitions: string[] = [
    'name',
    'shortName',
  ];
  columnNames: string[] = [
      'Unit.name',
      'Unit.shortName'
  ];

  @ViewChild('actionsTemplate') actionsTemplate: any;
  @ViewChild('generalTemplate') generalTemplate: any;
  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Unit>;

  constructor(private unitService: UnitService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Unit>(this.unitService);
    this.isAdmin = this.authenticationService.getRole() === 'ADMIN' ? true : false;
    if (this.isAdmin) {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  refreshTable() { 
    this.table.loadEntitiesPage();
  }
}
