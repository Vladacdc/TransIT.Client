import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkTypeService } from 'src/app/modules/shared/services/work-type.service';
import { WorkType } from 'src/app/modules/shared/models/work-type';

@Component({
    selector: 'app-work-type-create',
    templateUrl: './create-work-type.component.html',
    styleUrls: ['./create-work-type.component.scss']
  })
export class CreateWorkTypeComponent implements OnInit {
  workTypeForm: FormGroup;
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createWorkType = new EventEmitter<WorkType>();

  constructor(
    private workTypeService: WorkTypeService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    $('#createWorkType').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.workTypeForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      estimatedTime: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(14)])),
      estimatedCost: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)]))
    });
  }

  clickSubmit() {
    if (this.workTypeForm.invalid) {
      return;
    }
    const form = this.workTypeForm.value;
    const workType: WorkType = {
      id: 0,
      name: form.name as string,
      estimatedCost: form.estimatedCost as number,
      estimatedTime: form.estimatedTime as number,
    };

    this.workTypeService.addEntity(workType).subscribe(newGroup => this.createWorkType.next(newGroup));
    this.closeCreateModal.nativeElement.click();
  }
}
