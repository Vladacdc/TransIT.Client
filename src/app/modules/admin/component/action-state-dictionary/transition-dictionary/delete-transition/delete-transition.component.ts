import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transition } from 'src/app/modules/shared/models/transition';
import { ToastrService } from 'ngx-toastr';
import { TransitionService } from 'src/app/modules/shared/services/transition.service';

@Component({
  selector: 'app-delete-transition',
  templateUrl: './delete-transition.component.html',
  styleUrls: ['./delete-transition.component.scss']
})
export class DeleteTransitionComponent {
  @Input() transition: Transition;
  @Output() deleteTransition = new EventEmitter<Transition>();

  constructor(private transitionService: TransitionService, private toast: ToastrService) {}

  delete(): void {
    this.transitionService
      .deleteEntity(this.transition.id)
      .subscribe(
        () => this.deleteTransition.next(this.transition),
        () => this.toast.error('Не вдалось видалити перехід', 'Помилка видалення')
      );
  }
}
