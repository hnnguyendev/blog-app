import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ArticleCardComponent } from './article-card/article-card.component';

@Component({
  selector: 'app-article-widget',
  imports: [ArticleCardComponent, PaginatorModule],
  templateUrl: './article-widget.component.html',
  styleUrl: './article-widget.component.scss'
})
export class ArticleWidgetComponent {
  first: number = 0;

  rows: number = 10;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
