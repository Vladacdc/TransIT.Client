import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnersCount = 0;

  constructor(private spinner: NgxSpinnerService) {}

  show(): void {
    this.spinnersCount += 1;
    if (this.spinnersCount === 1) {
      setTimeout(() => this.spinner.show(), 0);
    }
  }

  hide(): void {
    this.spinnersCount -= 1;
    if (this.spinnersCount === 0) {
      setTimeout(() => this.spinner.hide(), 0);
    }
    if (this.spinnersCount <= 0) {
      this.spinnersCount = 0;
    }
  }
}
