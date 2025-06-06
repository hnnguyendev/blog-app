import { Routes } from '@angular/router';
import { UserRouteAccessService } from '@Core/auth/user-route-access.service';
import { Authority } from '@Core/config/authority.constants';
import { LayoutComponent } from '@Layout/component/layout/layout.component';
import { BlogComponent } from '@Pages/blog/blog.component';
import { ArticleWidgetComponent } from '@Pages/blog/component/article-widget/article-widget.component';
import { PostDetailsComponent } from '@Pages/blog/component/post-details/post-details.component';
import { ProfileWidgetComponent } from '@Pages/blog/component/profile-widget/profile-widget.component';
import { CategoryComponent } from '@Pages/category/category.component';
import { ComingSoonComponent } from '@Pages/coming-soon/coming-soon.component';
import { Dashboard } from '@Pages/dashboard/dashboard';
import { NotfoundComponent } from '@Pages/notfound/notfound.component';
import { PostComponent } from '@Pages/post/post.component';
import { ProfileEditComponent } from '@Pages/profile/profile-edit/profile-edit.component';
import { ProfilePasswordComponent } from '@Pages/profile/profile-password/profile-password.component';
import { ProfileComponent } from '@Pages/profile/profile.component';
import { RolePermissionsComponent } from '@Pages/role-permissions/role-permissions.component';
import { TagComponent } from '@Pages/tag/tag.component';
import { UserComponent } from '@Pages/user/user.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
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
      },
      {
        path: 'profile',
        component: ProfileWidgetComponent,
        children: [
          {
            path: 'edit',
            component: ProfileEditComponent,
            title: 'Edit Profile'
          },
          {
            path: 'password',
            component: ProfilePasswordComponent,
            title: 'Change Password'
          }
        ],
        canActivate: [UserRouteAccessService]
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
      {
        path: 'role-permissions',
        component: RolePermissionsComponent,
        title: 'Role & Permissions Management'
      },
      {
        path: 'categories',
        component: CategoryComponent,
        title: 'Category Management'
      },
      {
        path: 'tags',
        component: TagComponent,
        title: 'Tag Management'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'edit',
            component: ProfileEditComponent,
            title: 'Edit Profile'
          },
          {
            path: 'password',
            component: ProfilePasswordComponent,
            title: 'Change Password'
          }
        ]
      },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
    ],
    data: {
      authorities: [Authority.ADMIN]
    },
    canActivate: [UserRouteAccessService]
  },
  { path: 'notfound', component: NotfoundComponent, title: 'Not Found' },
  { path: 'coming-soon', component: ComingSoonComponent, title: 'Coming Soon' },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' }
];
