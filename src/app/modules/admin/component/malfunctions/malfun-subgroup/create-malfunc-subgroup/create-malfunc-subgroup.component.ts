import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';

@Component({
  selector: 'app-create-malfunc-subgroup',
  templateUrl: './create-malfunc-subgroup.component.html',
  styleUrls: ['./create-malfunc-subgroup.component.scss']
})
export class CreateMalfuncSubgroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createMalfuncSubGroup = new EventEmitter<MalfunctionSubgroup>();
  subGroupForm: FormGroup;
  malfuncGroupList: MalfunctionGroup[];

  constructor(
    private serviceMalfuncGroup: MalfunctionGroupService,
    private serviceMalfuncSubGroup: MalfunctionSubgroupService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    $('#createSubgroup').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.subGroupForm = this.formBuilder.group({
      group: ['', Validators.required],
      subgroup: ['', Validators.required]
    });
    this.serviceMalfuncGroup.getEntities().subscribe(group => {
      this.malfuncGroupList = group;
    });
  }

  get malfuncGroupName(): string[] {
    return this.malfuncGroupList.map(e => e.name);
  }

  clickAddMalfunctionSubGroup() {
    this.serviceMalfuncGroup.getEntities().subscribe(group => {
      this.malfuncGroupList = group;
    });
  }

  clickSubmit() {
    if (this.subGroupForm.invalid) {
      return;
    }
    const form = this.subGroupForm.value;
    const malfunSubGroup: MalfunctionSubgroup = {
      id: 0,
      name: form.subgroup as string,
      malfunctionGroup: this.malfuncGroupList[this.malfuncGroupName.findIndex(f => f === form.group)]
    };
    this.serviceMalfuncSubGroup.addEntity(malfunSubGroup).subscribe(x => {
      this.createMalfuncSubGroup.next(x);
    });
    this.closeDiv.nativeElement.click();
  }
}
