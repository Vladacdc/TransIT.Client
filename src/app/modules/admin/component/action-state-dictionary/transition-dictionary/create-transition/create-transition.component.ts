import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Transition } from 'src/app/modules/shared/models/transition';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/modules/shared/models/state';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { StateService } from 'src/app/modules/shared/services/state.service';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';
import { TransitionService } from 'src/app/modules/shared/services/transition.service';

@Component({
  selector: 'app-create-transition',
  templateUrl: './create-transition.component.html',
  styleUrls: ['./create-transition.component.scss']
})
export class CreateTransitionComponent implements OnInit {
  @Output() addTransition = new EventEmitter<Transition>();
  transitionForm: FormGroup;
  states: State[] = [];
  actionTypes: ActionType[] = [];

  constructor(
    private fb: FormBuilder,
    private transitionService: TransitionService,
    private stateService: StateService,
    private actionTypeService: ActionTypeService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.setUpForm();
    this.loadEntities();
  }

  onSubmit() {
    if (this.transitionForm.invalid) {
      return;
    }

    this.createTransition();
    this.hideModalWindow();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.hideModalWindow();
    this.setUpForm();
  }

  private setUpForm() {
    this.transitionForm = this.fb.group({
      fromState: [undefined, Validators.required],
      toState: [undefined, Validators.required],
      actionType: [undefined, Validators.required]
    });
  }

  private loadEntities() {
    this.stateService.getEntities().subscribe(states => (this.states = states));
    this.actionTypeService.getEntities().subscribe(actionTypes => (this.actionTypes = actionTypes));
  }

  private createTransition() {
    const transition = new Transition(this.formValue);
    this.transitionService
      .addEntity(transition)
      .subscribe(
        newTransition => this.addTransition.next(newTransition),
        _ => this.toast.error('Не вдалось створити перехід', 'Помилка створення переходу')
      );
  }

  private hideModalWindow() {
    const modalWindow: any = $('#createTransition');
    modalWindow.modal('hide');
  }

  private get formValue() {
    return this.transitionForm.value;
  }
}
