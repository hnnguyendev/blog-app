import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-section',
  standalone: true,
  imports: [],
  templateUrl: './file-section.component.html',
  styleUrl: './file-section.component.scss'
})
export class FileSectionComponent {
  @Input() index!: number;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public get sectionFiles() {
    return this.formItem.controls['sectionFiles'] as FormArray;
  }
}
