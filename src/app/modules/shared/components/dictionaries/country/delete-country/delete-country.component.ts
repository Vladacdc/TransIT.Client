import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/modules/shared/models/country';
import { CountryService } from 'src/app/modules/shared/services/country.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-country',
  templateUrl: './delete-country.component.html',
  styleUrls: ['./delete-country.component.scss']
})
export class DeleteCountryComponent implements OnInit {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() country: Country;
  @Output() deleteCountry = new EventEmitter<Country>();

  constructor(private service: CountryService, private toast: ToastrService) {}

  ngOnInit() {}
  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.service.deleteEntity(this.country.id).subscribe(
      data => {
        this.deleteCountry.next(this.country);
        this.toast.success('', 'Країну видалено');
      },
      error => this.toast.error('Помилка')
    );
  }
}
