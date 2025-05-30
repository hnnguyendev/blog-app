import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string): string {
    const config = {
      required: '{field} is required',
      email: `Please enter a valid email address.`,
      min: '{field} should not be less than {value}',
      max: '{field} should not be more than {value}',
      maxlength: `{field} cannot be longer than {maxlength} characters.`,
      minlength: `{field} must contain {minlength} alphanumeric characters.`,
      matching: 'Re-enter password does not match. Please try again!',
      lessThanTime: 'Must be less than To Time',
      thanTime: 'Must be greater than From Time',
      lessThanDate: 'Must be less than End Date',
      thanDate: 'Must be greater than Start Date',
      alphanumeric: 'Alphanumeric only.',
      phone: 'Phone number is invalid.',
      username: 'Username must be a alphanumeric characters.',
      password: `Provided password does not match password policy.`,
      valueMinGreaterThanMax: `{filed1} must be less than {filed2}.`,
      emailOrUserName: 'Please enter a valid username or email address.',
      emailExist: 'This email already exists.',
      lessThanEndTime: 'Must be less than Start Time',
      thanStartTime: 'Must be greater than End Time',
      username_regex: 'Username invalid.',
      plainText: 'Only allow plain text'
    };
    return config[validatorName as keyof typeof config];
  }
}
