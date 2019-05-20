import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Transition } from 'src/app/modules/admin/models/transition/transition';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'src/app/modules/admin/models/state/state';
import { ActionType } from 'src/app/modules/admin/models/action/actiontype';
import { TransitionService } from 'src/app/modules/admin/services/transition.service';
import { StateService } from 'src/app/modules/admin/services/state.service';
import { ActionTypeService } from 'src/app/modules/admin/services/action-type.sevice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-transition',
  templateUrl: './edit-transition.component.html',
  styleUrls: ['./edit-transition.component.scss']
})
export class EditTransitionComponent implements OnInit {
  @Output() editTransition = new EventEmitter<Transition>();
  @Input()
  set transition(transition: Transition) {
    this._transition = transition;
    this.setUpForm();
  }

  transitionForm: FormGroup;
  states: State[] = [];
  actionTypes: ActionType[] = [];
  _transition: Transition;

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

    this.updateTransition();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.setUpForm();
  }

  private loadEntities() {
    this.stateService.getEntities().subscribe(states => (this.states = states));
    this.actionTypeService.getEntities().subscribe(actionTypes => (this.actionTypes = actionTypes));
  }

  private setUpForm() {
    this.transitionForm = this.fb.group({
      fromState: [this._transition && this._transition.fromState, Validators.required],
      toState: [this._transition && this._transition.toState, Validators.required],
      actionType: [this._transition && this._transition.actionType, Validators.required]
    });
  }

  private updateTransition() {
    const transition = new Transition({ ...this._transition, ...this.formValue });
    this.transitionService
      .updateEntity(transition)
      .subscribe(
        updatedTransition => this.editTransition.next(updatedTransition),
        _ => this.toast.error('Не вдалось оновити перехід', 'Помилка оновлення переходу')
      );
  }

  private get formValue() {
    return this.transitionForm.value;
  }
}
