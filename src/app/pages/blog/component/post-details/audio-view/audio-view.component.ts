import { Component, Input } from '@angular/core';
import { AudioEmbedViewComponent } from '@Pages/post/post-builder/component/audio-embed-view/audio-embed-view.component';
import { convertSpotifyToEmbedUrl, isSpotifyLink } from '@Shared/helper/media.helper';
import { ISectionContent } from '@Shared/interface/ISectionContent';

@Component({
  selector: 'app-audio-view',
  imports: [AudioEmbedViewComponent],
  templateUrl: './audio-view.component.html',
  styleUrl: './audio-view.component.scss'
})
export class AudioViewComponent {
  @Input() sectionContent!: ISectionContent;

  public get mediaUrl(): string | null {
      const { mediaUrl } = this.sectionContent;
      if (mediaUrl) {
        if (isSpotifyLink(mediaUrl)) {
          return convertSpotifyToEmbedUrl(mediaUrl);
        }
      }
      return null;
    }

}
