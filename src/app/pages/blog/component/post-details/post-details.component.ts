import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EPostSectionType } from '@Shared/enum/EPostSectionType';
import { IResponseBlogPostDetails } from '@Shared/interface/blog/IResponseBlogPostDetails';
import { BlogService } from '@Shared/service/blog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AvatarModule } from 'primeng/avatar';
import { AudioViewComponent } from './audio-view/audio-view.component';
import { StatementComponent } from './statement/statement.component';
import { SubscribeNewsletterComponent } from './subscribe-newsletter/subscribe-newsletter.component';
import { TextViewComponent } from './text-view/text-view.component';
import { VideoViewComponent } from './video-view/video-view.component';
import { PAGE_TITLE } from '@Shared/constant/common.constants';

@Component({
  selector: 'app-post-details',
  imports: [StatementComponent, TextViewComponent, VideoViewComponent, AudioViewComponent, AvatarModule, DatePipe, SubscribeNewsletterComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  public post: IResponseBlogPostDetails | null = null;

  private readonly titleService = inject(Title);
  private readonly blogService = inject(BlogService);
  private readonly route = inject(ActivatedRoute);
  private readonly spinner = inject(NgxSpinnerService);

  public get EPostSectionType(): typeof EPostSectionType {
    return EPostSectionType;
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.getBlogPostDetails(slug);
    }
  }

  public getBlogPostDetails(slug: string): void {
    this.spinner.hide();
    this.blogService.getBlogPostDetails(slug).subscribe({
      next: (res: IResponseBlogPostDetails) => {
        this.post = res;
        this.titleService.setTitle(this.post ? this.post.title : PAGE_TITLE.BLOG);
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        console.error('Error fetching post details');
      }
    });
  }
}
