import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-section',
  standalone: true,
  imports: [],
  templateUrl: './image-section.component.html',
  styleUrl: './image-section.component.scss'
})
export class ImageSectionComponent {
  @Input() index!: number;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public onUploadImage(imageUrl: string): void {
    this.formItem.patchValue({
      mediaUrl: imageUrl
    });
  }

  public onDeleteImage(): void {
    this.formItem.patchValue({
      mediaUrl: null
    });
  }
}
