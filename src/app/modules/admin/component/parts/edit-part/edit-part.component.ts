import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Part } from 'src/app/modules/shared/models/part';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { ToastrService } from 'ngx-toastr';
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
  selectedPart: Part;
  manufacturers: Array<Manufacturer>;
  units: Array<Unit>;
  partForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Output() updatePart = new EventEmitter<Part>();
  @Input()
  set part(part: Part) {
    if (!part) {
      return;
    }
    this.selectedPart = new Part(part);
  }

   constructor(
    private unitService: UnitService,
    private manufacturerService: ManufacturerService,
    private formBuilder: FormBuilder,
    private service: PartService,
    private toast: ToastrService
  ) {}

   ngOnInit() {
    this.partForm = this.formBuilder.group({
      id: [''],
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      code: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      manufacturer: [''],
      unit: ['']
    });
    this.partForm.patchValue(this.selectedPart);

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

   updateData() {
    if (this.partForm.invalid) {
      return;
    }
    const form = this.partForm.value;
    const part: Part = {
      id: form.id as number,
      name: form.name as string,
      code: form.code as string,
      unit: form.unit as Unit,
      manufacturer: form.manufacturer as Manufacturer
    };

    this.service.updateEntity(part).subscribe(
      _ => {
        this.toast.success('', 'Запчастину оновлено');
        this.updatePart.next(part);
      },
      error => this.toast.error('Помилка редагування')
    );
    this.closeDivClick();
  }

  private closeDivClick() {
    this.closeDiv.nativeElement.click();
  }

   resetForm() {
    this.partForm.patchValue(this.selectedPart);
  }
}
