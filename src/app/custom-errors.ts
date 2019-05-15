import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { FormGroup } from '@angular/forms';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat
  },
  {
    error: 'minlength',
    format: minLengthFormat
  },
  {
    error: 'maxlength',
    format: maxLengthFormat
  },
  {
    error: 'matchPassword',
    format: matchPasswordFormat
  },

  {
    error: 'pattern',
    format: patternFormat
  },
  {
    error: 'email',
    format: emailFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `Поле "${label}" є обов'язковим`;
}

export function minLengthFormat(label: string, error: any): string {
  return `Мінімальна довжина поля - ${error.requiredLength}`;
}

export function maxLengthFormat(label: string, error: any): string {
  return `Максимальна довжина поля - ${error.requiredLength}`;
}

export function matchPasswordFormat(label: string, error: any): string {
  return 'Паролі не співпадають';
}

export function patternFormat(label: string, error: any): string {
  return 'Дозволено тільки букви і спеціальні символи';
}

export function emailFormat(label: string, error: any): string {
  return 'Вимагається "post@post.post"';
}

export function matchPassword(form: FormGroup) {
  const { password, confirmPassword } = form.value;
  if (password !== confirmPassword) {
    form.get('confirmPassword').setErrors({ matchPassword: true });
  } else {
    return null;
  }
}
