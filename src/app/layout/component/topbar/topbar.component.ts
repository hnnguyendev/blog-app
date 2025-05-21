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

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, ConfiguratorComponent, AvatarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  items!: MenuItem[];
  account = inject(AccountService).trackCurrentAccount();

  public readonly layoutService = inject(LayoutService);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
