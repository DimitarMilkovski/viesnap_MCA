import { AbstractControl, ValidatorFn } from '@angular/forms';

export class SelectValidator {

  static selectRequired(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value === 0 || c.value == null) {
        return { required: true };
      }
      return null;
    };
  }
}