import { Component, Input } from '@angular/core';
import { SafePipe } from '@Shared/pipe/safe.pipe';

@Component({
  selector: 'app-audio-embed-view',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './audio-embed-view.component.html',
  styleUrl: './audio-embed-view.component.scss'
})
export class AudioEmbedViewComponent {
  @Input() url!: string;
}
