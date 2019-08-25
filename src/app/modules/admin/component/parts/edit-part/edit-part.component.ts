import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { Part } from 'src/app/modules/shared/models/part';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { ManufacturerService } from 'src/app/modules/shared/services/manufacturer.service';
import { Unit } from 'src/app/modules/shared/models/unit';
import { Manufacturer } from 'src/app/modules/shared/models/manufacturer';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss']
})
export class EditPartComponent implements OnInit {
  manufacturers : Array<Manufacturer>;
  units : Array<Unit>;
  partForm: FormGroup;
  _part: Part;

  private readonly stringFieldValidators: Validators[] = [
    Validators.required,
    Validators.minLength(0),
    Validators.maxLength(60),
  ];
  readonly customFieldErrors = NAME_FIELD_ERRORS;

  @Output() editPart = new EventEmitter<Part>();
  @Input()
  set part(part: Part) {
    if (!part) {
      return;
    }
    this._part = new Part(part);
    this.setUpForm();
  }

  constructor(
    private fb: FormBuilder, 
    private partService: PartService, 
    private manufacturerService: ManufacturerService,
    private unitService: UnitService,
    private toast: ToastrService) {}

  ngOnInit() {
    this.setUpForm();
    this.manufacturerService.getEntities().subscribe(data => {
      this.manufacturers = data;
    });
    this.unitService.getEntities().subscribe(data => {
      this.units = data;
    });
  }

  onSubmit() {
    if (this.partForm.invalid) {
      return;
    }

    this.updatePart();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.setUpForm();
  }

  get Manufacturers(): string[] {
    return this.manufacturers.map(e => e.name);
  }
  get Units(): string[] {
    return this.units.map(e => e.name);
  }

  private setUpForm() {
    this.partForm = this.fb.group({
      name: [this._part && this._part.name, this.stringFieldValidators],
      code: [this._part && this._part.code, this.stringFieldValidators],
      manufacturer: [this._part && this._part.manufacturer],
      unit: [this._part && this._part.unit]
    });
  }
 
  private updatePart() {
    const part = new Part({ ...this._part, ...this.formValue });
    this.partService
      .updateEntity(part)
      .subscribe(
        updatedPart => this.editPart.next(updatedPart),
        _ => this.toast.error('Не вдалось оновити запчастину', 'Помилка оновлення запчастини')
      );
  }

  private get formValue() {
    return this.partForm.value;
  }
}
