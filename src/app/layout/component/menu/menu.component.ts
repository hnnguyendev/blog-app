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
          { label: 'Role & Permissions', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/roles'] }
        ]
      },
      {
        label: 'System Config',
        items: [
          { label: 'Category', icon: 'pi pi-fw pi-list', routerLink: ['/admin/category'] },
          { label: 'Tag', icon: 'pi pi-fw pi-tags', routerLink: ['/admin/tag'] }
        ]
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/admin/pages'],
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/']
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login']
              },
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
          }
        ]
      },
      {
        label: 'Get Started',
        items: [
          {
            label: 'Documentation',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/admin/documentation']
          },
          {
            label: 'View Source',
            icon: 'pi pi-fw pi-github',
            url: 'https://github.com/primefaces/sakai-ng',
            target: '_blank'
          }
        ]
      },
      {
        label: 'UI Components',
        items: [
          { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/uikit/formlayout'] },
          { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/uikit/input'] },
          { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/admin/uikit/button'] },
          { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/admin/uikit/table'] },
          { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/admin/uikit/list'] },
          { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/admin/uikit/tree'] },
          { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/admin/uikit/panel'] },
          { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/admin/uikit/overlay'] },
          { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/admin/uikit/media'] },
          { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/admin/uikit/menu'] },
          { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/admin/uikit/message'] },
          { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/admin/uikit/file'] },
          { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/admin/uikit/charts'] },
          { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/admin/uikit/timeline'] },
          { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/admin/uikit/misc'] }
        ]
      }
    ];
  }
}
