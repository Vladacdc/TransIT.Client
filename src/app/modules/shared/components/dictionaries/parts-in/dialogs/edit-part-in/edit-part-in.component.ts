import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartIn } from 'src/app/modules/shared/models/part-in';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { BaseDialogComponent } from '../../common/dialog-component';

@Component({
  selector: 'app-edit-part-in',
  templateUrl: './edit-part-in.component.html',
  styleUrls: ['../../common/dialogs.scss']
})
export class EditPartInComponent extends BaseDialogComponent<EditPartInComponent> implements OnInit {

  constructor(
    protected currencyService: CurrencyService,
    protected unitService: UnitService,
    protected partService: PartService,
    public dialogRef: MatDialogRef<EditPartInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartIn) {
      super(currencyService,
            unitService,
            partService,
            dialogRef);
    }

  ngOnInit() {
    super.ngOnInit();
    this.form.patchValue(this.data);
  }

  onSubmit() {
    this.dialogRef.close(new PartIn({ ...this.form.value, id: this.data.id }));
  }
}
