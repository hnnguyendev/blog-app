import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-error',
  imports: [ButtonModule, RippleModule, RouterModule, FloatingConfiguratorComponent, ButtonModule],
  standalone: true,
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  private readonly accountService = inject(AccountService);

  public redirectByRole(): void {
    this.accountService.redirectByRole();
  }
}
