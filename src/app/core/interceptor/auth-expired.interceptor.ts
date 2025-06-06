import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { StateStorageService } from '@Core/auth/state-storage.service';
import { LoginService } from '@Pages/auth/login/login.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  private readonly loginService = inject(LoginService);
  private readonly stateStorageService = inject(StateStorageService);
  private readonly router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 && err.url && !err.url.includes('api/account')) {
            this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
            this.loginService.logout();
            this.router.navigate(['/auth/login']);
          }

          // TODO: handle error
          if (err.status === 404) {
            this.router.navigate(['/notfound']);
          }
        }
      })
    );
  }
}
