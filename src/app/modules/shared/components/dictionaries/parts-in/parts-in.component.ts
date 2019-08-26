import { Component, OnInit } from '@angular/core';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { PartIn } from '../../../models/part-in';
import { PartsInService } from '../../../services/parts-in.service';
import { Observable, of, throwError } from 'rxjs';
import { SpinnerService } from 'src/app/modules/core/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { tap, map, catchError } from 'rxjs/operators';
import { Currency } from '../../../models/currency';
import { CurrencyService } from '../../../services/currency.service';

@Component({
  selector: 'app-parts-in',
  templateUrl: './parts-in.component.html',
  styleUrls: ['./parts-in.component.scss']
})
export class PartsInComponent implements OnInit {

  columnDefinitions: string[] = [
    'price',
    'amount',
    'batch',
    'partName',
    'arrivalDate',
    'unitName',
    'currencyName',
  ];

  dataSource: EntitiesDataSource<PartIn>;
  currencies: Currency[];

  constructor(
    private partsInService: PartsInService,
    private currencyService: CurrencyService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<PartIn>(this.partsInService);
    // Loading data
    this.currencyService.getEntities().subscribe(data => {
      this.currencies = data;
    });
  }

  private decorateRequest(request: Observable<PartIn>): Observable<PartIn> {
    return request.pipe(
      tap(() => this.spinnerService.show()),
      map(data => data),
      tap(() => this.spinnerService.hide())
    );
  }

  addEntity(entity: PartIn) {
    this.decorateRequest(this.partsInService.addEntity(entity))
      .subscribe(
        ok => this.toastrService.success(),
        error => this.toastrService.error('TODO: Error adding entity')
      );
  }

  editEntity(entity: PartIn) {
    this.decorateRequest(this.partsInService.updateEntity(entity))
      .subscribe(
        ok => this.toastrService.success('TODO: Successfully edited'),
        error => this.toastrService.error('TODO: General Error')
      );
  }

  deleteEntity(entity: PartIn) {
    this.decorateRequest(this.partsInService.deleteEntity(entity.id))
      .subscribe(
        ok => this.toastrService.success('TODO: Succesfully deleted'),
        error => this.toastrService.error('TODO: General Error')
      );
  }
}
