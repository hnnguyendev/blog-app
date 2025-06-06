import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string): string {
    const config = {
      required: '{field} is required.',
      email: `Enter a valid email address to continue.`,
      min: '{field} must be at least {value}.',
      max: '{field} must be at most {value}.',
      maxlength: `{field} must be no more than {maxlength} characters.`,
      minlength: `{field} needs {minlength} or more alphanumeric characters.`
    };
    return config[validatorName as keyof typeof config];
  }
}
