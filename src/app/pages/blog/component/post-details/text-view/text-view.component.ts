import { Component, Input } from '@angular/core';
import { ISectionContent } from '@Shared/interface/ISectionContent';
import { SafePipe } from '@Shared/pipe/safe.pipe';

@Component({
  selector: 'app-text-view',
  imports: [SafePipe],
  templateUrl: './text-view.component.html',
  styleUrl: './text-view.component.scss'
})
export class TextViewComponent {
  @Input() sectionContent!: ISectionContent;
}
