import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [RouterModule, FloatingConfiguratorComponent],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {
  public error = signal(false);
  public success = signal(false);

  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.pipe(mergeMap((params) => this.accountService.activate(params['key']))).subscribe({
      next: () => this.success.set(true),
      error: () => this.error.set(true)
    });
  }
}
