import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Part } from 'src/app/modules/shared/models/part';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { ManufacturerService } from 'src/app/modules/shared/services/manufacturer.service';
import { Unit } from 'src/app/modules/shared/models/unit';
import { Manufacturer } from 'src/app/modules/shared/models/manufacturer';

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.scss']
})
export class CreatePartComponent implements OnInit {
  partForm: FormGroup;
  manufacturers: Array<Manufacturer>;
  units: Array<Unit>;
  currentManufacturer: Manufacturer;
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createPart = new EventEmitter<Part>();

  constructor(
    private unitService: UnitService,
    private manufacturerService: ManufacturerService,
    private service: PartService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    $('#createPart').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.partForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      code: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      manufacturer: [''],
      unit: [''],
    });
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

  clickSubmit() {
    if (this.partForm.invalid) {
      return;
    }
    const form = this.partForm.value;
    const part: Part = {
      id: 0,
      name: form.name as string,
      code: form.code as string,
      unit: form.unit as Unit,
      manufacturer: form.manufacturer as Manufacturer,
    };

    this.service.addEntity(part).subscribe(newGroup => this.createPart.next(newGroup));
    this.closeCreateModal.nativeElement.click();
  }
}
