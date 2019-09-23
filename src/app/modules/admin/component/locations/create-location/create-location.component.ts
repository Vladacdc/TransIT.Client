import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/modules/shared/models/location';
import { TranslateService } from '@ngx-translate/core';

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
    private toast: ToastrService,
    private translate: TranslateService
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
          this.toast.success('', this.translate.instant('Admin.Location.Created'));
        },
        _ => this.toast.error(this.translate.instant("Admin.Location.NotCreated")), this.translate.instant("Admin.Location.CreateError")
      );
    this.closeDiv.nativeElement.click();
  }
}
