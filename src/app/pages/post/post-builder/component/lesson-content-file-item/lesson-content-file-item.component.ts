import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-lesson-content-file-item',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './lesson-content-file-item.component.html',
    styleUrl: './lesson-content-file-item.component.scss',
})
export class LessonContentFileItemComponent implements OnInit {
    @Input() index!: number;
    @Input() formGroup!: FormGroup;
    @Input() formItem!: FormGroup;
    @Input() submitted!: boolean;

    ngOnInit(): void {}

    public get sectionFiles() {
        return this.formGroup.controls['sectionFiles'] as FormArray;
    }

    public get isHasMediaUrlUploaded() {
        return this.sectionFiles.value.some((item: { mediaUrl: any; }) => !_.isNil(item.mediaUrl));
    }

    public get mediaUrl() {
        return this.formItem.value.mediaUrl;
    }

    // public onUploadFileSuccess(mediaUrl: string) {
    //     this.formItem.patchValue({
    //         mediaUrl: mediaUrl,
    //         name: getFileName(mediaUrl),
    //     });
    //     this.resetAllValidatorFormItem(true);
    // }

    // public onDeleteImage() {
    //     this.formItem.reset();
    //     this.resetAllValidatorFormItem(false);
    // }

    // private handleUploadCase(
    //     formControl: AbstractControl,
    //     control: any,
    //     isCurrentFormItem: boolean,
    //     hasMediaUrl: boolean
    // ): void {
    //     if (isCurrentFormItem) {
    //         formControl.enable();
    //         if (control.isRequired) {
    //             formControl.addValidators(CustomValidators.required(control.message));
    //         }
    //     } else if (!hasMediaUrl) {
    //         this.resetValidatorFormControl(formControl, control);
    //     }
    // }

    // private handleNonUploadCase(formControl: AbstractControl, control: any, index: number, hasMediaUrl: boolean): void {
    //     if (!this.isHasMediaUrlUploaded) {
    //         if (index === 0) {
    //             if (control.canDisable) {
    //                 formControl.disable();
    //             } else {
    //                 formControl.addValidators(CustomValidators.required(control.message));
    //                 formControl.updateValueAndValidity();
    //             }
    //         } else {
    //             this.resetValidatorFormControl(formControl, control);
    //         }
    //     } else if (!hasMediaUrl) {
    //         this.resetValidatorFormControl(formControl, control);
    //     }
    // }

    // private resetAllValidatorFormItem(isUpload: boolean): void {
    //     const controls = [
    //         {
    //             controlName: 'name',
    //             isRequired: true,
    //             isCanDisabled: true,
    //             message: 'common.validation.nameRequired',
    //         },
    //         {
    //             controlName: 'mediaUrl',
    //             isRequired: true,
    //             isCanDisabled: false,
    //             message: 'learning-library.steps-lessons.file-validate',
    //         },
    //         { controlName: 'description', isRequired: false, isCanDisabled: true, message: null },
    //     ];

    //     this.sectionFiles.controls.forEach((formItem: FormGroup, index: number) => {
    //         const isCurrentFormItem = index === this.index;
    //         const hasMediaUrl = !_.isNil(formItem.get('mediaUrl').value);
    //         controls.forEach((control) => {
    //             const formControl = formItem.get(control.controlName);
    //             if (isUpload) {
    //                 this.handleUploadCase(formControl, control, isCurrentFormItem, hasMediaUrl);
    //             } else {
    //                 this.handleNonUploadCase(formControl, control, index, hasMediaUrl);
    //             }
    //         });
    //     });
    // }

    // private resetValidatorFormControl(formItem, control) {
    //     formItem.reset();
    //     if (control.isCanDisabled) formItem.disable();
    //     formItem.clearValidators();
    //     formItem.setValidators(null);
    //     formItem.updateValueAndValidity();
    // }
}
