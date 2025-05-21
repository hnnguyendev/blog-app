import { Routes } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { SecureInnerPagesGuard } from '@Shared/guard/secure-inner-pages.guard';

export default [
  { path: 'access', component: AccessComponent, title: 'Access Denied' },
  { path: 'error', component: ErrorComponent, title: 'Error' },
  { path: 'login', component: LoginComponent, title: 'Login', canActivate: [SecureInnerPagesGuard] }
] as Routes;
