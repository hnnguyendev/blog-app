import { Component, Input } from '@angular/core';
import { ISectionContent } from '@Shared/interface/blog/ISectionContent';

@Component({
  selector: 'app-image-view',
  standalone: true,
  imports: [],
  templateUrl: './image-view.component.html',
  styleUrl: './image-view.component.scss'
})
export class ImageViewComponent {
  @Input() sectionContent!: ISectionContent;
}
