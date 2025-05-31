import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from '@Shared/component/file-upload/file-upload.component';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-image-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, TextareaModule, FileUploadComponent, ValidationMessageComponent],
  templateUrl: './image-section.component.html',
  styleUrl: './image-section.component.scss'
})
export class ImageSectionComponent implements OnInit {
  @Input() index!: number;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public controls!: { [key: string]: FormControl };

  ngOnInit(): void {
    this.controls = {
      heading: this.formItem.get('heading') as FormControl,
      mediaUrl: this.formItem.get('mediaUrl') as FormControl,
      description: this.formItem.get('description') as FormControl,
      photoCredit: this.formItem.get('photoCredit') as FormControl
    };
  }

  public onUploadFile(imageUrl: string): void {
    this.formItem.patchValue({
      mediaUrl: imageUrl
    });
  }
}
