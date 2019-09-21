import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Location } from 'src/app/modules/shared/models/location';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  selectedLocation: Location;
  locationForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set location(location: Location) {
    if (!location) {
      return;
    }
    this.selectedLocation = new Location(location);
    if (this.locationForm) {
      this.resetForm();
    }
  }
  @Output() updateLocation = new EventEmitter<Location>();

  constructor(
    private formBuilder: FormBuilder,
    private serviceLocation: LocationService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      id: '',
      name: '',
      description: ''
    });
    this.locationForm.patchValue(this.selectedLocation);
  }

  updateData() {
    if (this.locationForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.locationForm.value;
    const location = new Location({
      id: form.id as number,
      name: form.name as string,
      description: form.description as string
    });

    this.serviceLocation
      .updateEntity(location)
      .subscribe(
        data => {
          this.updateLocation.next(location);
          this.toast.success('', 'Місцезнаходження оновлено');
        },
        _ => this.toast.error('Не вдалось редагувати дані про місцезнаходження', 'Помилка редагування даних')
      );
      
      this.closeDiv.nativeElement.click();
  }

  resetForm() {
    this.locationForm.patchValue(this.selectedLocation);
  }
}
