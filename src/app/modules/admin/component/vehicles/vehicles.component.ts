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
    'Shared.Vehicles.VehicleType',
    'Shared.Vehicles.VinCode',
    'Shared.Vehicles.InventoryId',
    'Shared.Vehicles.RegNum',
    'Shared.Vehicles.Brand',
    'Shared.Vehicles.Model',
    'Shared.Vehicles.Location',
    'Shared.Vehicles.CommissioningDate',
    'Shared.Vehicles.WarrantyEndDate'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Vehicle>;


  constructor(private router: Router, private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Vehicle>(this.vehicleService);
  }

  refreshTable() { 
    this.table.loadEntitiesPage();
  }

  infoVehicle(vehicle: Vehicle) {
    this.table.loadEntitiesPage();
    this.router.navigate(['admin/info-vehicle', {id: vehicle.id}]);
  }
}
