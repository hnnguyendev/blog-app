import { Routes } from '@angular/router';
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

export const appRoutes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ArticleWidgetComponent
      },
      {
        path: 'blog/:slug',
        component: PostDetailsComponent,
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
      { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
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
