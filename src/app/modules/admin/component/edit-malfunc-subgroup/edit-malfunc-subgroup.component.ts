import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MalfunSubgroup } from '../../models/malfun-subgroup/malfun-subgroup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from '../../services/malfunc-group.service';
import { MalfunSubgroupService } from '../../services/malfun-subgroup.service';


@Component({
  selector: 'app-edit-malfunc-subgroup',
  templateUrl: './edit-malfunc-subgroup.component.html',
  styleUrls: ['./edit-malfunc-subgroup.component.scss']
})
export class EditMalfuncSubgroupComponent implements OnInit {
  subGroupForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set malfunSubGroup(malfuncSubGroup: MalfunSubgroup) {
    if (!malfuncSubGroup) {
      return;
    }
    this.subGroupForm.patchValue({ ...malfuncSubGroup, group: malfuncSubGroup.malfunctionGroup.name });
    console.log("tytytyt");
    console.log(this.subGroupForm);
  }
  @Output() updateSubGroup = new EventEmitter<MalfunSubgroup>();

  malfunctionGroups: MalfuncGroup[] = [];

  constructor(private formBuilder: FormBuilder, private serviceMalfuncGroup: MalfuncGroupService, private serviceMalfuncSubGroup: MalfunSubgroupService) { }

  ngOnInit() {
    this.subGroupForm = this.formBuilder.group({
      id: '',
      name: '',
      group: ['', Validators.required]
    });
    this.serviceMalfuncGroup.getEntities().subscribe(group => {
      (this.malfunctionGroups = group);
      console.log("grupa");
      console.log(this.malfunctionGroups);
    });
  }
  updateData() {
    if (this.subGroupForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.subGroupForm.value;
    console.log("ididididi");
    console.log(form.id);
    const malfunSubGroup: MalfunSubgroup = {
      id: form.id as number,
      name: form.subgroup as string,
      malfunctionGroup: this.malfunctionGroups.find(f => f.name === form.group)
    };
    this.serviceMalfuncSubGroup.updateEntity(malfunSubGroup).subscribe(x => this.updateSubGroup.next(malfunSubGroup));
  }

}
