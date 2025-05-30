import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { convertToVimeoEmbedLink, convertToYouTubeEmbedLink, isVimeoLink, isYouTubeLink } from '@Shared/helper/media.helper';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { VideoEmbedViewComponent } from '../video-embed-view/video-embed-view.component';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VideoEmbedViewComponent, InputTextModule, TextareaModule, ValidationMessageComponent],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.scss'
})
export class VideoSectionComponent implements OnInit {
  @Input() index!: number;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public controls!: { [key: string]: FormControl };

  public get mediaUrl(): string | null {
    const mediaUrlControl = this.formItem.controls['mediaUrl'];
    if (mediaUrlControl.valid) {
      const mediaUrl = mediaUrlControl.value;
      if (isVimeoLink(mediaUrl)) {
        return convertToVimeoEmbedLink(mediaUrl);
      } else if (isYouTubeLink(mediaUrl)) return convertToYouTubeEmbedLink(mediaUrl);
    }
    return null;
  }

  ngOnInit(): void {
    this.controls = {
      heading: this.formItem.get('heading') as FormControl,
      mediaUrl: this.formItem.get('mediaUrl') as FormControl,
      description: this.formItem.get('description') as FormControl
    };
  }
}
