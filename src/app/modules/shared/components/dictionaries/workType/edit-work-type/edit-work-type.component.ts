import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkType } from 'src/app/modules/shared/models/work-type';
import { WorkTypeService } from 'src/app/modules/shared/services/work-type.service';

@Component({
    selector: 'app-work-type-edit',
    templateUrl: './edit-work-type.component.html',
    styleUrls: ['./edit-work-type.component.scss']
  })
export class EditWorkTypeComponent implements OnInit {
  selectedWorkType: WorkType;
  workTypeForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Output() updateWorkType = new EventEmitter<WorkType>();
  @Input()
  set workType(workType: WorkType) {
    if (!workType) {
      return;
    }
    this.selectedWorkType = new WorkType(workType);
    if (this.workTypeForm) { 
      this.resetForm();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private workTypeService: WorkTypeService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.workTypeForm = this.formBuilder.group({
      id: [''],
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      estimatedTime: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
      estimatedCost: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(14)])),
    });
    this.workTypeForm.patchValue(this.selectedWorkType);
  }

  updateData() {
    if (this.workTypeForm.invalid) {
      return;
    }
    const form = this.workTypeForm.value;
    const workType: WorkType = {
      id: form.id as number,
      name: form.name as string,
      estimatedTime: form.estimatedTime as number,
      estimatedCost: form.estimatedCost as number
    };

    this.workTypeService.updateEntity(workType).subscribe(
      _ => {
        this.toast.success('', 'Постачальника оновлено');
        this.updateWorkType.next(workType);
      },
      error => this.toast.error('Помилка редагування')
    );
    this.closeDiv.nativeElement.click();
  }

  resetForm() {
    this.workTypeForm.patchValue(this.selectedWorkType);
  }
}
