import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TabsModule, RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  public tabs = [
    { route: 'edit', label: 'Profile', icon: 'pi pi-user' },
    { route: 'password', label: 'Password', icon: 'pi pi-lock' }
  ];
  public tab: string = 'edit';
  private subscription?: Subscription;

  private readonly router = inject(Router);

  ngOnInit(): void {
    // Handle initial page
    this.updateTabFromUrl();

    // Handle click Edit Profile on topbar menu
    this.subscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateTabFromUrl();
    });
  }

  private updateTabFromUrl(): void {
    const pathSegments = this.router.url.split('/');
    this.tab = pathSegments[pathSegments.length - 1];
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    this.subscription?.unsubscribe();
  }
}
