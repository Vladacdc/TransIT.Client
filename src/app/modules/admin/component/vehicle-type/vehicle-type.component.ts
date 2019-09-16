import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements OnInit {

  columnDefinitions: string[] = [
    'name'
  ];
  columnNames: string[] = [
    'Тип транспорту'
  ]

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<VehicleType>;

  constructor(private vehicleTypeService: VehicleTypeService) { }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<VehicleType>(this.vehicleTypeService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
