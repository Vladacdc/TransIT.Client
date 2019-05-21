import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State } from 'src/app/modules/shared/models/state';
import { StateService } from 'src/app/modules/shared/services/state.service';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.scss']
})
export class EditStateComponent implements OnInit {
  selectedState: State;
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set state(state: State) {
    if (!state) {
      return;
    }
    this.selectedState = state;
    state = new State(state);
    this.stateFrom.patchValue(state);
  }
  @Output() editState = new EventEmitter<State>();

  stateFrom: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceState: StateService) {}

  ngOnInit() {
    this.stateFrom = this.formBuilder.group({
      id: '',
      transName: ''
    });
  }

  updateData() {
    if (this.stateFrom.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.stateFrom.value;

    const state: State = {
      id: form.id as number,
      transName: form.transName as string,
      name: this.selectedState.name as string
    };
    this.serviceState.updateEntity(state).subscribe(_ => this.editState.next(state));
  }
}
