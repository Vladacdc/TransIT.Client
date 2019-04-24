import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MalfuncGroupService } from '../../services/malfunc-group.service';

@Component({
  selector: 'app-edit-malfunc-group',
  templateUrl: './edit-malfunc-group.component.html',
  styleUrls: ['./edit-malfunc-group.component.scss']
})
export class EditMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set malfuncGroup(malfuncGroup: MalfuncGroup) {
    if (!malfuncGroup) {
      return;
    }
    this.userForm.patchValue({ ...malfuncGroup});
  }
  @Output() updateMalfuncGroup = new EventEmitter<MalfuncGroup>();

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder,private serviceMalfunctionGroupService: MalfuncGroupService) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: '',
      name: ''
    });
  }

  updateData() {
    if (this.userForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.userForm.value;
    const malfuncGroup: MalfuncGroup = {
      id: form.id as number,
      name: form.name as string
    };
    console.log(malfuncGroup);
    this.serviceMalfunctionGroupService.updateEntity(malfuncGroup).subscribe(_ => this.updateMalfuncGroup.next(malfuncGroup));
  }
}


