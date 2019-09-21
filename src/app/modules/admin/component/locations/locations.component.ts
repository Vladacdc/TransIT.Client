import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Location } from 'src/app/modules/shared/models/location';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  location:Location;
  columnDefinitions: string[] = [
    'name',
    'description',
  ];
  columnNames: string[] = [
    'Admin.Location.Name',
    'Admin.Location.Description',
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Location>;

  constructor(private locationService: LocationService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Location>(this.locationService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
