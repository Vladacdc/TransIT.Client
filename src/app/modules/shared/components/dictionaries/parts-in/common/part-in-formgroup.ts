import { FormGroup, FormControl, Validators } from '@angular/forms';

export class PartInFormGroup extends FormGroup {
    constructor() {
        super({
            arrivalDate: new FormControl(null, [Validators.required]),
            batch: new FormControl('', [Validators.required, Validators.pattern('^[0-9A-Za-zА-Яа-яїієЇІЯЄ]+$')]),
            price: new FormControl(null, [Validators.required, Validators.min(0.0000001)]),
            amount: new FormControl(null, [Validators.required, Validators.min(1)]),
            unit: new FormControl(null, [Validators.required]),
            part: new FormControl(null, [Validators.required]),
            currency: new FormControl(null, [Validators.required])
        });
    }
}
