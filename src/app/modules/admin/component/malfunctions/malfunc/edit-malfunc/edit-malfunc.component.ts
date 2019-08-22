import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';

@Component({
  selector: 'app-edit-malfunc',
  templateUrl: './edit-malfunc.component.html',
  styleUrls: ['./edit-malfunc.component.scss']
})
export class EditMalfuncComponent implements OnInit {
  malfunctionForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;

  malfunction: Malfunction;
  @Input() set setMalfunction(malfunction: Malfunction) {
    this.malfunction = malfunction;
    if (this.malfunctionForm) {
      this.malfunctionForm.patchValue(malfunction);
    }
  }

  @Output() editedMalfunction = new EventEmitter<Malfunction>();

  constructor(
    private formBuilder: FormBuilder,
    private serviceMalfunction: MalfunctionService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.malfunctionForm = this.formBuilder.group({
      group: '',
      subgroup: '',
      name: ['', Validators.required]
    });
  }
  updateData() {
    const malfunc = new Malfunction({
      id: this.malfunction.id,
      name: this.malfunctionForm.value.name,
      malfunctionSubgroup: this.malfunction.malfunctionSubgroup
    });
    this.closeDiv.nativeElement.click();
    this.serviceMalfunction
      .updateEntity(malfunc)
      .subscribe(
        () => this.editedMalfunction.next(malfunc),
        _ => this.toast.error('Не вдалось створити помилку', 'Помилка вже існує у заявках')
      );
  }
}
