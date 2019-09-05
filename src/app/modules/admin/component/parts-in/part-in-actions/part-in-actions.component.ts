import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PartIn } from 'src/app/modules/shared/models/part-in';
import { PartsInService } from 'src/app/modules/shared/services/parts-in.service';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { SpinnerService } from 'src/app/modules/core/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Currency } from 'src/app/modules/shared/models/currency';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditPartInComponent } from '../dialogs/edit-part-in/edit-part-in.component';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-part-in-actions',
  templateUrl: './part-in-actions.component.html',
  styleUrls: ['./part-in-actions.component.scss']
})
export class PartInActionsComponent implements OnInit {

  @Input() partIn: PartIn;
  @Output() completed = new EventEmitter<void>();

  constructor(
    private partsInService: PartsInService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  editItem() {
    const dialogRef = this.dialog.open(EditPartInComponent, { width: '500px', data: this.partIn });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.finishEditItem(dialogResult);
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

  finishEditItem(item: PartIn) {
    this.withSpinner(this.partsInService.updateEntity(item))
      .subscribe(
        () => {
          this.completed.next();
          // this.toastrService.success('TODO: Successfully edited');
        },
        (error) => {
          console.log(error);
          this.toastrService.error('TODO: General Error');
        }
      );
  }

  removeItem() {
    this.withSpinner(this.partsInService.deleteEntity(this.partIn.id))
      .subscribe(
        () => {
          this.completed.next();
          // this.toastrService.success('TODO: Succesfully deleted');
        },
        () => this.toastrService.error('TODO: General Error')
      );
  }
}
