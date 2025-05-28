import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENDPOINT, getEndpoint } from '@Core/config/endpoint.constants';
import { createRequestOption } from '@Core/request/request-util';
import { Pagination } from '@Core/request/request.model';
import { IPost } from '@Shared/interface/blog/IPost';
import { IPostSearchParam } from '@Shared/interface/blog/IPostSearchParam';
import { IRequestDeletePost } from '@Shared/interface/blog/IRequestDeletePost';
import { IResponseBlogPost } from '@Shared/interface/blog/IResponseBlogPost';
import { IResponseBlogPostDetails } from '@Shared/interface/blog/IResponseBlogPostDetails';
import { IResponsePost } from '@Shared/interface/blog/IResponsePost';
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

  public getPostDetails(id: string): Observable<IPost> {
    return this.http.get<IPost>(getEndpoint(ENDPOINT.BLOG.GET_POST_DETAILS(id)));
  }

  public getAllPosts(payload: IPostSearchParam): Observable<HttpResponse<IResponsePost[]>> {
    return this.http.post<IResponsePost[]>(getEndpoint(ENDPOINT.BLOG.GET_POSTS), payload, { observe: 'response' });
  }

  public addPost(payload: IPost): Observable<void> {
    return this.http.post<void>(getEndpoint(ENDPOINT.BLOG.ADD_POST), payload);
  }

  public updatePost(id: string, payload: IPost): Observable<void> {
    return this.http.patch<void>(getEndpoint(ENDPOINT.BLOG.UPDATE_POST(id)), payload);
  }

  public deletePosts(payload: IRequestDeletePost): Observable<void> {
    return this.http.post<void>(getEndpoint(ENDPOINT.BLOG.DELETE_POSTS), payload);
  }
}
