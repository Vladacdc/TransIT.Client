import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State } from 'src/app/modules/shared/models/state';
import { StateService } from 'src/app/modules/shared/services/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.scss']
})
export class EditStateComponent implements OnInit {
  selectedState: State;
  @ViewChild('close') closeDiv: ElementRef;
  @Input() state: State;
  
  @Output() editState = new EventEmitter<State>();

  stateFrom: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceState: StateService, private toast: ToastrService) {}

  ngOnInit() {
    this.stateFrom = this.formBuilder.group({
      id: '',
      transName: ''
    });
    this.setState();
  }

  setState() {
    if (!this.state) {
      return;
    }
    this.selectedState = this.state;
    this.state = new State(this.state);
    this.stateFrom.patchValue(this.state);
  }

  updateData() {
    if (this.stateFrom.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.stateFrom.value;

    const state: State = new State({
      id: form.id as number,
      transName: form.transName as string,
      name: this.selectedState.name as string
    });
    this.serviceState.updateEntity(state).subscribe(
      _ => {
        this.editState.next(state);
      },
      error => this.toast.error('Даний стан неможливо змінити', 'Помилка')
    );
  }
}
