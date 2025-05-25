import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-article-card',
  imports: [AvatarModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() public imageUrl: string = '';

  constructor(public router: Router) {}
  public navigateToDetail(): void {
    this.router.navigate(['/post', 'slug']);
  }
}
