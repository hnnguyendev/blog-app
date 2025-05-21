import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';

@Injectable({
  providedIn: 'root'
})
class SecureInnerPagesService {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if already authenticated then navigate to home page
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['/admin/dashboard']);
      }
    });
    return true;
  }
}

export const SecureInnerPagesGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(SecureInnerPagesService).canActivate(next, state);
};
