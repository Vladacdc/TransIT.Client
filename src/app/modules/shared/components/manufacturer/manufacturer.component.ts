import { Component, OnInit, ViewChild } from '@angular/core';
import { ManufacturerService } from 'src/app/modules/shared/services/manufacturer.service';
import { Manufacturer } from 'src/app/modules/shared/models/manufacturer';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../tables/mat-fsp-table/mat-fsp-table.component';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {
  columnDefinitions: string[] = [
    'name',
  ];
  columnNames: string[] = [
      'Manufacturer.name',
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Manufacturer>;

  constructor(private manufacturerService: ManufacturerService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Manufacturer>(this.manufacturerService);
  }

  addManufacturer(manufacturer: Manufacturer) {
    this.table.loadEntitiesPage();
  }

  deleteManufacturer(manufacturer: Manufacturer) {
    this.table.loadEntitiesPage();
  }

  updateManufacturer(manufacturer: Manufacturer) {
    this.table.loadEntitiesPage();
  }
}
