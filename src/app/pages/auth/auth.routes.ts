import { Routes } from '@angular/router';
import { SecureInnerPagesGuard } from '@Shared/guard/secure-inner-pages.guard';
import { AccessComponent } from './access/access.component';
import { ActivateComponent } from './activate/activate.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export default [
  { path: 'access', component: AccessComponent, title: 'Access Denied' },
  { path: 'error', component: ErrorComponent, title: 'Error' },
  { path: 'login', component: LoginComponent, title: 'Login', canActivate: [SecureInnerPagesGuard] },
  { path: 'password-reset', loadChildren: () => import('./password-reset/password-reset.routes') },
  { path: 'register', component: RegisterComponent, title: 'Create Account', canActivate: [SecureInnerPagesGuard] },
  { path: 'activate', component: ActivateComponent, title: 'Activate Account', canActivate: [SecureInnerPagesGuard] }
] as Routes;
