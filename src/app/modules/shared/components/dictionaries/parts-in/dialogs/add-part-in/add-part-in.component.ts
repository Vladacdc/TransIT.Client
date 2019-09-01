import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartIn } from 'src/app/modules/shared/models/part-in';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { Currency } from 'src/app/modules/shared/models/currency';
import { PartInFormGroup } from '../../common/part-in-formgroup';

@Component({
  selector: 'app-add-part-in',
  templateUrl: './add-part-in.component.html',
  styleUrls: ['../dialogs.scss']
})
export class AddPartInComponent implements OnInit {

  form: FormGroup;
  maxDate = new Date();
  // TODO: replace this with a service call, when it will be implemented
  unitList = [{ id: 2, shortName: 'шт'},
              { id: 1, shortName: 'м2' },
              { id: 3, shortName: 'м'},
              { id: 4, shortName: 'кг'}];
  partList = [{ id: 1, name: 'Артек Шоколадний' },
              { id: 2, name: 'Артек Горіховий' },
              { id: 3, name: 'Артек Класичний' }];
  currencyList: Currency[] = [];

  constructor(
    private builder: FormBuilder,
    private currencyService: CurrencyService,
    public dialogRef: MatDialogRef<AddPartInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartIn) {}

  ngOnInit() {
    this.currencyService.getEntities().subscribe(data => {
      this.currencyList = data;
    });

    this.form = new PartInFormGroup();
  }

  onSubmit() {
    this.dialogRef.close(new PartIn(this.form.value));
  }

  onNoClick(): void {
    this.form.reset();
    this.dialogRef.close(null);
  }
}
