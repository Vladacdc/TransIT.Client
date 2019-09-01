import { OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartIn } from 'src/app/modules/shared/models/part-in';
import { FormGroup } from '@angular/forms';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { Currency } from 'src/app/modules/shared/models/currency';
import { PartInFormGroup } from './part-in-formgroup';
import { Unit } from 'src/app/modules/shared/models/unit';
import { Part } from 'src/app/modules/shared/models/part';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';

export class BaseDialogComponent<TComponent> implements OnInit {

  form: FormGroup;

  unitList: Unit[] = [];
  partList: Part[] = [];
  currencyList: Currency[] = [];

  constructor(
    protected currencyService: CurrencyService,
    protected unitService: UnitService,
    protected partService: PartService,
    public dialogRef: MatDialogRef<TComponent>) {}

  comparer(partin1: any, partin2: any): boolean {
    return partin1.id === partin2.id;
  }

  ngOnInit() {
    this.currencyService.getEntities().subscribe(data => {
      this.currencyList = data;
    });
    this.partService.getEntities().subscribe(data => {
      this.partList = data;
    });
    this.unitService.getEntities().subscribe(data => {
      this.unitList = data;
    });

    this.form = new PartInFormGroup();
  }

  onNoClick(): void {
    this.form.reset();
    this.dialogRef.close(null);
  }
}
