import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/app/modules/shared/models/currency';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-currency',
  templateUrl: './delete-currency.component.html',
  styleUrls: ['./delete-currency.component.scss']
})
export class DeleteCurrencyComponent implements OnInit {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() currency: Currency;
  @Output() deleteCurrency = new EventEmitter<Currency>();

  constructor(private service: CurrencyService, private toast: ToastrService) {}

  ngOnInit() {}
  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.service.deleteEntity(this.currency.id).subscribe(
      data => {
        this.deleteCurrency.next(this.currency);
        this.toast.success('', 'Валюту видалено');
      },
      error => this.toast.error('Валюту не можливо видалити.')
    );
  }
}
