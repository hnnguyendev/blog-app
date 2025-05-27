import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseBlogPost } from '@Shared/interface/blog/IResponseBlogPost';
import { HtmlToTextPipe } from '@Shared/pipe/html-to-text.pipe';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-article-card',
  imports: [AvatarModule, HtmlToTextPipe, DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() public post!: ResponseBlogPost;

  private readonly router = inject(Router);

  public navigateToDetail(): void {
    this.router.navigate(['/blog', this.post.slug]);
  }
}
