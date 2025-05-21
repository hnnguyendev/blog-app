import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ENDPOINT, getEndpoint } from '@Core/config/endpoint.constants';
import { Login } from '@Pages/auth/login/login.model';
import { StateStorageService } from './state-storage.service';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  private readonly http = inject(HttpClient);
  private readonly stateStorageService = inject(StateStorageService);

  getToken(): string {
    return this.stateStorageService.getAuthenticationToken() ?? '';
  }

  login(credentials: Login): Observable<void> {
    return this.http.post<JwtToken>(getEndpoint(ENDPOINT.AUTH.AUTHENTICATE), credentials).pipe(map((response) => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      this.stateStorageService.clearAuthenticationToken();
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    this.stateStorageService.storeAuthenticationToken(response.id_token, rememberMe);
  }
}
