import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENDPOINT, getEndpoint } from '@Core/config/endpoint.constants';
import { createRequestOption } from '@Core/request/request-util';
import { Pagination } from '@Core/request/request.model';
import { IResponseBlogPost } from '@Shared/interface/blog/IResponseBlogPost';
import { IResponseBlogPostDetails } from '@Shared/interface/blog/IResponseBlogPostDetails';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);

  public getAllBlogPosts(req?: Pagination): Observable<HttpResponse<IResponseBlogPost[]>> {
    const options = createRequestOption(req);
    return this.http.get<IResponseBlogPost[]>(getEndpoint(ENDPOINT.BLOG.GET_BLOG_POSTS), { params: options, observe: 'response' });
  }

  public getBlogPostDetails(slug: string): Observable<IResponseBlogPostDetails> {
    return this.http.get<IResponseBlogPostDetails>(getEndpoint(ENDPOINT.BLOG.GET_BLOG_POST_DETAILS(slug)));
  }
}
