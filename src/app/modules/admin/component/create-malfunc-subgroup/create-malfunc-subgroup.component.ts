import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from '../../services/malfunc-group.service';
import { MalfunSubgroup } from '../../models/malfun-subgroup/malfun-subgroup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfunSubgroupService } from '../../services/malfun-subgroup.service';


@Component({
  selector: 'app-create-malfunc-subgroup',
  templateUrl: './create-malfunc-subgroup.component.html',
  styleUrls: ['./create-malfunc-subgroup.component.scss']
})
export class CreateMalfuncSubgroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createMalfuncSubgroup = new EventEmitter<MalfunSubgroup>();
  subGroupForm: FormGroup;
  malfuncGroupList: MalfuncGroup[];  

  constructor(private serviceMalfuncGroup: MalfuncGroupService, private serviceMalfuncSubGroup: MalfunSubgroupService, private formBuilder: FormBuilder) { }


  ngOnInit() {    
    $('#createSubgroup').on('hidden.bs.modal', function () {
      $(this).find('form').trigger('reset');
    });
    this.subGroupForm = this.formBuilder.group({
      group: ['', Validators.required],
      subgroup: ''
    });
    this.serviceMalfuncGroup.getEntities().subscribe(group => {
      (this.malfuncGroupList = group);
    });
  }
  clickSubmit() {
    if (this.subGroupForm.invalid) {
      return;
    }
    const form = this.subGroupForm.value;
    const malfunSubGroup: MalfunSubgroup = {
      id: 0,
      name: form.subgroup as string,
      malfunctionGroup: this.malfuncGroupList[this.malfuncGroupName.findIndex(f => f === form.group)]
    };
    console.log("kok");
    console.log(form.name);
    this.serviceMalfuncSubGroup.addEntity(malfunSubGroup).subscribe(x => {
      this.createMalfuncSubgroup.next(malfunSubGroup);      
    });
    this.closeDiv.nativeElement.click();
  }

  get malfuncGroupName(): string[] {
    return this.malfuncGroupList.map(e => e.name);
  }
}
