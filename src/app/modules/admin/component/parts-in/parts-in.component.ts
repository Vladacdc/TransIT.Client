import { PartsInService } from '../../../shared/services/parts-in.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { EntitiesDataSource } from '../../../shared/data-sources/entities-data-sourse';
import { PartIn } from '../../../shared/models/part-in';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';
import { MatDialog } from '@angular/material';
import { AddPartInComponent } from './dialogs/add-part-in/add-part-in.component';

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
  completed = new BehaviorSubject<void>(null);

  constructor(
    private partsInService: PartsInService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<PartIn>(this.partsInService);
  }

  onCompleted() {
    this.completed.next();
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddPartInComponent, { width: '500px', data: {} });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.withSpinner(this.partsInService.addEntity(dialogResult)).subscribe(
          () => {
            this.onCompleted();
            // return this.toastrService.success('TODO: Ok');
          },
          () => {
            this.toastrService.error('TODO: Error adding entity');
          }
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
