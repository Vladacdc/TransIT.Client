import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';

@Component({
  selector: 'app-edit-malfunc-subgroup',
  templateUrl: './edit-malfunc-subgroup.component.html',
  styleUrls: ['./edit-malfunc-subgroup.component.scss']
})
export class EditMalfuncSubgroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set malfunctionSubGroup(malfunctionSubGroup: MalfunctionSubgroup) {
    if (!malfunctionSubGroup) {
      return;
    }
    this.subGroupForm.patchValue({
      ...malfunctionSubGroup,
      group: malfunctionSubGroup.malfunctionGroup.name
    });
  }
  @Output() editMalfuncSubGroup = new EventEmitter<MalfunctionSubgroup>();

  subGroupForm: FormGroup;

  malfunctionGroups: MalfunctionGroup[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceMalfuncGroup: MalfunctionGroupService,
    private serviceMalfuncSubGroup: MalfunctionSubgroupService
  ) {}

  ngOnInit() {
    this.subGroupForm = this.formBuilder.group({
      id: '',
      name: '',
      group: ['', Validators.required]
    });
    this.serviceMalfuncGroup.getEntities().subscribe(group => {
      this.malfunctionGroups = group;
    });
  }
  updateData() {
    if (this.subGroupForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.subGroupForm.value;
    const malfunSubGroup: MalfunctionSubgroup = {
      id: form.id as number,
      name: form.name as string,
      malfunctionGroup: this.malfunctionGroups.find(f => f.name === form.group)
    };
    this.serviceMalfuncSubGroup
      .updateEntity(malfunSubGroup)
      .subscribe(_ => this.editMalfuncSubGroup.next(malfunSubGroup));
  }
}
