import { Routes } from '@angular/router';
import { SecureInnerPagesGuard } from '@Shared/guard/secure-inner-pages.guard';
import { AccessComponent } from './access/access.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

export default [
  { path: 'access', component: AccessComponent, title: 'Access Denied' },
  { path: 'error', component: ErrorComponent, title: 'Error' },
  { path: 'login', component: LoginComponent, title: 'Login', canActivate: [SecureInnerPagesGuard] },
  { path: 'password-reset', loadChildren: () => import('./password-reset/password-reset.routes') }
] as Routes;
