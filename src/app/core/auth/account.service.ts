import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Authority } from '@Core/config/authority.constants';
import { ENDPOINT, getEndpoint } from '@Core/config/endpoint.constants';
import { IRegistration } from '@Shared/interface/auth/IRegistration';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Account } from './account.model';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly userIdentity = signal<Account | null>(null);
  private readonly authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account> | null;

  private readonly http = inject(HttpClient);
  private readonly stateStorageService = inject(StateStorageService);
  private readonly router = inject(Router);

  save(account: Account): Observable<{}> {
    return this.http.post(getEndpoint(ENDPOINT.AUTH.ACCOUNT), account);
  }

  authenticate(identity: Account | null): void {
    this.userIdentity.set(identity);
    this.authenticationState.next(this.userIdentity());
    if (!identity) {
      this.accountCache$ = null;
    }
  }

  trackCurrentAccount(): Signal<Account | null> {
    return this.userIdentity.asReadonly();
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    const userIdentity = this.userIdentity();
    if (!userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force) {
      this.accountCache$ = this.fetch().pipe(
        tap((account: Account) => {
          this.authenticate(account);

          this.navigateToStoredUrl();
        }),
        shareReplay()
      );
    }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }

  isAuthenticated(): boolean {
    return this.userIdentity() !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(getEndpoint(ENDPOINT.AUTH.ACCOUNT));
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }

  public redirectByRole(): void {
    const roleRedirectMap: { [key: string]: string } = {
      [Authority.ADMIN]: '/admin/dashboard',
      [Authority.USER]: '/'
    };

    const roles = [Authority.ADMIN, Authority.USER];
    const matchedRole = roles.find((role) => this.hasAnyAuthority([role]));

    const targetRoute = matchedRole ? roleRedirectMap[matchedRole] : '/';
    this.router.navigateByUrl(targetRoute);
  }

  public redirectByPath(): void {
    const redirectMap: { [key: string]: string } = {
      '/profile': '/',
      '/admin/profile': '/admin/dashboard'
    };
    const currentUrl = this.router.url;
    const redirectPath = Object.keys(redirectMap).find((path) => currentUrl.startsWith(path));

    if (redirectPath) {
      this.router.navigate([redirectMap[redirectPath]]);
    } else {
      this.router.navigate(['/']);
    }
  }

  public changePassword(newPassword: string, currentPassword: string): Observable<{}> {
    return this.http.post(getEndpoint(ENDPOINT.AUTH.CHANGE_PASSWORD), { currentPassword, newPassword });
  }

  public resetPasswordInit(mail: string): Observable<{}> {
    return this.http.post(getEndpoint(ENDPOINT.AUTH.RESET_PASSWORD_INIT), mail);
  }

  public resetPasswordFinish(key: string, newPassword: string): Observable<{}> {
    return this.http.post(getEndpoint(ENDPOINT.AUTH.RESET_PASSWORD_FINISH), { key, newPassword });
  }

  public register(registration: IRegistration): Observable<{}> {
    return this.http.post(getEndpoint(ENDPOINT.AUTH.REGISTER), registration);
  }

  public activate(key: string): Observable<{}> {
    return this.http.get(getEndpoint(ENDPOINT.AUTH.ACTIVATE), {
      params: new HttpParams().set('key', key)
    });
  }
}
