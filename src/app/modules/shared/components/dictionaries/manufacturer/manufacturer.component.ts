import { Component, OnInit, ViewChild } from '@angular/core';
import { ManufacturerService } from 'src/app/modules/shared/services/manufacturer.service';
import { Manufacturer } from 'src/app/modules/shared/models/manufacturer';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {
  manufacturer: Manufacturer;

  columnDefinitions: string[] = [
    'name',
  ];
  columnNames: string[] = [
    'Manufacturer.name',
  ];

  @ViewChild('actionsTemplate') actionsTemplate: any;
  @ViewChild('generalTemplate') generalTemplate: any;
  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Manufacturer>;

  constructor(private manufacturerService: ManufacturerService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Manufacturer>(this.manufacturerService);
    
    if (this.authenticationService.getRole() === 'ADMIN' ) {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  refreshTable() { 
    this.table.loadEntitiesPage();
  }
}
