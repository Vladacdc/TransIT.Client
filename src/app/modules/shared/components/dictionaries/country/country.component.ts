import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  country: Country;

  columnDefinitions: string[] = [
    'name'
  ];
  columnNames: string[] = [
    'Назва країни'
  ];

  @ViewChild('table') table: MatFspTableComponent;
  @ViewChild('actionsTemplate') actionsTemplate: any;
  @ViewChild('generalTemplate') generalTemplate: any;

  dataSource: EntitiesDataSource<Country>;

  constructor(
    private countryService: CountryService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Country>(this.countryService);
    if (this.authenticationService.getRole() === 'ADMIN') {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
