import { Routes } from '@angular/router';
import { SecureInnerPagesGuard } from '@Shared/guard/secure-inner-pages.guard';
import { PasswordResetFinishComponent } from './finish/password-reset-finish.component';
import { PasswordResetInitComponent } from './init/password-reset-init.component';

export default [
  { path: 'init', component: PasswordResetInitComponent, title: 'Forgot Password', canActivate: [SecureInnerPagesGuard] },
  { path: 'finish', component: PasswordResetFinishComponent, title: 'Reset Password', canActivate: [SecureInnerPagesGuard] },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
