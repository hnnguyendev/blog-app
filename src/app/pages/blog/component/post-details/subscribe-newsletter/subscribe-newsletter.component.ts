import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-subscribe-newsletter',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './subscribe-newsletter.component.html',
  styleUrl: './subscribe-newsletter.component.scss'
})
export class SubscribeNewsletterComponent {
  public subscribeForm: FormGroup;
  public submitted: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  constructor() {
    this.subscribeForm = this.fb.nonNullable.group({
      email: new FormControl<string>('', [Validators.required, Validators.email])
    });
  }

  public subscribe(): void {
    this.submitted = true;

    if (this.subscribeForm.invalid) {
      return;
    }
    this.subscribeForm.reset();
    this.submitted = false;
    this.messageService.add({
      key: 'global-toast',
      severity: 'success',
      summary: 'Subscribed!',
      detail: 'You have successfully subscribed to our newsletter.',
      life: 3000
    });
  }
}
