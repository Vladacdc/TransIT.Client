import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Transition } from 'src/app/modules/shared/models/transition';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/modules/shared/models/state';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { TransitionService } from 'src/app/modules/shared/services/transition.service';
import { StateService } from 'src/app/modules/shared/services/state.service';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';
import { TEntity } from 'src/app/modules/core/models/entity/entity';

@Component({
  selector: 'app-edit-transition',
  templateUrl: './edit-transition.component.html',
  styleUrls: ['./edit-transition.component.scss']
})
export class EditTransitionComponent implements OnInit {
  @Output() editTransition = new EventEmitter<Transition>();
  @Input()
  set transition(transition: Transition) {
    if (!transition) {
      return;
    }
    this._transition = transition;
    this.setUpForm();

    setTimeout(() => {
      if (this._transition.isFixed) {
        this.transitionForm.disable();
      } else {
        this.transitionForm.enable();
      }
    }, 0);
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

  compareEntities<T>(entity: TEntity<T>, otherEntity: TEntity<T>) {
    return entity && otherEntity ? entity.id === otherEntity.id : entity === otherEntity;
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
