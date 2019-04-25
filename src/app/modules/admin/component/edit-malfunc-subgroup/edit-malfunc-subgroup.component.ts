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
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set malfunctionSubGroup(malfunctionSubGroup: MalfunSubgroup) {
    console.log('please!!!!!!!!');
    if (!malfunctionSubGroup) {
      return;
    }
    this.subGroupForm.patchValue({
      ...malfunctionSubGroup,
      group: malfunctionSubGroup.malfunctionGroup.name
    });
  }
  @Output() editMalfuncSubGroup = new EventEmitter<MalfunSubgroup>();

  subGroupForm: FormGroup;

  malfunctionGroups: MalfuncGroup[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceMalfuncGroup: MalfuncGroupService,
    private serviceMalfuncSubGroup: MalfunSubgroupService
  ) {}

  ngOnInit() {
    console.log('go toooooo');
    this.subGroupForm = this.formBuilder.group({
      id: '',
      name: '',
      group: ['', Validators.required]
    });
    this.serviceMalfuncGroup.getEntities().subscribe(group => {
      this.malfunctionGroups = group;
      console.log('grupaaaaaaaa123');
      console.log(this.malfunctionGroups);
    });
  }
  updateData() {
    if (this.subGroupForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.subGroupForm.value;
    console.log('ididididi');
    console.log(form.id);
    const malfunSubGroup: MalfunSubgroup = {
      id: form.id as number,
      name: form.name as string,
      malfunctionGroup: this.malfunctionGroups.find(f => f.name === form.group)
    };

    this.serviceMalfuncSubGroup
      .updateEntity(malfunSubGroup)
      .subscribe(() => this.editMalfuncSubGroup.next(malfunSubGroup));
    console.log('go to method eeeddit');
  }
}
