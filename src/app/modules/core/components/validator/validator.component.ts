import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent implements OnInit {
  @Input() control: FormControl;
  @Input() customName: string;
  name: string;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    const fieldName = this.customName ? this.customName : this.getControlName();
    this.name = this.translateService.instant(`fields.${fieldName}`);
  }

  getControlName(): string {
    let controlName = null;
    const parent = this.control.parent;

    if (parent instanceof FormGroup) {
      for (const name in parent.controls) {
        if (this.control === parent.controls[name]) {
          controlName = name;
        }
      }
    }

    return controlName;
  }
}
