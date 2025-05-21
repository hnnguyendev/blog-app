import { Routes } from '@angular/router';
import { UserRouteAccessService } from '@Core/auth/user-route-access.service';
import { Authority } from '@Core/config/authority.constants';
import { LayoutComponent } from '@Layout/component/layout/layout.component';
import { Dashboard } from '@Pages/dashboard/dashboard';
import { Documentation } from '@Pages/documentation/documentation';
import { Landing } from '@Pages/landing/landing';
import { NotfoundComponent } from '@Pages/notfound/notfound.component';
import { PostComponent } from '@Pages/post/post.component';
import { UserComponent } from '@Pages/user/user.component';

export const appRoutes: Routes = [
  { path: '', component: Landing },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        title: 'Dashboard'
      },
      {
        path: 'posts',
        component: PostComponent,
        title: 'Post Management'
      },
      {
        path: 'users',
        component: UserComponent,
        title: 'User Management'
      },
      { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
      { path: 'documentation', component: Documentation, title: 'Documentation' },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
    ],
    data: {
      authorities: [Authority.ADMIN]
    },
    canActivate: [UserRouteAccessService]
  },
  { path: 'notfound', component: NotfoundComponent, title: 'Not Found' },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' }
];
