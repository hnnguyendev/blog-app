import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '@Core/auth/account.service';
import { firstValueFrom } from 'rxjs';
import { FooterWidgetComponent } from './component/footer-widget/footer-widget.component';
import { TopbarWidgetComponent } from './component/topbar-widget/topbar-widget.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule, TopbarWidgetComponent, FooterWidgetComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  public readonly accountService = inject(AccountService);

  ngOnInit(): void {
    // check user login topbar-widget
    firstValueFrom(this.accountService.identity()).catch((err) => console.error('Failed to get identity', err));
  }
}
