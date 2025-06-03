import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterModule,
    FloatingConfiguratorComponent,
    ValidationMessageComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  public username = viewChild.required<ElementRef>('username');
  public authenticationError = signal(false);
  public loginForm: FormGroup;
  public submitted: boolean = false;

  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.nonNullable.group({
      username: new FormControl<string>('', [Validators.required, Validators.maxLength(50)]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
      rememberMe: new FormControl<boolean>(false, [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    this.username().nativeElement.focus();
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authenticationError.set(false);
        if (!this.router.getCurrentNavigation()) {
          // There were no routing during login (eg from navigationToStoredUrl)
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.authenticationError.set(true);
        this.messageService.add({
          key: 'global-toast',
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to sign in! Please check your credentials and try again.',
          life: 3000
        });
      }
    });
  }
}
