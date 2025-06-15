import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { REGEX } from '@Shared/constant/common.constants';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import ValidatorsCustom from '@Shared/validation/validators-custom';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit {
  public username = viewChild.required<ElementRef>('username');

  public registerForm: FormGroup;
  public submitted: boolean = false;
  public registered = signal(false);
  public registerEmail = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly accountService = inject(AccountService);
  private readonly messageService = inject(MessageService);

  constructor() {
    this.registerForm = this.fb.group(
      {
        login: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(REGEX.USERNAME)]
        }),
        email: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]
        }),

        password: new FormControl('', {
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
        validators: ValidatorsCustom.fieldsMatch('password', 'confirmPassword', 'Password and confirmation do not match.')
      }
    );
  }

  ngAfterViewInit(): void {
    this.username().nativeElement.focus();
  }

  public register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const { login, email, password } = this.registerForm.getRawValue();

    this.spinner.show();
    this.accountService.register({ login, email, password, langKey: 'en' }).subscribe({
      next: () => {
        this.registered.set(true);
        this.registerEmail.set(email);
        this.spinner.hide();
      },
      error: (res: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          key: 'global-toast',
          severity: 'error',
          summary: 'Error',
          detail: res?.error?.detail || 'Failed to get reset link.',
          life: 3000
        });
      }
    });
  }
}
