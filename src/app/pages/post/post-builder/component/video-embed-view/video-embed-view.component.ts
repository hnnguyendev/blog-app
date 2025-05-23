import { Component, Input } from '@angular/core';
import { SafePipe } from '@Shared/pipe/safe.pipe';

@Component({
  selector: 'app-video-embed-view',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './video-embed-view.component.html',
  styleUrl: './video-embed-view.component.scss'
})
export class VideoEmbedViewComponent {
  @Input() url!: string;
  @Input() width: string = '100%';
  @Input() height: string = '360px';
}
