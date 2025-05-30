import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { capitalizeFirstLetter, convertToSentenceCase } from '@Shared/helper/string-helpers';
import { MessageModule } from 'primeng/message';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss'
})
export class ValidationMessageComponent {
  @Input() control!: AbstractControl | undefined;
  @Input() submitted!: boolean;
  @Input() fieldName: string | undefined;

  public get errorMessage(): null | string {
    if (this.control) {
      const controlName = capitalizeFirstLetter(this.getControlName(this.control) || '');
      for (const propertyName in this.control.errors) {
        if ((this.submitted && this.control.invalid) || (this.control.invalid && (this.control.dirty || this.control.touched))) {
          const objectError = this.control.errors[propertyName];
          const requiredValueKey = Object.keys(this.control.errors[propertyName])[0];

          if (this?.control?.errors['message']) {
            return this?.control?.errors['message'];
          }

          let message = ValidationService.getValidatorErrorMessage(propertyName)?.replace(`{field}`, convertToSentenceCase(this.fieldName || controlName));

          if (objectError[requiredValueKey] || requiredValueKey === 'max' || requiredValueKey === 'min') {
            if (requiredValueKey === 'min' || requiredValueKey === 'max') {
              message = message.replace('{value}', objectError[requiredValueKey]);
            }
            return message?.replace(`{${propertyName}}`, objectError[requiredValueKey]);
          }
          if (this.control.errors?.['valueMinGreaterThanMax']) {
            return this.control.errors?.['message'].toString();
          }
          return message;
        }
      }
    }
    return null;
  }

  private getControlName = (control: AbstractControl) => {
    var controlName = null;
    var parent = control['_parent'];

    // only such parent, which is FormGroup, has a dictionary
    // with control-names as a key and a form-control as a value
    if (parent instanceof FormGroup) {
      // now we will iterate those keys (i.e. names of controls)
      Object.keys(parent.controls).forEach((name) => {
        // and compare the passed control and
        // a child control of a parent - with provided name (we iterate them all)
        if (control === parent.controls[name]) {
          // both are same: control passed to Validator
          //  and this child - are the same references
          controlName = name;
        }
      });
    }
    // we either found a name or simply return null
    return controlName;
  };
}
