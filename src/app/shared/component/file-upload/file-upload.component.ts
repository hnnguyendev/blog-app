import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENDPOINT } from '@Core/config/endpoint.constants';
import { environment } from '@Environments/environment';
import { ACCEPT_FILE, FILE_SIZE } from '@Shared/constant/common.constants';
import { getFileNameWithExtension } from '@Shared/helper/file.helper';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { FileBeforeUploadEvent, FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ImageModule, ButtonModule, ProgressBarModule, BadgeModule, FileUpload, ProgressBar],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  @Input() formGroup!: FormGroup;
  @Input() formControlName!: string;
  @Input() submitted!: boolean;
  @Input() fileUrl?: string;
  @Input() uploadApi: string = `${environment.BASE_URL}${ENDPOINT.FILE.UPLOAD_IMAGE}`;
  @Input() acceptFile: string = ACCEPT_FILE.IMAGE;
  @Input() maxFileSize: string = FILE_SIZE._5MB;
  @Input() imageUpload: boolean = true;
  @Input() avatarImage: boolean = false;

  @Output() onUploadFileSuccess = new EventEmitter<string>();
  @Output() onDeleteFile = new EventEmitter<void>();

  public control!: FormControl;
  public files: File[] = [];
  public uploadProgress: boolean = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  public writeValue(value: any): void {
    if (value !== undefined && value !== this.control.value) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe((val) => {
      if (val !== undefined && val !== this.control.value) {
        this.onChange(val);
      }
    });
  }

  public get hasFile(): boolean {
    return !_.isEmpty(this.fileUrl) && !_.isNil(this.fileUrl);
  }

  public get invalid(): boolean {
    if (this.control) {
      return this.control.invalid;
    }
    return false;
  }

  private readonly config = inject(PrimeNG);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    if (this.formControlName) {
      this.control = this.formGroup.get(this.formControlName) as FormControl;
    }
  }

  public choose(event: any, callback: () => void): void {
    callback();
  }

  public onRemoveTemplatingFile(event: any, removeFileCallback: (arg0: any, arg1: any) => void, index: any): void {
    removeFileCallback(event, index);
  }

  public onClearTemplatingUpload(clear: () => void): void {
    clear();
  }

  public onBeforeUpload(event: FileBeforeUploadEvent): void {
    this.uploadProgress = true;

    // remove uploaded file ensure just upload 1 file
    this.fileUpload.removeUploadedFile(0);
    event?.formData?.append('file', this.files[0]);
  }

  public onTemplatedUpload(event: any): void {
    this.uploadProgress = false;
    this.onUploadFileSuccess.emit(event?.originalEvent?.body?.url);
  }

  public onSelectedFiles(event: FileSelectEvent): void {
    this.files = event.currentFiles;
  }

  public uploadEvent(callback: any): void {
    callback();
  }

  public formatSize(bytes: any): string {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes || [];
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  public onRemoveUploadedFile(): void {
    this.formGroup.patchValue({
      [this.formControlName]: ''
    });
    this.files = [];
    this.onDeleteFile.emit();
  }

  public onUploadError(event: any): void {
    const detailMessage = event?.error?.error?.detail;
    this.uploadProgress = false;
    this.messageService.add({
      key: 'global-toast',
      severity: 'error',
      summary: 'Error',
      detail: detailMessage,
      life: 3000
    });
  }

  public convertAcceptToReadableList(accept: string): string {
    if (!accept) return '';

    return accept
      .split(',')
      .map((ext) => ext.trim().replace('.', '').toUpperCase())
      .join(', ');
  }

  public getFileName(path: string): string {
    return getFileNameWithExtension(path);
  }
}
