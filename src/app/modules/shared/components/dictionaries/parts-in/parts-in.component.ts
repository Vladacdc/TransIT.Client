import { Component, Inject, OnInit } from '@angular/core';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { PartIn } from '../../../models/part-in';
import { PartsInService } from '../../../services/parts-in.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPartInComponent } from './dialogs/add-part-in/add-part-in.component';
import { Observable, empty, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { CurrencyService } from '../../../services/currency.service';
import { SpinnerService } from 'src/app/modules/core/services/spinner.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private partsInService: PartsInService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<PartIn>(this.partsInService);
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddPartInComponent, { width: '500px', data: {} });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.withSpinner(this.partsInService.addEntity(dialogResult)).subscribe(
          () => this.toastrService.success('TODO: Ok'),
          () => this.toastrService.error('TODO: Error adding entity')
        );
      }
    });
  }

  private withSpinner(request: Observable<PartIn>): Observable<PartIn> {
    return request.pipe(
      tap(() => this.spinnerService.show()),
      map(data => data),
      tap(() => this.spinnerService.hide())
    );
  }
}
