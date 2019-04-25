import { ErrorMessage } from 'ng-bootstrap-form-validation';

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
