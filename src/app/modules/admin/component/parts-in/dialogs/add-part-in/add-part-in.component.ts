import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { PartIn } from 'src/app/modules/shared/models/part-in';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { BaseDialogComponent } from '../../common/dialog-component';

@Component({
  selector: 'app-add-part-in',
  templateUrl: './add-part-in.component.html',
  styleUrls: ['../../common/dialogs.scss']
})
export class AddPartInComponent extends BaseDialogComponent<AddPartInComponent> implements OnInit {

  constructor(
    protected currencyService: CurrencyService,
    protected unitService: UnitService,
    protected partService: PartService,
    public dialogRef: MatDialogRef<AddPartInComponent>) {
      super(currencyService,
            unitService,
            partService,
            dialogRef);
    }

  onSubmit() {
    this.dialogRef.close(new PartIn(this.form.value));
  }
}
