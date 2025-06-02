import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ENDPOINT } from '@Core/config/endpoint.constants';
import { environment } from '@Environments/environment';
import { FileUploadComponent } from '@Shared/component/file-upload/file-upload.component';
import { FILE_SIZE } from '@Shared/constant/common.constants';
import { getFileName } from '@Shared/helper/file.helper';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import * as _ from 'lodash';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-file-section-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FileUploadComponent, ValidationMessageComponent, InputTextModule, TextareaModule],
  templateUrl: './file-section-item.component.html',
  styleUrl: './file-section-item.component.scss'
})
export class FileSectionItemComponent implements OnInit {
  @Input() index!: number;
  @Input() formGroup!: FormGroup;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public maxFileSize: string = FILE_SIZE._25MB;
  public controls!: { [key: string]: FormControl };

  public get uploadFileApi(): string {
    return `${environment.BASE_URL}${ENDPOINT.FILE.UPLOAD_FILE}`;
  }

  ngOnInit(): void {
    this.controls = {
      name: this.formItem.get('name') as FormControl,
      mediaUrl: this.formItem.get('mediaUrl') as FormControl,
      description: this.formItem.get('description') as FormControl
    };
  }

  public get sectionFiles() {
    return this.formGroup.controls['sectionFiles'] as FormArray;
  }

  public get isHasFileUploaded() {
    return this.sectionFiles.value.some((item: { mediaUrl: any }) => !_.isNil(item.mediaUrl));
  }

  public get mediaUrl() {
    return this.formItem.value.mediaUrl;
  }

  public onUploadFile(fileUrl: string): void {
    this.formItem.patchValue({
      mediaUrl: fileUrl,
      name: getFileName(fileUrl)
    });
    this.resetAllValidatorFormItem(true);
  }

  public onDeleteFile() {
    this.formItem.reset();
    this.resetAllValidatorFormItem(false);
  }

  private handleUploadCase(formControl: AbstractControl, control: any, isCurrentFormItem: boolean, hasMediaUrl: boolean): void {
    if (isCurrentFormItem) {
      formControl.enable();
      if (control.isRequired) {
        formControl.addValidators(Validators.required);
      }
    } else if (!hasMediaUrl) {
      this.resetValidatorFormControl(formControl, control);
    }
  }

  private handleNonUploadCase(formControl: AbstractControl, control: any, index: number, hasMediaUrl: boolean): void {
    if (!this.isHasFileUploaded) {
      if (index === 0) {
        if (control.canDisable) {
          formControl.disable();
        } else {
          formControl.addValidators(Validators.required);
          formControl.updateValueAndValidity();
        }
      } else {
        this.resetValidatorFormControl(formControl, control);
      }
    } else if (!hasMediaUrl) {
      this.resetValidatorFormControl(formControl, control);
    }
  }

  private resetAllValidatorFormItem(isUpload: boolean): void {
    const controls = [
      {
        controlName: 'name',
        isRequired: true,
        isCanDisabled: true,
        message: 'Name is required'
      },
      {
        controlName: 'mediaUrl',
        isRequired: true,
        isCanDisabled: false,
        message: 'File is required'
      },
      { controlName: 'description', isRequired: false, isCanDisabled: true, message: null }
    ];

    this.sectionFiles.controls.forEach((formItem: AbstractControl<any, any>, index: number) => {
      const isCurrentFormItem = index === this.index;
      const hasMediaUrl = !_.isNil(formItem.get('mediaUrl')?.value);
      controls.forEach((control) => {
        const formControl = formItem.get(control.controlName)!;
        if (isUpload) {
          this.handleUploadCase(formControl, control, isCurrentFormItem, hasMediaUrl);
        } else {
          this.handleNonUploadCase(formControl, control, index, hasMediaUrl);
        }
      });
    });
  }

  private resetValidatorFormControl(formItem: AbstractControl<any, any>, control: { isCanDisabled: any }) {
    formItem.reset();
    if (control.isCanDisabled) {
      formItem.disable();
    }
    formItem.clearValidators();
    formItem.setValidators(null);
    formItem.updateValueAndValidity();
  }
}
