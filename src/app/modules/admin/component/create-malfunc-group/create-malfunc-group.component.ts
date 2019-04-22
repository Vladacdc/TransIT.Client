import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MalfuncGroupService } from '../../services/malfunc-group.service';

@Component({
  selector: 'app-create-malfunc-group',
  templateUrl: './create-malfunc-group.component.html',
  styleUrls: ['./create-malfunc-group.component.scss']
})
export class CreateMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() refresh_add:EventEmitter<any>=new EventEmitter();
  @Output() createMalfuncGroup = new EventEmitter<MalfuncGroup>();
  malfuncGroupForm: FormGroup;
  private malfuncGroup_:MalfuncGroup;
  
  constructor(private serviceMalfuncGroup: MalfuncGroupService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    $('#createGroup').on('hidden.bs.modal', function() {
      $(this).find('form').trigger('reset');
    });
    this.malfuncGroupForm = this.formBuilder.group({
      name: ''
    });
  }

  refreshClick(){
    this.refresh_add.emit(this.malfuncGroup_);
  }
  
  clickSubmit() {
    if (this.malfuncGroupForm.invalid) {
      return;
    }
    const form = this.malfuncGroupForm.value;
    const malfuncGroup: MalfuncGroup = {
      id: 0,
      name: form.name as string
    };
    this.malfuncGroup_=malfuncGroup;
    this.serviceMalfuncGroup.addEntity(malfuncGroup).subscribe(_ => this.createMalfuncGroup.next(malfuncGroup));
    this.closeDiv.nativeElement.click();
  }
}
