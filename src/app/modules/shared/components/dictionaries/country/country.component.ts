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

  columnDefinitions: string[] = [
    'name'
  ];
  columnNames: string[] = [
    'Назва країни'
  ];
  ableToCreate = false;

  @ViewChild('table') table: MatFspTableComponent;
  @ViewChild('actionsTemplate') template: any;

  dataSource: EntitiesDataSource<Country>;

  constructor(
    private countryService: CountryService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Country>(this.countryService);
    if (this.authenticationService.getRole() === 'ADMIN') {
      this.ableToCreate = true;
      this.table.actionContentTemplate = this.template;
    }
  }

  addСountry(country: Country) {
    this.table.loadEntitiesPage();
  }
  deleteСountry(country: Country) {
    this.table.loadEntitiesPage();
  }
}
