import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuitemComponent } from '../menuitem/menuitem.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuitemComponent, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] }]
      },
      {
        label: 'Management',
        items: [
          { label: 'Post', icon: 'pi pi-fw pi-tablet', routerLink: ['/admin/posts'] },
          { label: 'User', icon: 'pi pi-fw pi-users', routerLink: ['/admin/users'] },
          { label: 'Role & Permissions', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/role-permissions'] }
        ]
      },
      {
        label: 'System Config',
        items: [
          { label: 'Category', icon: 'pi pi-fw pi-list', routerLink: ['/admin/categories'] },
          { label: 'Tag', icon: 'pi pi-fw pi-tags', routerLink: ['/admin/tags'] }
        ]
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/admin/pages'],
        items: [
          {
            label: 'Blog',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/']
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth/error']
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth/access']
              }
            ]
          },
          {
            label: 'Not Found',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/notfound']
          },
          {
            label: 'Coming Soon',
            icon: 'pi pi-fw pi-spinner-dotted',
            routerLink: ['/coming-soon']
          },
          {
            label: 'Documentation',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/admin/pages/documentation']
          }
        ]
      }
    ];
  }
}
