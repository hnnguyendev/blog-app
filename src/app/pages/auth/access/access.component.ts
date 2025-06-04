import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ButtonModule, RouterModule, RippleModule, FloatingConfiguratorComponent, ButtonModule],
  templateUrl: './access.component.html',
  styleUrl: './access.component.scss'
})
export class AccessComponent {
  private readonly accountService = inject(AccountService);

  public redirectByRole(): void {
    this.accountService.redirectByRole();
  }
}
