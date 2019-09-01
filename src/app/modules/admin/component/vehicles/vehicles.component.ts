import { Component, OnInit, ViewChild} from '@angular/core';
import { EntitiesDataSource } from '../../../shared/data-sources/entities-data-sourse';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicle: Vehicle;

  columnDefinitions: string[] = [
    'vehicleTypeName',
    'vincode',
    'inventoryId',
    'regNum',
    'brand',
    'model',
    'locationName',
    'commissioningDate',
    'warrantyEndDate'
  ];
  columnNames: string[] = [
    'Тип транспорту',
    'Вінкод',
    'Інвентарний номер',
    'Реєстраційний номер',
    'Бренд',
    'Модель',
    'Місцезнаходження',
    'Дата введення в експлуатацію',
    'Закінчення гарантійного терміну'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Vehicle>;


  constructor(private router: Router, private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Vehicle>(this.vehicleService);
  }

  addVehicle(vehicle: Vehicle) {
    this.table.loadEntitiesPage();
  }

  deleteVehicle(vehicle: Vehicle) {
    this.table.loadEntitiesPage();
  }

  updateVehicle(vehicle: Vehicle) {
    this.table.loadEntitiesPage();
  }

  infoVehicle(vehicle: Vehicle) {
    this.table.loadEntitiesPage();
    this.router.navigate(['admin/info-vehicle', {id: vehicle.id}]);
  }
}
