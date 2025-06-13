import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-password-reset-init',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule, RouterModule, FloatingConfiguratorComponent, ValidationMessageComponent],
  templateUrl: './password-reset-init.component.html',
  styleUrl: './password-reset-init.component.scss'
})
export class PasswordResetInitComponent implements AfterViewInit {
  public email = viewChild.required<ElementRef>('email');
  public resetRequestForm: FormGroup;
  public submitted: boolean = false;
  public sentComplete = signal(false);
  public sentEmail = signal('');

  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly accountService = inject(AccountService);

  constructor() {
    this.resetRequestForm = this.fb.group({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email] })
    });
  }

  ngAfterViewInit(): void {
    this.email().nativeElement.focus();
  }

  public requestReset(): void {
    this.submitted = true;
    if (this.resetRequestForm.invalid) {
      return;
    }
    const { email } = this.resetRequestForm.getRawValue();

    this.spinner.show();
    this.accountService.resetPasswordInit(email).subscribe({
      next: () => {
        this.sentComplete.set(true);
        this.sentEmail.set(email);
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.messageService.add({
          key: 'global-toast',
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to get reset link.',
          life: 3000
        });
      }
    });
  }
}
