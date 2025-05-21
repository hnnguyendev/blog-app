import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StateStorageService } from '@Core/auth/state-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly stateStorageService = inject(StateStorageService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.stateStorageService.getAuthenticationToken();

    if (!request.url || !token) {
      return next.handle(request);
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
