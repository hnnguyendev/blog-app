import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '@Core/auth/account.model';
import { AccountService } from '@Core/auth/account.service';
import { ENDPOINT } from '@Core/config/endpoint.constants';
import { environment } from '@Environments/environment';
import { FileUploadComponent } from '@Shared/component/file-upload/file-upload.component';
import { EUrlType } from '@Shared/enum/EUrlType';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import ValidatorsCustom from '@Shared/validation/validators-custom';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

const initialAccount: Account = {} as Account;

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule, ValidationMessageComponent, FileUploadComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {
  public formGroup: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly accountService = inject(AccountService);
  private readonly messageService = inject(MessageService);

  public get invalid(): boolean {
    if (this.formGroup) {
      return this.formGroup.invalid;
    }
    return false;
  }

  public get uploadAvatarApi(): string {
    return `${environment.BASE_URL}${ENDPOINT.FILE.UPLOAD_AVATAR}`;
  }

  constructor() {
    this.formGroup = this.fb.group({
      id: new FormControl<string>(''),
      firstName: new FormControl(initialAccount.firstName, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      }),
      lastName: new FormControl(initialAccount.lastName, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      }),
      email: new FormControl(initialAccount.email, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]
      }),
      login: new FormControl<string>({ value: initialAccount.login, disabled: true }, [Validators.required, Validators.maxLength(50)]),
      imageUrl: new FormControl<string>('', [Validators.required]),
      website: new FormControl<string>('', [Validators.maxLength(255), ValidatorsCustom.url([EUrlType.WEBSITE], 'Invalid website URL')]),
      langKey: new FormControl(initialAccount.langKey, { nonNullable: true }),
      activated: new FormControl(initialAccount.activated, { nonNullable: true }),
      authorities: new FormControl(initialAccount.authorities, { nonNullable: true })
    });
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe((account) => {
      if (account) {
        this.formGroup.patchValue(account);
      }
    });
  }

  public onUploadFile(imageUrl: string): void {
    this.formGroup.patchValue({
      imageUrl: imageUrl
    });
  }

  public save(): void {
    this.submitted = true;
    if (this.formGroup?.invalid) {
      return;
    }
    this.loading = true;

    const account = this.formGroup.getRawValue();
    this.spinner.show();
    this.accountService.save(account).subscribe({
      next: () => {
        this.onComplete();
        this.accountService.authenticate(account);
        this.showToast('success', 'Success', 'Update profile successfully!');
      },
      error: () => {
        this.onComplete();
        this.showToast('error', 'Error', 'Update profile failed!');
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
