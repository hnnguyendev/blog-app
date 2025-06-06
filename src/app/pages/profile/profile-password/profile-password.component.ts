import { CommonModule } from '@angular/common';
import { Component, inject, Injector, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '@Core/auth/account.model';
import { AccountService } from '@Core/auth/account.service';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import ValidatorsCustom from '@Shared/validation/validators-custom';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-profile-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent, ButtonModule, PasswordModule, DividerModule],
  templateUrl: './profile-password.component.html',
  styleUrl: './profile-password.component.scss'
})
export class ProfilePasswordComponent implements OnInit {
  public formGroup: FormGroup;
  public account?: Signal<Account | undefined | null>;
  public submitted: boolean = false;
  public loading: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly accountService = inject(AccountService);
  private readonly messageService = inject(MessageService);
  private readonly injector = inject(Injector);

  constructor() {
    this.formGroup = this.fb.group(
      {
        currentPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
        newPassword: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.maxLength(50),
            ValidatorsCustom.passwordStrengthValidator(
              'Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.'
            )
          ]
        }),
        confirmPassword: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.maxLength(50)]
        })
      },
      {
        validators: ValidatorsCustom.fieldsMatch('newPassword', 'confirmPassword', 'Password and confirmation do not match.')
      }
    );
  }

  ngOnInit(): void {
    const account$ = this.accountService.identity();
    this.account = toSignal(account$, { injector: this.injector });
  }

  public changePassword(): void {
    this.submitted = true;
    if (this.formGroup?.invalid) {
      return;
    }
    this.loading = true;

    const { newPassword, currentPassword } = this.formGroup.getRawValue();

    this.spinner.show();
    this.accountService.changePassword(newPassword, currentPassword).subscribe({
      next: () => {
        this.onComplete();
        this.formGroup.reset();
        this.showToast('success', 'Success', 'Password changed!');
      },
      error: () => {
        this.onComplete();
        this.showToast('error', 'Error', 'An error has occurred! The password could not be changed.');
      }
    });
  }

  public cancel(): void {
    this.accountService.redirectByPath();
  }

  public onComplete(): void {
    this.spinner.hide();
    this.loading = false;
    this.submitted = false;
  }

  private showToast(severity: 'success' | 'error', summary: string, detail: string): void {
    this.messageService.add({
      key: 'global-toast',
      severity,
      summary,
      detail,
      life: 3000
    });
  }
}
