import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';

@Component({
  selector: 'app-edit-malfunc-group',
  templateUrl: './edit-malfunc-group.component.html',
  styleUrls: ['./edit-malfunc-group.component.scss']
})
export class EditMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set malfuncGroup(malfuncGroup: MalfunctionGroup) {
    if (!malfuncGroup) {
      return;
    }
    this.malfunctionGroupForm.patchValue({ ...malfuncGroup });
  }
  @Output() updateMalfuncGroup = new EventEmitter<MalfunctionGroup>();

  malfunctionGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceMalfunctionGroupService: MalfunctionGroupService) {}

  ngOnInit() {
    this.malfunctionGroupForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required]
    });
  }

  updateData() {
    if (this.malfunctionGroupForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.malfunctionGroupForm.value;
    const malfuncGroup: MalfunctionGroup = {
      id: form.id as number,
      name: form.name as string
    };
    this.serviceMalfunctionGroupService
      .updateEntity(malfuncGroup)
      .subscribe(_ => this.updateMalfuncGroup.next(malfuncGroup));
  }
}
