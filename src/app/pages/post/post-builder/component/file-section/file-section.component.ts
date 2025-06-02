import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileSectionItemComponent } from '../file-section-item/file-section-item.component';

@Component({
  selector: 'app-file-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileSectionItemComponent],
  templateUrl: './file-section.component.html',
  styleUrl: './file-section.component.scss'
})
export class FileSectionComponent {
  @Input() index!: number;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public get sectionFiles(): FormArray<FormGroup> {
    return this.formItem.get('sectionFiles') as FormArray<FormGroup>;
  }
}
