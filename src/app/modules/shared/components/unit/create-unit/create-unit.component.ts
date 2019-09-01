import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { Unit } from 'src/app/modules/shared/models/unit';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent implements OnInit {
  unitForm: FormGroup;
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createUnit = new EventEmitter<Unit>();

  constructor(
    private unitService: UnitService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.unitForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
      shortName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    });
  }

  clickSubmit() {
    if (this.unitForm.invalid) {
      return;
    }
    const form = this.unitForm.value;
    const unit: Unit = {
      id: 0,
      name: form.name as string,
      shortName: form.shortName as string,
    };

    this.unitService.addEntity(unit).subscribe(newGroup => {
      this.createUnit.next(newGroup);
      this.toast.success('', this.translate.instant('Unit.Toasts.Created'));
    },
    error => {
      this.toast.error('', this.translate.instant('Unit.Toasts.Error'));
    });
    this.closeCreateModal.nativeElement.click();
  }
}
