import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/modules/shared/models/location';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createLocation = new EventEmitter<Location>();
  locationForm: FormGroup;

  constructor(
    private serviceLocation: LocationService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    $('#createLocation').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.locationForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  clickSubmit() {
    if (this.locationForm.invalid) {
      return;
    }

    const form = this.locationForm.value;
    const location = new Location({
      id: 0,
      name: form.name as string,
      description: form.description as string
    });
    this.serviceLocation
      .addEntity(location)
      .subscribe(
        newLocation => {
          this.createLocation.next(newLocation);
          this.toast.success('', 'Місцезнаходження створено');
        },
        _ => this.toast.error('Не вдалось створити місценаходження', 'Помилка створення нового місценаходження')
      );
    this.closeDiv.nativeElement.click();
  }
}
