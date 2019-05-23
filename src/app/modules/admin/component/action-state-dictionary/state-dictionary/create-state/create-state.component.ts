import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'src/app/modules/shared/models/state';
import { StateService } from 'src/app/modules/shared/services/state.service';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.scss']
})
export class CreateStateComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createState = new EventEmitter<State>();
  stateForm: FormGroup;

  constructor(private serviceState: StateService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    $('#createState').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.stateForm = this.formBuilder.group({
      transName: ['', Validators.required]
    });
  }

  clickSubmit() {
    if (this.stateForm.invalid) {
      return;
    }
    const form = this.stateForm.value;
    const state: State = new State({
      id: 0,
      transName: form.transName as string
    });

    this.serviceState.addEntity(state).subscribe(newGroup => this.createState.next(newGroup));
    this.closeDiv.nativeElement.click();
  }
}
