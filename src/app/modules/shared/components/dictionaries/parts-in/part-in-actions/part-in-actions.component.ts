import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PartIn } from 'src/app/modules/shared/models/part-in';
import { PartsInService } from 'src/app/modules/shared/services/parts-in.service';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { SpinnerService } from 'src/app/modules/core/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Currency } from 'src/app/modules/shared/models/currency';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-part-in-actions',
  templateUrl: './part-in-actions.component.html',
  styleUrls: ['./part-in-actions.component.scss']
})
export class PartInActionsComponent implements OnInit {

  @Input() partIn: PartIn;

  constructor(
    private partsInService: PartsInService,
    private currencyService: CurrencyService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
    // TODO: uncomment when these services will be implemented
    // this.unitService.getEntities().subscribe(data => {
    //   this.units = data;
    // });
    // this.partService.getEntities().subscribe(data => {
    //   this.parts = data;
    // });
  }

  private withSpinner(request: Observable<PartIn>): Observable<PartIn> {
    return request.pipe(
      tap(() => this.spinnerService.show()),
      map(data => data),
      tap(() => this.spinnerService.hide())
    );
  }

  finishEditItem(item: PartIn) {
    this.withSpinner(this.partsInService.updateEntity(this.partIn))
      .subscribe(
        () => this.toastrService.success('TODO: Successfully edited'),
        () => this.toastrService.error('TODO: General Error')
      );
  }

  removeItem(entity: PartIn) {
    this.withSpinner(this.partsInService.deleteEntity(this.partIn.id))
      .subscribe(
        () => this.toastrService.success('TODO: Succesfully deleted'),
        () => this.toastrService.error('TODO: General Error')
      );
  }
}
