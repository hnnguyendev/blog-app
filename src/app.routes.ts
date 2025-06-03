import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { UserRouteAccessService } from '@Core/auth/user-route-access.service';
import { Authority } from '@Core/config/authority.constants';
import { LayoutComponent } from '@Layout/component/layout/layout.component';
import { BlogComponent } from '@Pages/blog/blog.component';
import { ArticleWidgetComponent } from '@Pages/blog/component/article-widget/article-widget.component';
import { PostDetailsComponent } from '@Pages/blog/component/post-details/post-details.component';
import { Dashboard } from '@Pages/dashboard/dashboard';
import { NotfoundComponent } from '@Pages/notfound/notfound.component';
import { PostComponent } from '@Pages/post/post.component';
import { UserComponent } from '@Pages/user/user.component';

const RoleRoutes = {
  Admin: 'admin/dashboard',
  User: ''
} as const;

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const account = inject(AccountService);
      const isAdmin = account.hasAnyAuthority([Authority.ADMIN]);
      if (isAdmin) {
        return RoleRoutes.Admin;
      }
      return RoleRoutes.User;
    }
  },
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ArticleWidgetComponent
      },
      {
        path: 'posts/:slug',
        component: PostDetailsComponent
      }
    ]
  },
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
