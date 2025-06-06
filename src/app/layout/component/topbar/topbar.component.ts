import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '@Layout/service/layout.service';
import { LoginService } from '@Pages/auth/login/login.service';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { AccountService } from '@Core/auth/account.service';
import { RolePipe } from '@Shared/pipe/role.pipe';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, ConfiguratorComponent, AvatarModule, RolePipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  public items!: MenuItem[];
  public account = inject(AccountService).trackCurrentAccount();
  public isTopbarMenuVisible = false;


  public readonly layoutService = inject(LayoutService);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  public get primaryRole(): string {
    return this.account()?.authorities[0] || '';
  }

  public toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
