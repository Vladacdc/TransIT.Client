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
  @Output() refresh_edit:EventEmitter<any>=new EventEmitter();

  userForm: FormGroup;
  private malfuncGroup_:MalfuncGroup;


  constructor(private formBuilder: FormBuilder,private serviceUser: MalfuncGroupService) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: '',
      name: ''
    });
  }

  refreshClick(){
    this.refresh_edit.emit(this.malfuncGroup_);
  }

  updateData() {
    if (this.userForm.invalid) {
      return;
    }
    console.log(this.userForm.value);
    this.closeDiv.nativeElement.click();
    const form = this.userForm.value;
    const malfuncGroup: MalfuncGroup = {
      id: form.id as number,
      name: form.name as string
    };
    console.log(malfuncGroup);
    this.malfuncGroup_=malfuncGroup;
    this.serviceUser.updateEntity(malfuncGroup).subscribe(_ => this.updateMalfuncGroup.next(malfuncGroup));
  }
}


