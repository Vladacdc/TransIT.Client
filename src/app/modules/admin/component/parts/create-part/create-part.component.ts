import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { Part } from 'src/app/modules/shared/models/part';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { UniqueFieldValidator } from 'src/app/modules/shared/validators/unique-field-validator';
import { Manufacturer } from 'src/app/modules/shared/models/manufacturer';
import { Unit } from 'src/app/modules/shared/models/unit';
import { ManufacturerService } from 'src/app/modules/shared/services/manufacturer.service';
import { UnitService } from 'src/app/modules/shared/services/unit.service';

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.scss']
})
export class CreatePartComponent implements OnInit {
  manufacturers : Array<Manufacturer>;
  units : Array<Unit>;

  private readonly stringFieldValidators: Validators[] = [
    Validators.required,
    Validators.minLength(0),
    Validators.maxLength(60),
  ];
  readonly customFieldErrors = NAME_FIELD_ERRORS;

  @Output() addPart = new EventEmitter<Part>();
  partForm: FormGroup;

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

  get Manufacturers(): string[] {
    return this.manufacturers.map(e => e.name);
  }
  get Units(): string[] {
    return this.units.map(e => e.name);
  }

  onSubmit() {
    if (this.partForm.invalid) {
      return;
    }

    this.createPart();
    this.hideModalWindow();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.hideModalWindow();
    this.setUpForm();
  }

  private setUpForm() {
    this.partForm = this.fb.group({
      name: [undefined, this.stringFieldValidators],
      code: [undefined, this.stringFieldValidators],
      manufacturer: [undefined],
      unit: [undefined]
    });
  }

  private createPart() {
    const part = new Part(this.formValue);
    this.partService.addEntity(part).subscribe(
      newPart => {
        this.addPart.next(newPart);
        this.toast.success('', 'Запчастину створено');
      },
      _ => this.toast.error('Не вдалось створити Запчастину', 'Помилка створення запчастини')
    );
  }

  private hideModalWindow() {
    const modalWindow: any = $('#createPart');
    modalWindow.modal('hide');
  }

  private get formValue() {
    return this.partForm.value;
  }
}
