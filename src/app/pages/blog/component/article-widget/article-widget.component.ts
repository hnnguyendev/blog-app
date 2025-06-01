import { PAGINATION_DEFAULT } from '@Shared/constant/common.constants';
import { ResponseBlogPost } from '@Shared/interface/blog/IResponseBlogPost';
import { BlogService } from '@Shared/service/blog.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { combineLatest } from 'rxjs';
import { ArticleCardComponent } from './article-card/article-card.component';

@Component({
  selector: 'app-article-widget',
  standalone: true,
  imports: [ArticleCardComponent, PaginatorModule],
  templateUrl: './article-widget.component.html',
  styleUrl: './article-widget.component.scss'
})
export class ArticleWidgetComponent implements OnInit {
  public posts = signal<ResponseBlogPost[] | null>(null);
  public isLoading = signal(false);
  public totalItems = signal(0);
  public page!: number;
  public first: number = PAGINATION_DEFAULT.PAGE;
  public rows: number = PAGINATION_DEFAULT.ROWS_12;

  private readonly blogService = inject(BlogService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.handleNavigation();
  }

  public onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 1;
    this.page = Math.floor(this.first / this.rows) + 1;
    this.transition();
  }

  public loadAll(): void {
    this.isLoading.set(true);
    const pageIndex = this.page - 1;

    this.spinner.show();
    this.blogService
      .getAllBlogPosts({
        page: pageIndex,
        size: this.rows
      })
      .subscribe({
        next: (res: HttpResponse<ResponseBlogPost[]>) => {
          this.isLoading.set(false);
          this.spinner.hide();
          this.onSuccess(res.body, res.headers);
        },
        error: () => {
          this.isLoading.set(false);
          this.spinner.hide();
        }
      });
  }

  private transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page
      }
    });
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = +(params.get('page') ?? 1);
      this.page = page;
      this.first = (page - 1) * this.rows;
      this.loadAll();
    });
  }

  private onSuccess(posts: ResponseBlogPost[] | null, headers: HttpHeaders): void {
    this.totalItems.set(Number(headers.get('X-Total-Count')));
    this.posts.set(posts);
  }
}
