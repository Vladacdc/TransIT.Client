import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartIn } from 'src/app/modules/shared/models/part-in';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { Currency } from 'src/app/modules/shared/models/currency';

@Component({
  selector: 'app-add-part-in',
  templateUrl: './add-part-in.component.html',
  styleUrls: ['./add-part-in.component.scss']
})
export class AddPartInComponent implements OnInit {

  form: FormGroup;
  maxDate = new Date();
  // TODO: replace this with a service call, when it will be implemented
  unitList = [{ shortName: 'Шт.'}, { shortName: 'М.' }];
  partList = [{ name: 'Артек Шоколадний' }, { name: 'Артек Горіховий' }, { name: 'Артек Класичний' }];
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

    this.form = this.builder.group({
      arrivalDate: new FormControl(null, [Validators.required]),
      batch: new FormControl('', [Validators.required, Validators.pattern('^[0-9A-Za-zА-Яа-яїієЇІЯЄ]+$')]),
      price: new FormControl(null, [Validators.required, Validators.min(0.0000001)]),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      unit: new FormControl(null, [Validators.required]),
      part: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.dialogRef.close(new PartIn(this.form.value));
  }

  onNoClick(): void {
    this.form.reset();
    this.dialogRef.close(null);
  }
}
