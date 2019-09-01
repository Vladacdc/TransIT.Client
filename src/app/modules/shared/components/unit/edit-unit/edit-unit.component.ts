import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Unit } from '../../../models/unit';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../../../services/unit.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {
  selectedUnit: Unit;
  unitForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Output() updateUnit = new EventEmitter<Unit>();
  @Input()
  set unit(unit: Unit) {
    if (!unit) {
      return;
    }
    this.selectedUnit = new Unit(unit);
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: UnitService,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.unitForm = this.formBuilder.group({
      id: [''],
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      shortName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
    });
    this.unitForm.patchValue(this.selectedUnit);
  }

  updateData() {
    if (this.unitForm.invalid) {
      return;
    }
    const form = this.unitForm.value;
    const unit: Unit = {
      id: form.id as number,
      name: form.name as string,
      shortName: form.shortName as string
    };

    this.service.updateEntity(unit).subscribe(
      _ => {
        this.toast.success('', this.translate.instant('Core.Toasts.Updated'));
        this.updateUnit.next(unit);
      },
      error => this.toast.error(this.translate.instant('Core.Toasts.Error'))
    );
    this.closeDiv.nativeElement.click();
  }

  resetForm() {
    this.unitForm.patchValue(this.selectedUnit);
  }
}
