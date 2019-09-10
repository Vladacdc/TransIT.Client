import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';

@Component({
  selector: 'app-create-malfunc-group',
  templateUrl: './create-malfunc-group.component.html',
  styleUrls: ['./create-malfunc-group.component.scss']
})
export class CreateMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createMalfuncGroup = new EventEmitter<MalfunctionGroup>();
  malfuncGroupForm: FormGroup;

  constructor(private serviceMalfuncGroup: MalfunctionGroupService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    $('#createGroup').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
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
    const malfuncGroup: MalfunctionGroup = {
      id: 0,
      name: form.name as string
    };

    this.serviceMalfuncGroup.addEntity(malfuncGroup).subscribe(newGroup => this.createMalfuncGroup.next(newGroup));
    this.closeDiv.nativeElement.click();
  }
}
