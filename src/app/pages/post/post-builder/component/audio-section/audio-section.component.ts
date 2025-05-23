import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { convertSpotifyToEmbedUrl, isSpotifyLink } from '@Shared/helper/media.helper';
import { InputTextModule } from 'primeng/inputtext';
import { AudioEmbedViewComponent } from '../audio-embed-view/audio-embed-view.component';

@Component({
  selector: 'app-audio-section',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, AudioEmbedViewComponent],
  templateUrl: './audio-section.component.html',
  styleUrl: './audio-section.component.scss'
})
export class AudioSectionComponent implements OnInit {
  @Input() index!: number;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public controls!: { [key: string]: FormControl };

  public get mediaUrl(): string | null {
    const mediaUrlControl = this.formItem.controls['mediaUrl'];
    if (mediaUrlControl.valid) {
      const mediaUrl = mediaUrlControl.value;
      if (isSpotifyLink(mediaUrl)) {
        return convertSpotifyToEmbedUrl(mediaUrl);
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.controls = {
      mediaUrl: this.formItem.get('mediaUrl') as FormControl,
      description: this.formItem.get('description') as FormControl
    };
  }
}
