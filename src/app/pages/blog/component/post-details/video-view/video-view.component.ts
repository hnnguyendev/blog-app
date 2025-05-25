import { Component, Input } from '@angular/core';
import { VideoEmbedViewComponent } from '@Pages/post/post-builder/component/video-embed-view/video-embed-view.component';
import { convertToVimeoEmbedLink, convertToYouTubeEmbedLink, isVimeoLink, isYouTubeLink } from '@Shared/helper/media.helper';
import { ISectionContent } from '@Shared/interface/ISectionContent';

@Component({
  selector: 'app-video-view',
  imports: [VideoEmbedViewComponent],
  templateUrl: './video-view.component.html',
  styleUrl: './video-view.component.scss'
})
export class VideoViewComponent {
  @Input() sectionContent!: ISectionContent;

  public get mediaUrl(): string {
    const { mediaUrl } = this.sectionContent;
    if (mediaUrl) {
      if (isVimeoLink(mediaUrl)) {
        return convertToVimeoEmbedLink(mediaUrl);
      } else if (isYouTubeLink(mediaUrl)) return convertToYouTubeEmbedLink(mediaUrl);
    }
    return '';
  }
}
