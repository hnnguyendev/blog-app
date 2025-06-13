import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import ValidatorsCustom from '@Shared/validation/validators-custom';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { Password, PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-password-reset-finish',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    FloatingConfiguratorComponent,
    ValidationMessageComponent,
    PasswordModule,
    DividerModule
  ],
  templateUrl: './password-reset-finish.component.html',
  styleUrl: './password-reset-finish.component.scss'
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
  @ViewChild('newPasswordInput') newPasswordInput!: Password;

  public passwordForm: FormGroup;
  public submitted: boolean = false;
  public key = signal('');
  public initialized = signal(false);

  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.passwordForm = this.fb.group(
      {
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
    this.route.queryParams.subscribe((params) => {
      if (params['key']) {
        this.key.set(params['key']);
      } else {
        this.messageService.add({
          key: 'global-toast',
          severity: 'error',
          summary: 'Error',
          detail: 'The reset key is missing.',
          life: 3000
        });
      }
      this.initialized.set(true);
    });
  }

  ngAfterViewInit(): void {
    const inputEl: HTMLInputElement | null = this.newPasswordInput?.input?.nativeElement;
    if (inputEl) {
      inputEl.focus();
    }
  }

  public finishReset(): void {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    const { newPassword } = this.passwordForm.getRawValue();

    this.spinner.show();
    this.accountService.resetPasswordFinish(this.key(), newPassword).subscribe({
      next: () => {
        this.spinner.hide();
        this.messageService.add({
          key: 'global-toast',
          severity: 'success',
          summary: 'Success',
          detail: `Your password has been reset. Please sign in.`,
          life: 3000
        });
        this.router.navigateByUrl('/auth/login');
      },
      error: (res) => {
        this.spinner.hide();
        this.messageService.add({
          key: 'global-toast',
          severity: 'error',
          summary: 'Error',
          detail: res?.error?.detail || `Your password couldn't be reset. Remember a password request is only valid for 24 hours.`,
          life: 3000
        });
        this.router.navigateByUrl('/auth/login');
      }
    });
  }
}
