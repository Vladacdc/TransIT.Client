import { FormControl } from '@angular/forms';

export class CustomValidators {
    static isPDF(control: FormControl) {
        const filename: string = control.value as string;
        if (filename.endsWith('.pdf')) {
          return null;
        } else {
          return {PDFFormat: {value: control.value}};
        }
      }
}
