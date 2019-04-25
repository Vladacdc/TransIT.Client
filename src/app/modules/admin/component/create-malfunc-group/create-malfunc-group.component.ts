import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfuncGroupService } from '../../services/malfunc-group.service';

@Component({
  selector: 'app-create-malfunc-group',
  templateUrl: './create-malfunc-group.component.html',
  styleUrls: ['./create-malfunc-group.component.scss']
})
export class CreateMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createMalfuncGroup = new EventEmitter<MalfuncGroup>();
  malfuncGroupForm: FormGroup;
  
  constructor(private serviceMalfuncGroup: MalfuncGroupService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    $('#createGroup').on('hidden.bs.modal', function() {
      $(this).find('form').trigger('reset');
    });
    this.malfuncGroupForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
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
    this.serviceMalfuncGroup.addEntity(malfuncGroup).subscribe(newGroup => this.createMalfuncGroup.next(newGroup));
    this.closeDiv.nativeElement.click();
  }
}
